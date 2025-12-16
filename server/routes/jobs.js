// server/routes/jobs.js
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

router.get('/', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../documents/data.pdf');
    
    if (!fs.existsSync(filePath)) {
      return res.json([]);
    }

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);
    const textContent = pdfData.text;

    // 1. Découpage (Split)
    const rawOffers = textContent.split(/Offre N°\s*:/i);

    const structuredOffers = rawOffers.map((block, index) => {
      // Fonction de nettoyage
      const clean = (text) => text ? text.trim() : "Non spécifié";

      const extract = (key) => {
        // Regex plus souple qui cherche le mot clé et prend la ligne
        const regex = new RegExp(`${key}\\s*[:|-]\\s*(.*)`, 'i');
        const match = block.match(regex);
        return match ? clean(match[1]) : "Non spécifié";
      };

      const extractSkills = () => {
        const start = block.indexOf("Compétences requises");
        if (start === -1) return ["Général"];

        let part = block.substring(start);
        const endKeywords = ["Contact", "Lien", "Lieu", "Offre N°"];
        let endIndex = part.length;
        
        endKeywords.forEach(kw => {
          const idx = part.indexOf(kw);
          if (idx !== -1 && idx > 5 && idx < endIndex) endIndex = idx;
        });

        const skillsPart = part.substring(0, endIndex);
        return skillsPart
          .split('\n')
          .map(line => line.trim())
          .filter(line => 
            (line.startsWith('•') || line.startsWith('-') || line.length > 2) && 
            !line.includes("Compétences requises") && 
            !line.includes(":")
          )
          .map(line => line.replace(/[•-]/g, '').trim())
          .slice(0, 5);
      };

      // Extraction du lien
      let link = extract("Lien");
      if (link.includes(" ")) link = link.split(" ")[0]; // Prend juste l'URL si y'a du texte après

      return {
        id: index,
        title: extract("Titre"),
        company: extract("Entreprise"),
        city: extract("Lieu"),
        description: extract("Description"),
        link: link.startsWith('http') ? link : '#',
        tags: extractSkills(),
        type: (block.toLowerCase().includes('pfe') || block.toLowerCase().includes('fin d\'étude')) ? 'Stage PFE' : 'Stage'
      };
    })
    // ⚠️ LE FIX EST ICI : On supprime les offres vides ou mal lues
    .filter(offer => 
        offer.title !== "Non spécifié" && 
        offer.company !== "Non spécifié" &&
        offer.title.length > 2 // Supprime les titres trop courts (bruit)
    );

    res.json(structuredOffers);

  } catch (error) {
    console.error("❌ Erreur PDF:", error);
    res.status(500).json({ message: "Erreur lecture offres" });
  }
});

module.exports = router;