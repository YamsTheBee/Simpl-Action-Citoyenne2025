import { X, Github, Linkedin, } from "lucide-react";
import photoMariama from "../assets/PortraitYams.jpg"; 



// Utilisation d'icônes SVG intégrées pour garantir que l'aperçu fonctionne sans dépendances externes complexes
const CodeIcon = ({ size = 24 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>;

interface MariamaProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const profilePro = {
 email: "mariamadiaw.a@hotmail.fr", 
  skills: [
// Frontend & Backend
    "React (TypeScript)",
    "Node.js",
    "Express",
    "MySQL",
    "Tailwind CSS",

    // Production & Infrastructure
    "Déploiement (Vercel)",
    "Configuration DNS",
    "Configuration d’environnements de production",
    "SEO technique",

    // Qualité & Sécurité
    "Tests unitaires et d’intégration",
    "Sécurité web",
    "Bonnes pratiques RGPD",

    // IA
    "Prompt Engineering (IA générative)",
    "Intégration d’outils IA",
    "Google AI Essentials (certifiée)",

    // Méthodologie
    "Agile / Scrum",
    "Gestion de projet (Trello, Notion)",
  

    // Outils complémentaires
    "Figma",
    "Git / GitHub",
    "Outils collaboratifs (Slack, Google Workspace)",
    "Canva"


   
  ],
  github: "https://github.com/YamsTheBee",
  linkedin: "https://linkedin.com",
};

const MariamaProModal = ({ isOpen, onClose }: MariamaProModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mariama-pro-title"
    >
      <div className="relative bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

{/* HEADER AVEC DÉGRADÉ VIOLET -> GRIS */}
        <div className="flex justify-between items-center p-8 border-b bg-gradient-to-r from-indigo-50 via-slate-50 to-slate-100">
          <div className="flex items-center gap-6">
            <div className="relative">
              {/* Conteneur avec anneau blanc léger entre la bordure indigo et la photo */}
              <div className="w-50 h-50 rounded-full border-2 border-indigo-500 p-1.5 bg-white shadow-sm flex items-center justify-center overflow-hidden">
                <img 
                  src={photoMariama} 
                  alt="Mariama"
                  className="w-40 h-40 rounded-full object-cover scale-115"
                  style={{ objectPosition: 'center 5%' }}
                onError={(e) => {
                    e.currentTarget.src = "https://ui-avatars.com/api/?name=Mariama&background=6366f1&color=fff&size=128";
                  }}
                />
              </div>
              {/* Badge icône métier */}
              <div className="absolute bottom-1 right-1 p-2 bg-indigo-600 text-white rounded-xl border-2 border-white shadow-lg">
                <CodeIcon size={16} />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                Parcours & Expertise Pro
              </h2>
              <p className="text-sm text-indigo-600 uppercase tracking-widest font-bold mt-1.5">
                Mariama — Développeuse Web Full-Stack
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fermer la fenêtre"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* CONTENU */}
        <div className="p-8 md:p-10 overflow-y-auto max-h-[80vh]">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* COLONNE GAUCHE */}
            <div className="lg:col-span-3">
              <h4 className="text-lg font-bold mb-4 border-l-4 border-indigo-600 pl-3">
                Résumé de mon travail
              </h4>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  Développeuse web et web mobile <strong>full-stack</strong> passionnée, je
                  conçois et développe des applications web modernes, utiles et
                  centrées sur l’humain, avec une attention particulière portée à
                  l’<strong>UX/UI</strong>, à l’
                  <strong>accessibilité</strong> et à l’
                  <strong>impact social</strong>.
                </p>

            <p>
                Je travaille principalement avec{" "}
                <strong>React (TypeScript)</strong> côté front-end et{" "}
                <strong>Node.js / Express / MySQL</strong> côté back-end. 
                J’interviens de la conception jusqu’à la mise en production 
                (déploiement, configuration DNS, optimisation SEO), 
                avec une attention particulière portée à la stabilité, 
                la performance et la sécurisation des applications.
          </p>

                <p>
                  En parallèle, je développe plusieurs{" "}
                  <strong>projets concrets</strong> (portfolio, site associatif,
                  e-commerce, applications éducatives et solidaires), en suivant
                  une méthodologie professionnelle.
                </p>

                <ul className="list-disc list-inside ml-2">
                  <li>Conception (cahier des charges, wireframes, Figma)</li>
                  <li>Développement structuré, maintenable et orienté bonnes pratiques</li>
                  <li>Versioning et gestion de code avec Git / GitHub</li>
                  <li>Tests unitaires et d’intégration</li>
                  <li>Déploiement d’applications web </li>
                  <li>Configuration d’environnements de production</li>
                  <li>Gestion et configuration de nom de domaine (DNS)</li>
                  <li>Optimisation SEO technique (balises meta, title, favicon)</li>
                  <li>Attention portée à la qualité, la performance et l’accessibilité</li>
                  </ul>

              <p>
                Certifiée <strong>Google AI Essentials</strong>, j’intègre des outils 
                d’<strong>intelligence artificielle générative</strong> dans mes projets 
                grâce à des techniques de <strong>prompt engineering</strong> structurées, 
                tout en veillant à une utilisation responsable et sécurisée. 
                Je m’intéresse également à la <strong>cybersécurité</strong> afin de renforcer 
                la fiabilité et la protection des applications que je développe.
                </p>

                <p className="font-semibold text-slate-700">
                  🎯 Mon objectif : créer des solutions web{" "}
                  <strong>utiles, humaines et durables</strong>, en alliant
                  technique, créativité et engagement.
                </p>
              </div>

              {/* SKILLS */}
              <div className="flex flex-wrap gap-2 mt-6">
                {profilePro.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* INVITATION */}
              <div className="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-sm text-slate-700 font-medium">
                  🤝 <strong>Envie d’échanger ou de collaborer ?</strong>
                </p>
                <p className="text-xs text-slate-600 mt-2">
                  Je suis ouverte aux échanges avec des{" "}
                  <strong>professionnels</strong>,{" "}
                  <strong>associations</strong> et{" "}
                  <strong>porteurs de projets</strong> souhaitant créer des
                  solutions web utiles, humaines et durables.
                </p>
              </div>
            </div>

            {/* COLONNE DROITE */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                  Présence digitale
                </h4>

                <div className="flex flex-col gap-3">
                  <a
                    href={profilePro.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 hover:border-indigo-500 transition-all group"
                  >
                    <Github
                      size={20}
                      className="text-gray-700 group-hover:text-indigo-600"
                    />
                    <span className="font-medium text-sm">
                      GitHub – Projets & Code
                    </span>
                  </a>

                  <a
                    href={profilePro.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 hover:border-blue-500 transition-all group"
                  >
                    <Linkedin
                      size={20}
                      className="text-gray-700 group-hover:text-blue-600"
                    />
                    <span className="font-medium text-sm">LinkedIn</span>
                  </a>
                </div>
              </div>

            {/* CTA FINAL LIÉ À L'EMAIL */}
              <a
                href={`mailto:${profilePro.email}?subject=Collaboration%20Projet%20Web`}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <BriefcaseIcon />
                Discutons de votre projet
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MariamaProModal;
