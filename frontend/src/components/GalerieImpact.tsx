import React, { useState, useCallback } from "react";
import {
	// Calendar,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Heart,
	Home,
	Hourglass,
	Leaf,
	Map as MapIcon,
	Sparkles,
	Zap,
	Droplets,
	BookOpen,
	Activity,
	Users,
	type LucideIcon,
	MapPin,
} from "lucide-react";
import puitImg from "../assets/Niinth.puit1.jpg";
import { Link } from "react-router-dom";

/* ----------------------------- 1. TYPES & CONFIGURATION ----------------------------- */

interface Action {
	id: string;
	title: string;
	description: string;
	image: string;
	location: string;
	date: string;
	isCoupDeCoeur: boolean;
	impact?: string;
}

const SAC_GREEN = "#28a745";

// Mapping des icônes par type de projet
const projectIcons: Record<string, LucideIcon> = {
	Eau: Droplets,
	Éducation: BookOpen,
	Santé: Activity,
	Social: Users,
	Default: Sparkles,
};

// Fonction pour déterminer quelle icône afficher selon le titre (Typage string ajouté)
const getProjectIcon = (title: string): LucideIcon => {
	const t = title.toLowerCase();
	if (t.includes("puits") || t.includes("oasis")) return projectIcons.Eau;
	if (t.includes("école") || t.includes("kits")) return projectIcons.Éducation;
	if (t.includes("santé") || t.includes("maternité")) return projectIcons.Santé;
	if (t.includes("social") || t.includes("denrées")) return projectIcons.Social;
	return projectIcons.Default;
};

/* ------------------------------ 2. DONNÉES ------------------------------- */

const mockActions: Action[] = [
	{
		id: "1",
		title: "Village l'Épopée Dakar",
		description:
			"Le projet Village l’Épopée, porté et coordonné par l’Association Simple Action Citoyenne avec le soutien de L'ambassade de FRANCE, est une initiative phare visant à promouvoir l’inclusion sociale.",
		image:
			"https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop",
		location: "Dakar.",
		date: "Phase initiale de 5 ans",
		isCoupDeCoeur: true,
		impact: "Renforcer l’employabilité des jeunes.",
	},
	{
		id: "2",
		title: "Zéro abris provisoire",
		description:
			"Construction de salles de classe, Daaras et Mosquées aux normes partout au Sénégal.",
		image:
			"https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop",
		location: "Partout au Sénégal",
		date: "01/11/2025",
		isCoupDeCoeur: false,
	},
	{
		id: "3",
		title: "Oasis Njarin",
		description:
			"Installation Puits & Forage, des systèmes de pompage d'eau pour les villages isolés.",
		image: puitImg,
		location: "Partout au Sénégal",
		date: "15/10/2025",
		isCoupDeCoeur: false,
	},
	{
		id: "4",
		title: "Je veux aller à l’école",
		description: "Campagne de distribution de plus de 5000 kits scolaires.",
		image:
			"https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000&auto=format&fit=crop",
		location: "Partout au Sénégal",
		date: "01/11/2025",
		isCoupDeCoeur: false,
	},
	{
		id: "5",
		title: "Social & Crowdfunding",
		description:
			"Création de cagnottes, de campagnes de Crowdfunding & distribution de denrées.",
		image:
			"https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop",
		location: "Partout au Sénégal",
		date: "01/11/2025",
		isCoupDeCoeur: false,
	},
	{
		id: "6",
		title: "Santé",
		description:
			"Rénovation de cases de santé et de maternités pour lutter contre la mortalité maternelle et infantile.",
		image:
			"https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1000&auto=format&fit=crop",
		location: "Partout au Sénégal",
		date: "01/11/2025",
		isCoupDeCoeur: false,
	},
];

const epopeeVerte = mockActions[0];
const carouselActions = mockActions.slice(1);

/* ------------------ 3. COMPOSANT DE CARTE (ACTION CARD) ------------------- */

interface ActionCardProps {
	action: Action;
	onClick: () => void;
}

