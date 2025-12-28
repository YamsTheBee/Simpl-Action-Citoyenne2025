// --- Footer.tsx ---
import { Github, Link as LinkIcon, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface NavItem {
	label: string;
	href: string;
	cta?: boolean;
}

const navItems: NavItem[] = [
	{ label: "Accueil", href: "/" },
	{ label: "À propos", href: "/about" },
	{ label: "Nos actions", href: "/actions" },
	{ label: "Impact", href: "/impact" },
	{ label: "Contact", href: "/contact" },
	{ label: "Faire un don", href: "/donate", cta: true },
];

const Footer = () => {
	return (
		<footer
			id="footer"
			className="bg-gray-900 text-white"
			aria-label="Pied de page"
		>
			<div className="container mx-auto px-4 py-12 sm:px-6 md:py-16 lg:px-8">
				<div className="grid grid-cols-2 gap-8 border-b border-gray-700 pb-8 md:grid-cols-5">
					{/* Identité */}
					<div className="col-span-2">
						<h4 className="mb-4 text-2xl font-extrabold text-green-400">
							Simple Action Citoyenne
						</h4>
						<p className="max-w-sm text-gray-400">
							Engagez-vous localement. Changez le monde, une action simple à la
							fois.
						</p>
					</div>

					{/* Navigation */}
					<nav aria-label="Navigation principale">
						<h5 className="mb-4 text-lg font-semibold uppercase tracking-wider">
							Navigation
						</h5>
						<ul className="space-y-2 text-gray-400">
							{navItems.map(({ label, href }) => (
								<li key={href}>
									<Link to={href} className="transition hover:text-green-400">
										{label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{/* Ressources */}
					<nav aria-label="Ressources">
						<h5 className="mb-4 text-lg font-semibold uppercase tracking-wider">
							Ressources
						</h5>
						<ul className="space-y-2 text-gray-400">
							<li>
								<span className="cursor-not-allowed opacity-60">
									Charte éthique
								</span>
							</li>
							<li>
								<span className="cursor-not-allowed opacity-60">
									Témoignages
								</span>
							</li>
							<li>
								<span className="cursor-not-allowed opacity-60">Presse</span>
							</li>
							<li>
								<span className="cursor-not-allowed opacity-60">
									Mentions légales
								</span>
							</li>
						</ul>
					</nav>

					{/* Contact */}
					<address className="not-italic">
						<h5 className="mb-4 text-lg font-semibold uppercase tracking-wider">
							Contact & réseaux
						</h5>
						<ul className="space-y-3 text-gray-400">
							<li className="flex items-center">
								<Mail className="mr-3 h-5 w-5 text-green-400" aria-hidden />
								<a
									href="mailto:contact@sac.org"
									className="hover:text-green-400"
								>
									contact@sac.org
								</a>
							</li>

							<li className="flex items-center">
								<MapPin className="mr-3 h-5 w-5 text-green-400" aria-hidden />
								Dakar, Sénégal
							</li>

							<li className="flex items-center">
								<LinkIcon className="mr-3 h-5 w-5 text-green-400" aria-hidden />
								<a
									href="https://instagram.com"
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-green-400"
								>
									Suivez-nous
								</a>
							</li>
						</ul>
					</address>
				</div>

				{/* Copyright */}
				<div className="pt-6 text-center text-sm text-gray-500 md:text-left">
					<p>
						&copy; {new Date().getFullYear()} Simple Action Citoyenne. Tous
						droits réservés.
					</p>
					<p className="mt-2 text-xs text-gray-400">
						Made with 💚 by{" "}
						<a
							href="https://github.com/YamsTheBee"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1 transition hover:text-green-400"
						>
							<Github className="h-4 w-4" aria-hidden />
							YamsTheBee
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
