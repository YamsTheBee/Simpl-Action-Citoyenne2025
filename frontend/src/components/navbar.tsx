// --- 3. COMPOSANT NAVBAR ---
import { Home, Menu, X } from "lucide-react";
import type React from "react";
import { useState } from "react";

// --- 1. INTERFACES TYPESCRIPT ---
interface NavItem {
	label: string;
	href: string;
	cta?: boolean;
	icon?: React.ReactNode;
}

// --- 2. DONNÉES NAVBAR ---
const navItems: NavItem[] = [
	{ label: "Accueil", href: "/" },
	{ label: "À propos", href: "/about" },
	{ label: "Notre Impact", href: "/impact" },
	{ label: "Galerie", href: "/actions" },
	{ label: "Contact", href: "/contact" },

	{
		label: " Épopée",
		href: "/epopee",
		cta: true,
		icon: <Home size={18} className="text-amber-500" />,
	},
];

const NavBar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm shadow-md transition-all duration-300">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-20">
					{/* LOGO */}
					<a
						href="/"
						className="text-2xl font-extrabold tracking-tight text-gray-900 transition duration-300 hover:text-green-600"
					>
						Simple Action Citoyenne
					</a>

					{/* MENU DESKTOP */}
					<nav className="hidden md:flex items-center space-x-6">
						{navItems.map((item) => (
							<a
								key={item.label}
								href={item.href}
								className={`text-sm font-medium transition duration-300 ease-in-out uppercase tracking-wider ${
									item.cta
										? "px-4 py-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 hover:shadow-xl flex items-center"
										: "text-gray-700 hover:text-green-600"
								}`}
							>
								{item.cta && <Home className="w-4 h-4 mr-2" />}
								{item.label}
							</a>
						))}
					</nav>

					{/* BURGER MENU MOBILE */}
					<div className="md:hidden">
						<button
							type="button"
							onClick={() => setIsOpen(!isOpen)}
							aria-label="Toggle navigation"
							className="p-2 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150"
						>
							{isOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* MENU MOBILE */}
			{isOpen && (
				<div className="md:hidden absolute w-full bg-white shadow-xl border-t border-gray-100 animate-fade-in-down">
					<nav className="px-4 pt-2 pb-4 space-y-2">
						{navItems.map((item) => (
							<a
								key={item.label}
								href={item.href}
								onClick={() => setIsOpen(false)}
								className={`block w-full text-left px-3 py-3 rounded-lg text-base font-medium transition duration-200 ${
									item.cta
										? "bg-green-600 text-white hover:bg-green-700 mt-2 flex items-center"
										: "text-gray-700 hover:bg-gray-50 hover:text-green-600"
								}`}
							>
								{item.label}
							</a>
						))}
					</nav>
				</div>
			)}
		</header>
	);
};

export default NavBar;