const ActionCard = React.memo(({ action, onClick }: ActionCardProps) => {
	const IconComponent = getProjectIcon(action.title);

	return (
		<div
			className="bg-white rounded-[2rem] shadow-lg overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] relative
          min-w-[300px] w-full sm:min-w-[45%] lg:min-w-[calc(33.333%-20px)] snap-center border border-slate-100 flex flex-col"
		>
			{/* Badge Coup de Coeur */}
			{action.isCoupDeCoeur && (
				<div className="absolute top-4 right-4 z-20 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xl flex items-center">
					<Heart className="w-3 h-3 mr-1 fill-white" />
					Coup de Cœur
				</div>
			)}

			{/* Zone Image avec Icône Contextuelle */}
			<div className="relative h-70 overflow-hidden">
				<div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:bg-white">
					<IconComponent size={20} className="text-[#28a745]" />
				</div>

				{/* <img
					src={action.image}
					alt={action.title}
					className="w-full h-full object-cover transition duration-1000 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
			</div> */}

				<img
					src={action.image}
					alt={action.title}
					className={`w-full h-full object-cover transition duration-1000
    ${action.id === "3" ? "object-top scale-[1]" : "group-hover:scale-110"}
  `}
				/>
			</div>
			<div className="p-8 flex flex-col justify-between flex-grow">
				<div>
					<h3 className="text-2xl font-black text-slate-900 mb-3 transition-colors duration-300 group-hover:text-[#28a745]">
						{action.title}
					</h3>
					<p className="text-slate-600 mb-6 line-clamp-2 font-medium">
						{action.description}
					</p>
				</div>

				<div>
					<div className="space-y-2 text-sm text-slate-500 mb-6 border-t pt-4 border-slate-50">
						<p className="flex items-center font-semibold">
							<MapPin className="w-4 h-4 mr-2" style={{ color: SAC_GREEN }} />
							{action.location}
						</p>
						{/* 
						En attente des bonnes dates  */}
						{/* <p className="flex items-center font-semibold">
							<Calendar className="w-4 h-4 mr-2" style={{ color: SAC_GREEN }} />
							{action.date}
						</p> */}
					</div>

					<button
						type="button"
						onClick={onClick}
						className="text-[#28a745] font-black uppercase tracking-wider text-sm flex items-center hover:translate-x-2 transition-transform"
					>
						Découvrir <ChevronRight className="w-5 h-5 ml-1" />
					</button>
				</div>
			</div>
		</div>
	);
});

/* -------------------- 4. COMPOSANT PRINCIPAL (APP) -------------------- */

