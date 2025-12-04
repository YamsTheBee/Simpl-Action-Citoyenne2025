🌍 Simpl-Action-Citoyenne — Plateforme d’Engagement et d’Impact Local
Frontend — React • TypeScript • Vite • TailwindCSS
<div align="center">

</div>
🎯 Description du projet

Simpl-Action-Citoyenne (SAC) est une plateforme web destinée à faciliter et valoriser la participation citoyenne.
L’objectif : connecter les citoyens, les associations et les initiatives locales autour d’actions solidaires, environnementales, éducatives et sociales.

Ce dépôt correspond au frontend officiel du projet, développé en React + TypeScript avec un design moderne propulsé par TailwindCSS.

Les fonctionnalités clés prévues :

Valoriser des actions citoyennes sous forme de cartes interactives et sections modulaires

Permettre aux utilisateurs de découvrir, filtrer et s’engager sur différents projets

Présenter une page d’accueil immersive mettant en avant les missions phares

Créer un système modulaire et scalable pour accueillir les futures pages :

Nos Actions

Impact

S’engager

Contact

futurs composants UI

🧱 Stack Technique

React 18 + TypeScript

Vite (build ultra rapide)

TailwindCSS (design system unifié)

Lucide Icons (icônes modernes)

Biome (quality + lint + format)

Architecture component-driven (CDS) et pratique Atomic Components

🚀 Features actuelles — Page d’accueil

Déjà implémentées dans feature/homePage-update :

✔️ HeroSlider

Bannière immersive, image dynamique, texte d’impact citoyen.

✔️ MissionSection

Présentation claire des missions SAC, avec iconographie visuelle.

✔️ GalerieImpact (v1)

Grid + carousel responsive, affichage :

Coup de cœur ❤️

Localisation + date

Description courte

CTA vers l’initiative

✔️ FaitesUnDon

Composant dédié pour sensibiliser aux dons et soutenir les actions.

✔️ NavBar & Footer

Structure globale installée + design Tailwind modernisé.

🔧 Installation & utilisation
# Cloner le projet
git clone https://github.com/YamsTheBee/Simpl-Action-Citoyenne2025.git

cd Simpl-Action-Citoyenne2025/frontend

# Installer les dépendances
npm install

# Lancer le projet
npm run dev


Le site sera accessible sur 👉 http://localhost:5173

🔑 Variables d’environnement

Créer un fichier :

frontend/.env


ou utiliser le modèle :

frontend/.env.sample


Variables déjà prêtes pour accueillir la future API Node/Express :

VITE_API_URL=http://localhost:3000
VITE_APP_ENV=development

🗂️ Structure du projet
frontend/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── HeroSlider.tsx
│   │   ├── MissionSection.tsx
│   │   ├── GalerieImpact.tsx
│   │   ├── FaitesUnDon.tsx
│   │   └── Footer.tsx
│   ├── page/
│   │   └── Home.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.js
└── postcss.config.js

🧪 Qualité du code

Le projet utilise :

Biome → lint + format automatique

TypeScript strict → robustesse du code

Architecture modulaire → composants découplés, réutilisables et testables

Commandes :

npm run check      # Vérifie le code avec Biome
npm run format     # Formate le projet

🌀 Workflow Git (Agile)

Workflow professionnel adopté :

main → branche stable de production
dev → branche d’intégration continue
feature/... → travail unitairement (pages, composants, fix)


Exemple :

git checkout dev
git checkout -b feature/homePage-update


➡️ Chaque feature est suivie d'une Pull Request vers dev, puis un merge propre.

🛣️ Roadmap (v1 à v3)
v1 — Structure & Accueil

✔ HeroSlider
✔ Missions
✔ Impact gallery
✔ CTA Don
◻ Accessibilité (A11y)
◻ Internationalisation future

v2 — Pages secondaires

◻ Page "Nos actions" (avec filtres et catégories)
◻ Page "Impact" (statistiques + cartes + storytelling)
◻ Page "S’engager"
◻ Page "Contact" (formulaire + géolocalisation)

v3 — Backend API

◻ Node.js + Express
◻ MySQL Database
◻ CRUD des actions
◻ Authentification (JWT)
◻ Dashboard Admin

🤝 Contribution

Créer une nouvelle branche :
git checkout -b feature/my-feature

Développer la fonctionnalité

Vérifier le code :
npm run check

Commit + push

Créer une Pull Request vers dev

👩🏽‍💻 Développeuse

Mariama Diaw
Frontend & Fullstack Developer — Passionnée par l’UX, le clean code et l’impact social.

GitHub : https://github.com/YamsTheBee

🧡 Licence

Projet open-source sous licence MIT.
