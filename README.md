# 🏆 ENSA-Connect : Plateforme d'Orientation & Carrière IA (Smart Guidance)

**Vainqueur de la 1ère Place de la compétition Think Code Win (organisée par le Club Codex Ensa Khouribga).**

**ENSA-Connect** est une plateforme web interactive conçue pour révolutionner l'orientation professionnelle et l'insertion des étudiants et diplômés de l'ENSA Khouribga. Elle utilise l'Intelligence Artificielle (IA) pour fournir des conseils personnalisés, centraliser l'information et connecter les talents aux meilleures opportunités.

---

## ✨ Points Forts du Projet

* **Moteur RAG (Retrieval-Augmented Generation) :** Le cœur du système, permettant au Chatbot IA de fournir des réponses précises en consultant une base de connaissances spécifique (PDFs officiels, fiches métiers, guides, etc.).
* **Données Dynamiques :** Extraction et parsing d'offres de stages et d'emplois directement depuis des fichiers PDF sources (ex: `data.pdf`, `opportunites_diplomé.pdf`, `entreprises.pdf`).
* **Espaces Utilisateurs Séparés :** Dashboards et fonctionnalités adaptés aux **Étudiants**, aux **Diplômés** et aux **Administrateurs**.
* **Design UX Moderne :** Interface utilisateur au style "Cyber-Future" optimisée pour une expérience fluide et engageante.

---

## 🏗️ Architecture Technique

Ce projet est basé sur une architecture **Full-Stack MERN-adjacent** (Next.js/PostgreSQL) avec une forte composante IA (RAG).

| Composant | Technologie | Rôle |
| :--- | :--- | :--- |
| **Frontend (Client)** | **Next.js 14**, React, Tailwind CSS | Interface utilisateur, Dashboards interactifs. |
| **Backend (API)** | **Node.js (Express)**, Sequelize | Gestion des utilisateurs, Authentification (JWT), Routes API. |
| **IA (RAG)** | **LangChain**, **Google Generative AI (Gemini)** | Ingestion, Vectorisation (Embedding) et Recherche de Contexte. |
| **Base de Données** | **PostgreSQL** | Stockage persistant des utilisateurs, CVs (via URL), et historique. |
| **Stockage Fichiers** | **Multer** | Gestion des uploads (CVs Utilisateurs) et des documents RAG. |



---

## 🚀 Fonctionnalités Clés

### 1. Espace Étudiant
* **Assistant IA (Chatbot) :** Guide personnalisé sur les filières, les cours et les exigences des stages.
* **Stages Dynamiques :** Liste des offres de stages extraite en temps réel d'un PDF source.
* **Gestion de Profil :** Mise à jour des informations, ajout de CV.

### 2. Espace Diplômé
* **Offres d'Emploi Exclusives :** Annuaire d'emplois (CDI, Freelance) et d'entreprises partenaires parsé depuis des documents PDF.
* **Compétences & Réseau :** Profil détaillé pour un matching précis avec les opportunités.

### 3. Espace Administration
* **Gestion de Documents RAG :** Interface d'upload pour alimenter la base de connaissances (PDF, TXT).
* **Supervision :** Consultation des utilisateurs et des statistiques de la plateforme.

---

## ⚙️ Installation et Démarrage

Ce projet nécessite deux serveurs distincts (Frontend et Backend/API).

### Prérequis

* Node.js (v18+)
* PostgreSQL (Base de données locale ou distante)
* Une clé API **Google Generative AI** (stockée dans un fichier `.env`).

### 1. Configuration du Backend (`server/`)

1.  **Créer un fichier `.env`** à la racine de `server/` et y coller vos identifiants :
    ```env
    # Google AI Key
    GOOGLE_API_KEY=VOTRE_CLE_GEMINI
    JWT_SECRET=VOTRE_CLE_SECRETE

    # Database (PostgreSQL)
    DB_NAME=smart_guidance_db
    DB_USER=postgres
    DB_PASSWORD=votre_mot_de_passe
    DB_HOST=localhost
    ```

2.  **Installer les dépendances et lancer l'API :**
    ```bash
    cd server
    npm install
    npm run start  # Crée la DB, les tables, et initialise le RAG
    ```

### 2. Configuration du Frontend (`client/`)

1.  **Installer les dépendances et lancer l'interface :**
    ```bash
    cd client
    npm install
    npm run dev
    ```

L'application sera accessible sur `http://localhost:3000`.

---

## 🤝 Équipe et Contributeurs

Ce projet a été réalisé dans le cadre de la compétition **Think Code Win**.

* **Soufiane Tafahi**
* **Omar Khemmi**

**Nom de l'Équipe : Khliha Ela Allah**