export default function App() {
	const [page, setPage] = useState<string>("home");
	const [currentIndex, setCurrentIndex] = useState(0);
	const itemsPerView = 3;
	const totalCarouselItems = carouselActions.length;
	const maxIndex = Math.max(0, totalCarouselItems - itemsPerView);

	const handleNext = useCallback(
		() => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex)),
		[maxIndex],
	);
	const handlePrev = useCallback(
		() => setCurrentIndex((prev) => Math.max(prev - 1, 0)),
		[],
	);

	if (page !== "home") {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center p-10 text-center bg-slate-50">
				<h1 className="text-4xl font-black mb-6 text-slate-900">{page}</h1>
				<p className="text-slate-600 mb-8 max-w-md">
					Détails du projet et impact sur le terrain en cours de chargement...
				</p>
				<button
					type="button"
					onClick={() => setPage("home")}
					className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-[#28a745] transition-colors"
				>
					Retour à la galerie
				</button>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white font-sans text-slate-900">
			<section id="actions" className="py-24 md:py-40 bg-[#f8fafc]">
				<div className="container mx-auto px-6 max-w-7xl">
					{/* Header de section */}
					<div className="text-center mb-24">
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100 mb-6">
							<Sparkles size={16} className="text-[#28a745]" />
							<span className="text-xs font-black tracking-[0.2em] uppercase text-[#28a745]">
								Notre Engagement
							</span>
						</div>
						<h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]">
							Découvrez nos projets
							<span className="text-[#28a745] italic"> phares</span>
						</h2>
					</div>

					{/* SECTION PROJET PHARE */}
					<div className="mt-12 mb-40">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center bg-white p-10 md:p-20 rounded-[4rem] shadow-2xl border border-slate-100 relative overflow-hidden group/main">
							<div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />

							<div className="order-2 lg:order-1 relative z-10">
								<h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1] flex flex-wrap items-center gap-4">
									<Home className="w-16 h-16 text-[#28a745] animate-pulse" />
									<span className="text-[#28a745]">Village l'Épopée</span>
									<div className="flex gap-2">
										<Hourglass className="w-10 h-10 text-amber-500 animate-pulse" />
									</div>
								</h3>
								<p className="text-slate-700 mb-6 font-medium text-lg leading-relaxed">
									{epopeeVerte.description}
								</p>

								<div className="space-y-6 mb-12 border-l-4 border-[#28a745] pl-8">
									<div className="flex items-center text-lg text-slate-800">
										<Zap className="w-6 h-6 mr-4 text-[#28a745]" />
										<span className="font-black mr-2">Impact :</span>
										<span className="text-slate-600">{epopeeVerte.impact}</span>
									</div>
									<div className="flex items-center text-lg text-slate-800">
										<MapIcon className="w-6 h-6 mr-4 text-[#28a745]" />
										<span className="font-black mr-2">Zone :</span>
										<span className="text-slate-600">
											{epopeeVerte.location}
										</span>
									</div>
								</div>

								<Link
									to="/epopee"
									className="group w-fit flex items-center gap-2 bg-slate-700 text-white px-6 py-4 rounded-3xl font-black hover:bg-[#28a745] transition-all duration-500 shadow-xl"
								>
									EN SAVOIR PLUS
									<Leaf className="ml-3 w-6 h-6 transition-transform group-hover:rotate-12" />
								</Link>
							</div>

							<div className="order-1 lg:order-2 self-stretch flex items-center justify-center relative">
								<div className="absolute -inset-4 bg-green-50 rounded-[4rem] -rotate-2 group-hover/main:rotate-0 transition-all duration-700" />
								<img
									src={epopeeVerte.image}
									alt={epopeeVerte.title}
									className="relative w-full lg:h-full lg:max-h-[550px] object-cover rounded-[3.5rem] shadow-2xl transition duration-700 group-hover/main:scale-[1.02]"
								/>
							</div>
						</div>
					</div>

					{/* CARROUSEL */}
					<div className="mt-32">
						<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
							<div>
								<h3 className="text-5xl font-black text-slate-900 tracking-tight">
									Explorer d'autres
									<span className="text-[#28a745] "> projets impactants</span>
								</h3>
								<div className="w-20 h-2 bg-[#28a745] mt-4 rounded-full" />
							</div>

							<div className="flex space-x-4">
								<button
									type="button"
									onClick={handlePrev}
									disabled={currentIndex === 0}
									className="p-5 rounded-2xl bg-white border border-slate-100 shadow-lg text-slate-900 hover:bg-[#28a745] hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-900"
								>
									<ChevronLeft className="w-6 h-6" />
								</button>

								<button
									type="button"
									onClick={handleNext}
									disabled={currentIndex >= maxIndex}
									className="p-5 rounded-2xl bg-white border border-slate-100 shadow-lg text-slate-900 hover:bg-[#28a745] hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-slate-900"
								>
									<ChevronRight className="w-6 h-6" />
								</button>
							</div>
						</div>

						<div className="relative overflow-hidden">
							<div
								className="flex gap-8 transition-transform duration-1000 ease-in-out"
								style={{
									transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
								}}
							>
								{carouselActions.map((action) => (
									<ActionCard
										key={action.id}
										action={action}
										onClick={() => setPage(action.title)}
									/>
								))}
							</div>
						</div>
					</div>

					<div className="text-center mt-32">
						<Link
							to="/actions"
							className="inline-flex items-center px-6 py-5 bg-slate-700 text-white text-lg font-black rounded-[2rem] shadow-2xl transition-all duration-500 hover:bg-[#28a745] hover:scale-105"
						>
							VOIR TOUS LES PROJETS
							<ChevronDown className="ml-3 w-5 h-5" />
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
