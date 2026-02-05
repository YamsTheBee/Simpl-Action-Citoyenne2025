
# 🌍 Simple Action Citoyenne — Frontend

Frontend officiel du site **Simple Action Citoyenne 🇸🇳**  
Application web moderne développée en **React + TypeScript**, dédiée à une **association citoyenne à impact social réel**.

Le site permet :
- de présenter les actions de l’association,
- de sensibiliser le public,
- de recevoir des messages et des dons,
- de gérer un **panel administrateur sécurisé**.

👉 Projet réel, utilisé hors contexte scolaire.

---

## 👩🏽‍💻 Développeuse

**Mariama DIAW**  
Développeuse Frontend / Full-Stack JavaScript  
Lead technique – Simple Action Citoyenne

- React & TypeScript
- UX orientée utilisateur
- Sécurité & accessibilité
- Projet associatif à impact social

---

## 🎯 Objectifs du frontend

- Offrir une expérience utilisateur fluide et accessible
- Séparer clairement **espace public** et **espace administrateur**
- Consommer une API backend sécurisée
- Mettre en place une architecture maintenable et scalable
- Valoriser un projet associatif réel via une interface professionnelle

---

## 🛠️ Stack technique

### Frontend
- **React 18**
- **TypeScript**
- **Vite**
- **React Router DOM**
- **Tailwind CSS**
- **Chart.js** (statistiques admin)
- **Lucide Icons**

### Outils & qualité
- Context API (authentification)
- Protected Routes
- Variables d’environnement
- Architecture modulaire
- UX orientée accessibilité

---

## 🧱 Architecture frontend

```bash
frontend/
├── src/
│   ├── components/
│   │   ├── admin/              # Composants admin (sidebar, cards…)
│   │   ├── analytics/          # Google Analytics
│   │   ├── navbar / footer
│   │   └── UI & utilitaires
│   │
│   ├── context/
│   │   ├── AuthContext.tsx     # Auth admin
│   │   └── ProtectedRoute.tsx  # Guard routes
│   │
│   ├── page/
│   │   ├── admin/              # Pages admin
│   │   └── public pages
│   │
│   ├── App.tsx                 # Routing global
│   └── main.tsx
│
├── services/
│   └── adminService.ts         # Appels API backend
│
├── tailwind.config.js
├── vite.config.ts
└── README.md


--- 🔐 Authentification & Sécurité (Admin) ---

- Connexion admin via JWT
- Stockage sécurisé du token
- Protected Routes avec redirection automatique
- Séparation visuelle complète admin / public
- Vérification d’accès côté frontend + backend


<ProtectedRoute>
  <Route path="/admin/dashboard" element={<Dashboard />} />
</ProtectedRoute>


📊 Panel Administrateur

Fonctionnalités principales :

- Tableau de bord avec statistiques
- Évolution mensuelle des dons (Chart.js)
- Gestion des messages
- Gestion des dons
- Gestion des abonnés newsletter
- Activités récentes
- Layout admin dédié (sans navbar publique)

👉 Le panel admin est totalement isolé du site public


🌐 Routes principales

Routes publiques

- / – Accueil
- /about – À propos
- /impact – Impact social
- /actions – Actions terrain
- /contact – Contact

Routes admin : 
- /login – Connexion admin
- /admin/dashboard – Tableau de bord
- /admin/donations
- /admin/messages
- /admin/newsletter

--- ⚙️ Installation (local) --- 

1️⃣ Cloner le projet 

```bash
git clone git@github.com:YamsTheBee/Simpl-Action-Citoyenne2025.git
cd frontend

2️⃣ Installer les dépendances

```bash
npm install


3️⃣ Configurer l’environnement
Créer un fichier .env :

VITE_API_URL=http://localhost:5000


4️⃣ Lancer l’application
Application accessible sur :
👉 http://localhost:5173


🧪 Qualité & bonnes pratiques

Composants typés (TypeScript)
Gestion propre du routing
Layout conditionnel (public / admin)
Centralisation des appels API
Code lisible et maintenable
UX claire et cohérente


🤝 Contribuer

Projet ouvert à la collaboration (frontend / backend / UX).
📧 Contact : yamsnglfr@gmail.com


Développé avec ❤️ par Mariama DIAW
Développeuse Frontend / Full-Stack
Simple Action Citoyenne