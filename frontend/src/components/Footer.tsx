// --- Footer.tsx ---
import type React from "react";
import { Mail, Map as MapIcon, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

// Même interface que dans NavBar
interface NavItem {
	label: string;
	href: string;
	cta?: boolean;
}

// Navigation compatible React Router
const navItems: NavItem[] = [
	{ label: "Accueil", href: "/" },
	{ label: "À Propos", href: "/about" },
	{ label: "Nos Actions", href: "/actions" },
	{ label: "Impact", href: "/impact" },
	{ label: "Contact", href: "/contact" },
	{ label: "Faire un Don", href: "/donate", cta: true }, // si page créée plus tard
];

const Footer: React.FC = () => {
	return (
		<footer id="footer" className="bg-gray-900 text-white">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
				{/* GRID PRINCIPALE */}
				<div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-gray-700 pb-8 mb-8">
					{/* IDENTITÉ */}
					<div className="col-span-2 md:col-span-2">
						<h4 className="text-2xl font-extrabold mb-4 text-green-400">
							Simple Action Citoyenne
						</h4>
						<p className="text-gray-400 max-w-sm">
							Engagez-vous localement. Changez le monde, une action simple à la
							fois.
						</p>
					</div>

					{/* NAVIGATION */}
					<div>
						<h5 className="text-lg font-semibold mb-4 uppercase tracking-wider">
							Navigation
						</h5>
						<ul className="space-y-2 text-gray-400">
							{navItems.map((item: NavItem) => (
								<li key={item.label}>
									<Link
										to={item.href}
										className="hover:text-green-400 transition duration-200"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* RESSOURCES */}
					<div>
						<h5 className="text-lg font-semibold mb-4 uppercase tracking-wider">
							Ressources
						</h5>
						<ul className="space-y-2 text-gray-400">
							<li>
								<a href="#" className="hover:text-green-400">
									Charte Éthique
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-green-400">
									Témoignages
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-green-400">
									Presse
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-green-400">
									Mentions Légales
								</a>
							</li>
						</ul>
					</div>

					{/* CONTACT */}
					<div>
						<h5 className="text-lg font-semibold mb-4 uppercase tracking-wider">
							Contact & Réseaux
						</h5>

						<ul className="space-y-3 text-gray-400">
							<li className="flex items-center">
								<Mail className="w-5 h-5 mr-3 text-green-400" />
								<a
									href="mailto:contact@sac.org"
									className="hover:text-green-400"
								>
									contact@sac.org
								</a>
							</li>

							<li className="flex items-center">
								<MapIcon className="w-5 h-5 mr-3 text-green-400" />
								Dakar, Sénégal
							</li>

							<li className="flex items-center">
								<LinkIcon className="w-5 h-5 mr-3 text-green-400" />
								<a
									href="https://instagram.com"
									className="hover:text-green-400"
								>
									Suivez-nous
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* COPYRIGHT */}
				<div className="text-center md:text-left pt-4 text-gray-500 text-sm">
					<p>
						&copy; {new Date().getFullYear()} Simple Action Citoyenne. Tous
						droits réservés.
						<br />
						<span className="text-xs text-gray-400">
							Développé avec 💚 par YamsTheBee.
						</span>
					</p>
				</div>
			</div>
		</footer>
	);
};
export default Footer;
