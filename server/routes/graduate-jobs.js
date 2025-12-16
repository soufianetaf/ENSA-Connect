// server/routes/graduate-jobs.js
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

router.get('/', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../documents/opportunites_diplomé.pdf');
    
    if (!fs.existsSync(filePath)) {
      return res.json([]);
    }

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);
    const textContent = pdfData.text;

    // Découpage
    const rawOffers = textContent.split(/Offre N°\s*:/i);

    const structuredOffers = rawOffers.map((block, index) => {
      
      const clean = (text) => text ? text.replace(/\r\n|\n|\r/gm, " ").trim() : "Non spécifié";

      const extract = (key) => {
        const regex = new RegExp(`${key}\\s*[:|-]\\s*(.*)`, 'i');
        const match = block.match(regex);
        return match ? clean(match[1]) : null;
      };

      const extractDescription = () => {
        const start = block.indexOf("Description :");
        if (start === -1) return "Aucune description.";
        const endKeywords = ["Compétences requises", "Contact", "Lien"];
        let endIndex = block.length;
        endKeywords.forEach(kw => {
          const idx = block.indexOf(kw);
          if (idx !== -1 && idx > start && idx < endIndex) endIndex = idx;
        });
        return clean(block.substring(start + 13, endIndex));
      };

      const extractSkills = () => {
        const start = block.indexOf("Compétences requises");
        if (start === -1) return ["Général"];
        
        let part = block.substring(start);
        const endKeywords = ["Contact", "Lien", "Lieu"];
        let endIndex = part.length;
        endKeywords.forEach(kw => {
          const idx = part.indexOf(kw);
          if (idx !== -1 && idx > 5 && idx < endIndex) endIndex = idx;
        });

        const skillsPart = part.substring(0, endIndex);
        return skillsPart
          .split('\n')
          .filter(line => line.trim().startsWith('•') || line.trim().startsWith('-'))
          .map(line => line.replace(/[•-]/g, '').trim())
          .slice(0, 6);
      };

      let rawLink = extract("Lien");
      let cleanLink = rawLink ? rawLink.split(' ')[0] : '#'; 

      return {
        id: index,
        title: extract("Titre") || "Poste Ingénieur",
        company: extract("Entreprise") || "Entreprise Confidentielle",
        city: extract("Lieu") || "Maroc",
        description: extractDescription(),
        email: extract("Contact") || "Non spécifié",
        link: cleanLink,
        tags: extractSkills(),
        type: "CDI / Emploi"
      };
    })
    // ⚠️ LE FILTRE QUI CORRIGE LE BUG ⚠️
    // On garde seulement si le titre N'EST PAS la valeur par défaut
    // ET si la description N'EST PAS vide
    .filter(offer => 
        offer.title !== "Poste Ingénieur" && 
        offer.company !== "Entreprise Confidentielle" &&
        offer.description !== "Aucune description." &&
        offer.title.length > 3 // Sécurité supplémentaire
    );

    res.json(structuredOffers);

  } catch (error) {
    console.error("❌ Erreur PDF Graduate:", error);
    res.status(500).json({ message: "Erreur serveur lecture PDF" });
  }
});

module.exports = router;