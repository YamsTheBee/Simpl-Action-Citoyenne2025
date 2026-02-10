import {
	Facebook,
	Ghost,
	Github,
	Instagram,
	Mail,
	MapPin,
	Twitter,
	Video,
} from "lucide-react";
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
const Footer = ({ onOpenMariamaModal }: FooterProps) => {


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

							{/* liens Réseaux Sociaux officiels de SAC */}
							<li className="pt-2 flex flex-wrap gap-3">
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
							</li>
						</ul>
					</address>
				</div>

				{/* Copyright */}
				<div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 pb-10">
					<div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-gray-500 uppercase tracking-widest font-medium">
						<span>Simple Action Citoyenne © {new Date().getFullYear()}</span>
						<span className="hidden md:block">•</span>
						<span>Dakar, Sénégal</span>
						<span className="hidden md:block">•</span>
						<span>Tous droits réservés</span>
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
  className="text-gray-400 hover:text-green-400 transition-colors underline-offset-4 hover:underline"
>
  Made with 💚 by Mariama
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
		</footer>
	);
};

export default Footer;
