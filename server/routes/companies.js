// server/routes/companies.js
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

router.get('/', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../documents/entreprises.pdf');
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Fichier entreprises.pdf non trouvé." });
    }

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);
    const textContent = pdfData.text;

    // Regex pour séparer le contenu par les titres de villes (Casablanca, Tanger, etc.)
    const cityRegex = /(Casablanca|Tanger|K'enitra \/ Atlantic Free Zone|Autres villes)\s*\n/g;
    const blocks = textContent.split(cityRegex).filter(block => block.trim().length > 0);

    let companiesByCity = {};
    let currentCity = 'Têtes de liste'; // Titre par défaut pour le premier bloc si la regex est cassée

    // Parser les blocs
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i].trim();

      // Si le bloc est un nom de ville (on le détecte par la regex)
      if (['Casablanca', 'Tanger', 'K\'enitra / Atlantic Free Zone', 'Autres villes'].includes(block)) {
        currentCity = block.replace(/\s*\n$/, '').trim();
        companiesByCity[currentCity] = [];
        continue;
      }
      
      // On traite le bloc de texte d'entreprise
      const lines = block.split('\n').filter(line => line.includes('•') || line.includes('Lien :'));
      
      lines.forEach((line, lineIndex) => {
        if (line.includes('•')) {
          const nameMatch = line.match(/•\s*(.*?)\s*—/);
          const emailMatch = line.match(/—\s*([^@\s]+@[^@\s]+\.[^@\s]+)\s*Lien/);
          const linkMatch = line.match(/Lien\s*:\s*(https?:\/\/\S+)/);

          const companyName = nameMatch ? nameMatch[1].trim() : 'Nom Inconnu';
          const email = emailMatch ? emailMatch[1].trim() : null;
          const link = linkMatch ? linkMatch[1].trim() : '#';
          
          if (companyName && companyName !== 'Entreprises') { // Filtre le titre de section
              if (!companiesByCity[currentCity]) { companiesByCity[currentCity] = []; } // S'assurer que le tableau existe
              
              companiesByCity[currentCity].push({
                  name: companyName,
                  email: email,
                  link: link
              });
          }
        }
      });
    }

    res.json(companiesByCity);

  } catch (error) {
    console.error("❌ Erreur lecture PDF Entreprises:", error);
    res.status(500).json({ message: "Erreur serveur lors de la lecture du fichier entreprises.pdf." });
  }
});

module.exports = router;