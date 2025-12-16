// server/routes/admin.js
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { initRAG } = require('../utils/rag');
const User = require('../models/User'); // Import du modèle User pour compter

// --- CONFIG MULTER ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../documents');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// --- ROUTE 1 : UPLOAD ---
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Aucun fichier." });
    console.log(`📂 Admin Upload : ${req.file.originalname}`);
    res.json({ message: "Fichier uploadé." });
  } catch (error) {
    res.status(500).json({ message: "Erreur upload." });
  }
});

// --- ROUTE 2 : REFRESH RAG ---
router.post('/refresh-rag', async (req, res) => {
  try {
    await initRAG();
    res.json({ message: "IA mise à jour avec succès !" });
  } catch (error) {
    res.status(500).json({ message: "Erreur RAG." });
  }
});

// --- ROUTE 3 : STATISTIQUES & DOCUMENTS (NOUVEAU) ---
router.get('/stats', async (req, res) => {
  try {
    // 1. Compter les utilisateurs via Sequelize
    const studentCount = await User.count({ where: { role: 'student' } });
    const graduateCount = await User.count({ where: { role: 'graduate' } });
    const adminCount = await User.count({ where: { role: 'admin' } });
    const totalUsers = studentCount + graduateCount + adminCount;

    // 2. Lister les fichiers dans /documents
    const docPath = path.join(__dirname, '../documents');
    let files = [];
    if (fs.existsSync(docPath)) {
      files = fs.readdirSync(docPath).filter(file => !file.startsWith('.')); // Ignore les fichiers cachés
    }

    // 3. Renvoyer tout au frontend
    res.json({
      users: {
        total: totalUsers,
        students: studentCount,
        graduates: graduateCount,
        admins: adminCount
      },
      documents: {
        count: files.length,
        list: files // La liste des noms de fichiers
      },
      system: {
        status: "Opérationnel",
        version: "v1.0.0"
      }
    });

  } catch (error) {
    console.error("Erreur stats:", error);
    res.status(500).json({ message: "Erreur récupération stats" });
  }
});

module.exports = router;