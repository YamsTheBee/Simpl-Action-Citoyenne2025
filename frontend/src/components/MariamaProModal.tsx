import { X, Github, Linkedin, Code, Briefcase } from "lucide-react";

interface MariamaProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const profilePro = {
  skills: [
    "React (TypeScript)",
    "Node.js",
    "MySQL",
    "Express",
    "Tailwind CSS",
    "Figma",
    "Git",
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

        {/* HEADER */}
        <div className="flex justify-between items-center p-8 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <Code size={24} />
            </div>
            <div>
              <h2
                id="mariama-pro-title"
                className="text-xl font-bold text-gray-900"
              >
                Parcours & Expertise Pro
              </h2>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
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
                  Développeuse web <strong>full-stack</strong> passionnée, je
                  conçois et développe des applications web modernes, utiles et
                  centrées sur l’humain, avec une attention particulière portée à
                  l’<strong>UX/UI</strong>, à l’
                  <strong>accessibilité</strong> et à l’
                  <strong>impact social</strong>.
                </p>

                <p>
                  Je travaille principalement avec{" "}
                  <strong>React (TypeScript)</strong> côté front-end et{" "}
                  <strong>Node.js / Express / MySQL</strong> côté back-end. Je
                  mets en place des fonctionnalités complètes : CRUD,
                  authentification, formulaires, APIs REST, gestion des
                  utilisateurs et premières briques de sécurité (
                  <strong>RGPD, cookies, bonnes pratiques</strong>).
                </p>

                <p>
                  En parallèle, je développe plusieurs{" "}
                  <strong>projets concrets</strong> (portfolio, site associatif,
                  e-commerce, applications éducatives et solidaires), en suivant
                  une méthodologie professionnelle.
                </p>

                <ul className="list-disc list-inside ml-2">
                  <li>Conception (cahier des charges, wireframes, Figma)</li>
                  <li>Développement structuré et maintenable</li>
                  <li>Versioning Git / GitHub</li>
                  <li>Attention portée à la qualité du code</li>
                </ul>

                <p>
                  Je m’intéresse également à l’
                  <strong> intelligence artificielle</strong> et à la
                  <strong> cybersécurité</strong>, avec la volonté d’intégrer des
                  outils IA de manière responsable pour améliorer la
                  productivité et la sécurité des applications.
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

              {/* CTA FINAL */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-colors"
              >
                <Briefcase size={18} />
                Discutons de votre projet
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MariamaProModal;
