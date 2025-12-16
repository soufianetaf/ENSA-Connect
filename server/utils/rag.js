// server/utils/rag.js
const fs = require('fs');
const path = require('path');

// 1. IMPORTS DES LOADERS (C'est ici la correction)
// PDFLoader est dans community
const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");
// TextLoader est resté dans le paquet principal langchain pour cette version
const { TextLoader } = require("langchain/document_loaders/fs/text"); 

const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");

require('dotenv').config();

// Hack pour importer MemoryVectorStore proprement
let MemoryVectorStore;
try {
  const mod = require("langchain/vectorstores/memory");
  MemoryVectorStore = mod.MemoryVectorStore;
} catch (e) {
  const mod = require("@langchain/core/vectorstores");
  MemoryVectorStore = mod.MemoryVectorStore;
}

let vectorStore = null;

const initRAG = async () => {
  try {
    const docPath = path.join(__dirname, '../documents');
    console.log(`📂 Scan du dossier : ${docPath}`);

    if (!fs.existsSync(docPath)) {
      fs.mkdirSync(docPath);
      return;
    }

    const files = fs.readdirSync(docPath);
    let allDocs = [];

    for (const file of files) {
      const fullPath = path.join(docPath, file);
      try {
        // --- CAS 1 : C'est un PDF ---
        if (file.toLowerCase().endsWith('.pdf')) {
          console.log(`   - 📕 Lecture PDF : ${file}`);
          const loader = new PDFLoader(fullPath);
          const docs = await loader.load();
          allDocs.push(...docs);
        } 
        // --- CAS 2 : C'est un TXT ---
        else if (file.toLowerCase().endsWith('.txt')) {
          console.log(`   - 📝 Lecture TXT : ${file}`);
          const loader = new TextLoader(fullPath);
          const docs = await loader.load();
          allDocs.push(...docs);
        }
      } catch (err) {
        console.error(`❌ Erreur fichier ${file}:`, err.message);
      }
    }

    if (allDocs.length === 0) {
      console.log("⚠️ Aucun document compatible trouvé (PDF ou TXT).");
      return;
    }

    console.log(`📚 Total : ${allDocs.length} pages/sections chargées. Indexation IA...`);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splitDocs = await splitter.splitDocuments(allDocs);

    vectorStore = await MemoryVectorStore.fromDocuments(
      splitDocs,
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY,
        modelName: "embedding-001",
      })
    );

    console.log("✅ Système RAG prêt et opérationnel !");

  } catch (error) {
    console.error("❌ Erreur RAG :", error);
  }
};

const searchDocuments = async (query) => {
  if (!vectorStore) return ""; 
  try {
    const results = await vectorStore.similaritySearch(query, 5);
    return results.map(doc => doc.pageContent).join("\n\n");
  } catch (e) {
    console.error("Erreur recherche RAG:", e);
    return "";
  }
};

module.exports = { initRAG, searchDocuments };