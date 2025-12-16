// server/routes/chat.js (VERSION FINALE RAG)
const router = require('express').Router();
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");
const { searchDocuments } = require('../utils/rag'); // Import de notre fonction de recherche
require('dotenv').config();

const chatModel = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.5-flash",
  temperature: 0.5, // Plus bas pour être fidèle aux documents
});

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    console.log("📩 Question :", message);

    // 1. Rechercher des infos dans les PDF
    const context = await searchDocuments(message);
    console.log("🔎 Contexte trouvé (extrait) :", context.substring(0, 100) + "...");

    // 2. Créer le prompt intelligent
    const systemInstruction = `Tu es "Smart Guide", assistant de l'ENSA Khouribga.
    Utilise UNIQUEMENT le contexte suivant (tes documents officiels) pour répondre.
    Si la réponse n'est pas dans le contexte, dis "Je ne trouve pas cette info dans mes documents."
    
    --- CONTEXTE ---
    ${context}
    ----------------
    `;

    // 3. Interroger l'IA
    const response = await chatModel.invoke([
      new SystemMessage(systemInstruction),
      new HumanMessage(message),
    ]);

    res.json({ reply: response.content });

  } catch (error) {
    console.error("❌ Erreur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;