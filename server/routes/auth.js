// server/routes/auth.js
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');

// --- CONFIGURATION UPLOAD CV ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/cvs';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'CV-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// --- INSCRIPTION (REGISTER) ---
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, filiere, promotionYear } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: "Cet email est déjà utilisé." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name, email, password: hashedPassword, role, filiere, promotionYear
    });

    const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ message: "Utilisateur créé !", token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// --- CONNEXION (LOGIN) ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Email ou mot de passe incorrect." });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ message: "Email ou mot de passe incorrect." });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: "Connexion réussie", token, user });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// --- MISE À JOUR PROFIL (UPDATE) ---
router.put('/update/:id', upload.single('cv'), async (req, res) => {
  try {
    const userId = req.params.id;
    
    // 1. Récupération de TOUS les champs (J'ai ajouté phone, linkedin, github ici)
    const { 
      name, email, bio, skills, password, 
      filiere, promotionYear, 
      phone, linkedin, github 
    } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    // 2. Préparer l'objet de mise à jour
    let updatedData = {
      name,
      email,
      bio,
      skills,
      filiere,
      promotionYear,
      phone,      // <--- AJOUTÉ
      linkedin,   // <--- AJOUTÉ
      github      // <--- AJOUTÉ
    };

    // 3. Gestion du mot de passe
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    // 4. Gestion du fichier CV
    if (req.file) {
      updatedData.cv_url = `/uploads/cvs/${req.file.filename}`;
    }

    // 5. Sauvegarde
    await user.update(updatedData);

    const userResponse = user.toJSON();
    delete userResponse.password;

    res.json({ message: "Profil mis à jour avec succès !", user: userResponse });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour." });
  }
});

module.exports = router;