import {
  Facebook,
  Ghost,
  Lock,
  Github,
  Instagram,
  Mail,
  MapPin,
  Twitter,
  Video,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Interface pour les items de navigation
interface NavItem {
  label: string;
  href: string;
  cta?: boolean;
}

interface FooterProps {
  onOpenMariamaModal: () => void;
}

const navItems: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/about" },
  { label: "Nos actions", href: "/actions" },
  { label: "Impact", href: "/impact" },
  { label: "Contact", href: "/contact" },
  { label: "Faire un don", href: "/donate", cta: true },
];

/**
 * Composant Footer principal avec la bande verte et les flèches de navigation
 */
const Footer: React.FC<FooterProps> = ({ onOpenMariamaModal }) => {
  // État local pour gérer l'ouverture du modal de don spécifique au footer
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer
      id="footer"
      className="bg-gray-900 text-white border-t-4 border-green-500"
      aria-label="Pied de page"
    >
      <div className="container mx-auto px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 border-b border-gray-700 pb-8 md:grid-cols-5">
          {/* Identité */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <h4 className="text-2xl font-extrabold text-green-400 tracking-tight">
                Simple Action Citoyenne
              </h4>
            </div>
            <p className="max-w-sm text-sm text-gray-400 leading-relaxed">
              Engagez-vous. Changez le monde, une action simple à la fois.
              Ensemble pour un impact durable au Sénégal.
            </p>

            {/* Zone de Don avec bouton et mention de sécurité placée en dessous */}
            <div className="mt-15 flex flex-col items-start gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95 text-sm"
              >
                Donner et Soutenir
              </button>

              {/* Bloc de sécurité positionné directement sous le bouton */}
              <div className="flex flex-col gap-1 px-1">
                <div className="flex items-center gap-2">
                  <Lock className="w-3 h-3 text-green-500" />
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                    100% Dons sécurisés
                  </p>
                </div>
                <p className="text-[10px] text-gray-600 italic">
                  (Wave, Orange Money, CB)
                </p>
              </div>
            </div>
          </div>

          {/* Navigation avec flèches vertes */}
          <nav aria-label="Navigation principale">
            <h5 className="mb-4 text-lg font-semibold uppercase tracking-wider text-gray-100">
              Navigation
            </h5>
            <ul className="space-y-2 text-gray-400">
              {navItems.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="group transition-colors hover:text-green-400 inline-flex items-center gap-2"
                  >
                    <span className="text-green-500 font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                      ›
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Ressources avec flèches discrètes */}
          <nav aria-label="Ressources">
            <h5 className="mb-4 text-lg font-semibold uppercase tracking-wider text-gray-100">
              Ressources
            </h5>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-green-500/50">›</span>
                <span className="cursor-not-allowed opacity-50 hover:text-gray-300 transition-colors">
                  Charte éthique
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500/50">›</span>
                <span className="cursor-not-allowed opacity-50 hover:text-gray-300 transition-colors">
                  Témoignages
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500/50">›</span>
                <span className="cursor-not-allowed opacity-50 hover:text-gray-300 transition-colors">
                  Presse
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500/50">›</span>
                <span className="cursor-not-allowed opacity-50 hover:text-gray-300 transition-colors">
                  Mentions légales
                </span>
              </li>
            </ul>
          </nav>

          {/* Contact & Réseaux */}
          <address className="not-italic">
            <h5 className="mb-4 text-lg font-semibold uppercase tracking-wider text-gray-100">
              Contact & réseaux
            </h5>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center group">
                <Mail
                  className="mr-3 h-5 w-5 text-green-400 transition-transform group-hover:scale-110"
                  aria-hidden="true"
                />
                <a
                  href="mailto:simpleactioncitoyenne@gmail.com"
                  className="hover:text-green-400 transition-colors break-all sm:break-normal text-sm"
                >
                  simpleactioncitoyenne@gmail.com
                </a>
              </li>

              <li className="flex items-center">
                <MapPin
                  className="mr-3 h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
                <span className="text-sm">Dakar, Sénégal</span>
              </li>
              {/*RÉSEAUX SOCIAUX */}
              <li className="pt-4">
                <p className="text-l font-extrabold tracking-tight text-green-400 mb-4">
                  Suivez-nous sur les réseaux sociaux
                </p>

                {/* 🔽 Icônes réseaux */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.facebook.com/people/Simple-Action-Citoyenne-Sac/100063615429202/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    className="p-2 bg-gray-800 rounded-full hover:bg-green-500 hover:text-white transition-all transform hover:-translate-y-1"
                  >
                    <Facebook className="h-5 w-5 text-green-400" />
                  </a>

                  <a
                    href="https://www.instagram.com/simple_action_citoyenne/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="p-2 bg-gray-800 rounded-full hover:bg-green-500 hover:text-white transition-all transform hover:-translate-y-1"
                  >
                    <Instagram className="h-5 w-5 text-green-400" />
                  </a>

                  <a
                    href="https://x.com/simpleactioncit?s=21"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="X (Twitter)"
                    className="p-2 bg-gray-800 rounded-full hover:bg-green-500 hover:text-white transition-all transform hover:-translate-y-1"
                  >
                    <Twitter className="h-5 w-5 text-green-400" />
                  </a>

                  <a
                    href="https://www.tiktok.com/@simple.action.cit"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="TikTok"
                    className="p-2 bg-gray-800 rounded-full hover:bg-green-500 hover:text-white transition-all transform hover:-translate-y-1"
                  >
                    <Video className="h-5 w-5 text-green-400" />
                  </a>

                  <a
                    href="https://www.snapchat.com/@simpleactioncit"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Snapchat"
                    className="p-2 bg-gray-800 rounded-full hover:bg-green-500 hover:text-white transition-all transform hover:-translate-y-1"
                  >
                    <Ghost className="h-5 w-5 text-green-400" />
                  </a>
                </div>
              </li>
            </ul>
          </address>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 pb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-gray-500 uppercase tracking-widest font-medium">
            <span>Simple Action Citoyenne © {new Date().getFullYear()}</span>

            <span className="hidden md:block">•</span>
            <span>Tous droits réservés</span>
            <span className="hidden md:block">•</span>
            {/* LIEN ADMIN DISCRET */}
            <Link
              to="/admin"
              className="hover:text-green-400 transition-colors opacity-40 hover:opacity-100"
            >
              Administration
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 tracking-normal">
            <button
              onClick={onOpenMariamaModal}
              className="hover:text-green-400 transition-colors underline-offset-4 hover:underline"
            >
              With 💚 Mariama
            </button>

            <a
              href="https://github.com/YamsTheBee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-gray-300 transition hover:text-green-400"
            >
              <Github className="h-3 w-3 text-green-400" aria-hidden="true" />
              YamsTheBee
            </a>
          </div>
        </div>
      </div>

      {/* Modal de don - Correction : isModalOpen au lieu de setIsModalOpen */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full relative shadow-2xl text-gray-900 animate-in zoom-in duration-300">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
            <h3 className="text-2xl font-black mb-4">Soutenir SAC</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Votre générosité alimente directement nos actions citoyennes.
            </p>
            <div className="space-y-3">
              <a
                href="#"
                className="block w-full py-4 bg-green-600 text-white rounded-xl font-bold text-center hover:bg-green-700 transition-colors"
              >
                Aller à la page de don
              </a>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-3 text-gray-400 font-bold text-sm"
              >
                Plus tard
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
