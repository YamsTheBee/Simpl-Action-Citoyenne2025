import { useState, useEffect } from "react";
import {
	ArrowRight,
	Calendar,
	Heart,
	MapPin,
	Sparkles,
	Filter,
} from "lucide-react";
import puitImage from "../assets/Niinth.puit1.jpg";

// Configuration des catégories et des photos associées
const CATEGORIES = [
	"Toutes",
	"Solidarité",
	"Écologie",
	"Éducation",
	"Social",
	"Humanitaire",
];

const IMPACT_GALLERY = [
	{
		id: "1",
		title: "Village Épopée",
		category: "Écologie",
		description:
			"Collecte de déchets et sensibilisation massive sur les zones côtières pour préserver notre biodiversité.",
		image:
			"https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000",
		location: "Dakar et ses côtes",
		date: "Toute l'année",
		isCoupDeCoeur: true,
	},
	{
		id: "2",
		title: "Zero Abri Provisoire",
		category: "Solidarité",
		description:
			"Soutien hebdomadaire aux familles nécessiteuses à travers la distribution de repas équilibrés.",
		image:
			"https://images.unsplash.com/photo-1559027615-cd26715e731c?auto=format&fit=crop&q=80&w=800",
		location: "Banlieue de Dakar",
		date: "Chaque samedi",
		isCoupDeCoeur: false,
	},
	{
		id: "3",
		title: "Inclusion Numérique",
		category: "Éducation",
		description:
			"Ateliers d'accompagnement pour les seniors afin de briser l'isolement social grâce aux outils digitaux.",
		image:
			"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000",
		location: "Centre Communautaire",
		date: "En cours",
		isCoupDeCoeur: false,
	},
	{
		id: "4",
		title: "Oasis njardin",
		category: "Écologie",
		description:
			"Création de jardins partagés en zone urbaine pour favoriser l'autonomie alimentaire.",
		image:
			"https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000",
		location: "Quartier Plateau",
		date: "01 Novembre 2025",
		isCoupDeCoeur: true,
	},
	{
		id: "5",
		title: "Je veux aller à l'école",
		category: "Éducation",
		description:
			"Cours de renforcement pour les élèves en difficulté dans les zones rurales.",
		image:
			"https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800",
		location: "Écoles primaires",
		date: "Septembre - Juin",
		isCoupDeCoeur: false,
	},
	{
		id: "6",
		title: "Forage & Eau Potable",
		category: "Humanitaire",
		description:
			"Installation de systèmes de pompage d'eau pour les villages isolés.",
		image: puitImage,
		location: "Région de Thiès",
		date: "Projet 2024",
		isCoupDeCoeur: false,
	},
];

const Actions: React.FC = () => {
	const [activeFilter, setActiveFilter] = useState("Toutes");
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	const filteredActions =
		activeFilter === "Toutes"
			? IMPACT_GALLERY
			: IMPACT_GALLERY.filter((action) => action.category === activeFilter);

	return (
		<div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 overflow-x-hidden">
			{/* HEADER HERO */}
			<header className="relative bg-slate-900 text-white py-32 px-6 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-green-900/60 opacity-60" />
				<div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse" />
				<div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] -ml-36 -mb-36" />

				<div
					className={`container mx-auto relative z-10 text-center transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
				>
					<div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
						<span className="flex items-center gap-2">
							<Sparkles size={18} className="text-green-400" />
							<span className="text-xs font-black tracking-widest uppercase">
								Impact Réel & Engagement
							</span>
						</span>
					</div>
					<h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8">
						Nos <span className="text-[#28a745] italic">Actions</span>
					</h1>
					<p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-300 font-medium leading-relaxed">
						Centralisant chaque sourire, chaque projet et chaque transformation
						menée par l'association{" "}
						<span className="text-white font-bold">Simple Action Citoyen</span>.
					</p>
				</div>
			</header>

			{/* NAVIGATION FILTRES DYNAMIQUES */}
			<div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 py-6">
				<div className="container mx-auto px-6">
					<div className="flex flex-col md:flex-row items-center justify-between gap-6">
						<div className="flex items-center gap-3">
							<Filter size={20} className="text-[#28a745]" />
							<span className="font-black uppercase text-xs tracking-tighter text-slate-500">
								Filtrer par mission :
							</span>
						</div>
						<div className="flex flex-wrap justify-center gap-2">
							{CATEGORIES.map((cat) => (
								<button
									type="button"
									key={cat}
									onClick={() => setActiveFilter(cat)}
									className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 transform active:scale-95 ${
										activeFilter === cat
											? "bg-[#28a745] text-white shadow-lg shadow-green-500/30"
											: "bg-white text-slate-600 border border-slate-200 hover:border-[#28a745] hover:text-[#28a745]"
									}`}
								>
									{cat}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* GRILLE DE LA GALERIE */}
			<main className="container mx-auto px-6 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
					{filteredActions.map((action, idx) => (
						<div
							key={action.id}
							className={
								"group bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden flex flex-col hover:-translate-y-3 animate-in fade-in slide-in-from-bottom-10"
							}
							style={{ animationDelay: `${idx * 100}ms` }}
						>
							{/* IMAGE SECTION */}
							<div className="relative h-80 overflow-hidden">
								<img
									src={action.image}
									alt={action.title}
									className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110"
								/>

								{/* Badge de catégorie fixe */}
								<div className="absolute top-6 left-6 z-20">
									<span className="px-4 py-2 bg-slate-700/80  backdrop-blur-md  text-white text-[10px] font-black uppercase tracking-widest rounded-xl">
										{action.category}
									</span>
								</div>

								{/* Badge Coup de Coeur */}
								{action.isCoupDeCoeur && (
									<div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md text-red-600 px-4 py-2 rounded-2xl shadow-lg flex items-center text-[10px] font-black uppercase tracking-tighter z-20 animate-bounce">
										<Heart className="w-3 h-3 mr-1.5 fill-red-600" />
										Coup de cœur
									</div>
								)}

								{/* Overlay au survol */}
								<div className="absolute inset-0 bg-gradient-to-t from-[#28a745]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
									<div className="text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
										<p className="font-bold italic text-sm">
											Action citoyenne n°{action.id}
										</p>
									</div>
								</div>
							</div>

							{/* CONTENT SECTION */}
							<div className="p-10 flex flex-col flex-1">
								<div className="mb-6">
									<h2 className="text-3xl font-black text-slate-900 leading-tight group-hover:text-[#28a745] transition-colors duration-300">
										{action.title}
									</h2>
									<p className="text-slate-500 mt-4 leading-relaxed font-medium">
										{action.description}
									</p>
								</div>

								{/* DETAILS METADATA */}
								<div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
									<div className="flex items-center text-slate-600 font-bold text-xs uppercase tracking-tighter">
										<div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center mr-3 text-[#28a745]">
											<MapPin size={16} />
										</div>
										{action.location}
									</div>

									<div className="flex items-center text-slate-600 font-bold text-xs uppercase tracking-tighter">
										<div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center mr-3 text-[#28a745]">
											<Calendar size={16} />
										</div>
										{action.date}
									</div>
								</div>

								{/* CTA BUTTON */}
								<div className="mt-10">
									<button
										type="button"
										className="flex items-center justify-center w-full bg-slate-600 group-hover:bg-[#28a745] text-white font-black py-5 px-6 rounded-2xl shadow-xl shadow-slate-900/10 group-hover:shadow-green-500/20 transition-all duration-300 transform active:scale-95"
									>
										Détails du projet
										<ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
};

export default Actions;
