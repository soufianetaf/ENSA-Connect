const { DataTypes } = require('sequelize');
const { sequelize } = require('../index');

const User = sequelize.define('User', {
  // --- IDENTIFICATION ---
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('student', 'graduate', 'admin'),
    defaultValue: 'student',
    allowNull: false,
  },

  // --- PROFILS SPECIFIQUES ---
  // Filière (Pour étudiants)
  filiere: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Année (Pour étudiants : 1ère année... / Pour diplômés : Promo 2023)
  levelOrPromotion: {
    type: DataTypes.STRING, 
    allowNull: true,
  },

  // --- DONNÉES RICHES (POUR L'IA & RECRUTEMENT) ---
  // Compétences techniques (ex: "Python, React, SQL")
  skills: {
    type: DataTypes.TEXT, 
    allowNull: true,
  },
  // Biographie ou Résumé du profil
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  // Intérêts / Préférences (ex: "Je veux travailler en remote, j'aime l'IA")
  preferences: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  
  // --- LIENS & FICHIERS ---
  linkedin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  github: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // Chemin vers le CV uploadé (pour le RAG plus tard)
  cv_url: {
    type: DataTypes.STRING,
    allowNull: true,
  }

}, {
  timestamps: true,
});

module.exports = User;