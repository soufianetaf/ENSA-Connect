// server/index.js
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// --- IMPORTS UTILITAIRES ---
const { initRAG } = require('./utils/rag');

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. MIDDLEWARE DE SÉCURITÉ & LOGS ---
app.use(cors({
  origin: '*', // Autorise toutes les origines
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Parse le JSON

// Logger
app.use((req, res, next) => {
  console.log(`📡 [${req.method}] ${req.url}`);
  next();
});

// --- 2. GESTION DES FICHIERS STATIQUES ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // CVs
app.use('/documents', express.static(path.join(__dirname, 'documents'))); // RAG Source

// --- 3. CONFIGURATION BASE DE DONNÉES (PostgreSQL) ---
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, 
  }
);

// EXPORT DE L'INSTANCE
module.exports = { sequelize };

// --- 4. IMPORT DES MODÈLES ---
const User = require('./models/User'); 

// --- 5. IMPORT DES ROUTES ---
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const jobsRoutes = require('./routes/jobs');
const graduateJobsRoutes = require('./routes/graduate-jobs'); 
const adminRoutes = require('./routes/admin');
const companiesRoutes = require('./routes/companies'); // <--- AJOUTE CET IMPORT

// --- 6. ACTIVATION DES ROUTES (ENDPOINTS) ---
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/graduate-jobs', graduateJobsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/companies', companiesRoutes); // <--- AJOUTE CETTE LIGNE

// Route de santé
app.get('/', (req, res) => {
  res.send('✅ API Smart Guidance est en ligne et opérationnelle ! 🚀');
});

// --- 7. DÉMARRAGE DU SERVEUR ---
const startServer = async () => {
  try {
    // Connexion DB
    await sequelize.authenticate();
    console.log('🔌 Connecté à PostgreSQL.');

    // Synchro des tables
    await sequelize.sync({ alter: true });
    console.log('💾 Tables synchronisées.');

    // Initialisation RAG
    console.log('🧠 Initialisation de l\'IA et lecture des documents...');
    await initRAG();

    // Lancement HTTP
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
      console.log(`📂 Dossier documents : ${path.join(__dirname, 'documents')}`);
    });

  } catch (error) {
    console.error('❌ Erreur critique au démarrage :', error);
  }
};

startServer();