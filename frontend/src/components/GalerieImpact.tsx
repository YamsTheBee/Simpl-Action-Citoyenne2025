import {
	Calendar,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Hammer,
	Heart,
	Hourglass,
	Leaf,
	Map as MapIcon,
	Sparkles,
	Zap,
} from "lucide-react";
import React, { useState, useMemo, useCallback } from "react";
import puitImage from "../assets/Niinth.puit1.jpg";

/* ----------------------------- 1. COULEURS & CONSTANTES ----------------------------- */
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

/* ------------------------------ 2. DONNÉES ------------------------------- */
const mockActions: Action[] = [
	{
		id: "1",
		title: "Village l'Épopée ",
		description:
			"Le projet Village l’Épopée est une initiative majeure de la Simple Action Citoyenne visant à promouvoir l’inclusion sociale et la valorisation des talents en réunissant entreprises, écoles, associations et citoyens dans un même espace collaboratif.",
		image:
			"https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop",
		location: "Sénégal",
		date: "Annuel (Saison des pluies)",
		isCoupDeCoeur: true,
		impact: "Chaque geste compte pour la cité.",
	},
	{
		id: "2",
		title: "Forage & Eau Potable",
		description:
			"Installation de systèmes de pompage d'eau pour les villages isolés.",
		image: puitImage,
		location: "Dakar",
		date: "15/10/2025",
		isCoupDeCoeur: false,
	},
	{
		id: "3",
		title: "Potagers Solidaires",
		description:
			"Création et entretien de potagers collectifs pour l'autonomie alimentaire locale.",
		image:
			"https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1000&auto=format&fit=crop",
		location: "Dakar",
		date: "01/11/2025",
		isCoupDeCoeur: false,
	},
];

const epopeeVerte = mockActions[0];
const carouselActions = mockActions.slice(1);

/* ------------------ 3. Composant de carte ------------------- */
const ActionCard: React.FC<{ action: Action; onClick: () => void }> =
	React.memo(({ action, onClick }) => (
		<div
			className="bg-white rounded-[2rem] shadow-lg overflow-hidden group transition duration-500 hover:shadow-2xl hover:scale-[1.02] relative
          min-w-[300px] w-full sm:min-w-[45%] lg:min-w-[calc(33.333%-20px)] snap-center border border-slate-100"
		>
			{action.isCoupDeCoeur && (
				<div className="absolute top-4 right-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xl flex items-center">
					<Heart className="w-4 h-4 mr-1 fill-white" />
					Coup de Cœur
				</div>
			)}

			<img
				src={action.image}
				alt={action.title}
				className="w-full h-56 object-cover transition duration-500 group-hover:opacity-85"
			/>

			<div className="p-8 flex flex-col justify-between h-[calc(100%-14rem)]">
				<div>
					<h3 className="text-2xl font-black text-slate-900 mb-3">
						{action.title}
					</h3>
					<p className="text-slate-600 mb-6 line-clamp-2 font-medium">
						{action.description}
					</p>
				</div>

				<div>
					<div className="space-y-2 text-sm text-slate-500 mb-6 border-t pt-4 border-slate-50">
						<p className="flex items-center font-semibold">
							<MapIcon className="w-4 h-4 mr-2" style={{ color: SAC_GREEN }} />
							{action.location}
						</p>
						<p className="flex items-center font-semibold">
							<Calendar className="w-4 h-4 mr-2" style={{ color: SAC_GREEN }} />
							{action.date}
						</p>
					</div>

					<button
						type="button"
						onClick={onClick}
						className="text-[#28a745] font-black flex items-center hover:translate-x-2 transition-transform"
					>
						Découvrir <ChevronRight className="w-5 h-5 ml-1" />
					</button>
				</div>
			</div>
		</div>
	));

/* -------------------- 4. Composant principal -------------------- */
export default function App() {
	const [page, setPage] = useState("home");
	const [currentIndex, setCurrentIndex] = useState(0);
	const itemsPerView = 3;
	const totalCarouselItems = carouselActions.length;
	const maxIndex = useMemo(
		() => Math.max(0, totalCarouselItems - itemsPerView),
		[totalCarouselItems],
	);

	const handleNext = useCallback(
		() => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex)),
		[maxIndex],
	);
	const handlePrev = useCallback(
		() => setCurrentIndex((prev) => Math.max(prev - 1, 0)),
		[],
	);

	// Simuler la navigation sans router
	if (page !== "home") {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
				<h1 className="text-4xl font-black mb-6">Page: {page}</h1>
				<p className="text-slate-600 mb-8">
					Contenu en cours de construction pour la démonstration.
				</p>
				<button
					type="button"
					onClick={() => setPage("home")}
					className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold"
				>
					Retour à l'accueil
				</button>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-white">
			<section id="actions" className="py-24 md:py-40 bg-[#f8fafc]">
				<div className="container mx-auto px-6 max-w-7xl">
					<div className="text-center mb-24">
						<div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100 mb-6">
							<Sparkles size={16} className="text-[#28a745]" />
							<span className="text-xs font-black tracking-[0.2em] uppercase text-[#28a745]">
								Notre Engagement
							</span>
						</div>
						<h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]">
							Découvrez nos projets
							<span className="text-[#28a745]"> phares.</span>
						</h2>
					</div>

					{/* SECTION PROJET PHARE */}
					<div className="mt-12 mb-40">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center bg-white p-10 md:p-20 rounded-[4rem] shadow-2xl border border-slate-100 relative overflow-hidden">
							<div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />

							<div className="order-2 lg:order-1 relative z-10">
								<h3 className="text-5xl md:text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9] flex items-center gap-4">
									<Hammer className="w-10 h-10 text-amber-500 animate-pulse" />
									<span className="text-[#28a745]">Village l'Épopée </span>
									<Hourglass className="w-10 h-10 text-amber-500 animate-pulse" />
								</h3>
								<p className="text-xl text-slate-600 mb-12 leading-relaxed font-medium">
									{epopeeVerte.description}
								</p>

								<div className="space-y-6 mb-12 border-l-4 border-[#28a745] pl-8">
									<div className="flex items-center text-lg text-slate-800">
										<Zap className="w-6 h-6 mr-4 text-[#28a745]" />
										<span className="font-black mr-2">Impact :</span>{" "}
										<span className="text-slate-600">{epopeeVerte.impact}</span>
									</div>
									<div className="flex items-center text-lg text-slate-800">
										<MapIcon className="w-6 h-6 mr-4 text-[#28a745]" />
										<span className="font-black mr-2">Zone :</span>{" "}
										<span className="text-slate-600">
											{epopeeVerte.location}
										</span>
									</div>
								</div>

								<button
									type="button"
									onClick={() => setPage("epopee")}
									className="group inline-flex items-center px-6 py-6 bg-slate-700 text-white text-l font-black rounded-3xl shadow-xl transition-all hover:bg-[#28a745] duration-500"
								>
									En savoir plus
									<Leaf className="ml-3 w-6 h-6" />
								</button>
							</div>

							<div className="order-1 lg:order-2 self-stretch flex items-center justify-center relative group">
								<div className="absolute -inset-4 bg-green-50 rounded-[4rem] -rotate-2 group-hover:rotate-0 transition-all duration-700" />
								<img
									src={epopeeVerte.image}
									alt={epopeeVerte.title}
									className="relative w-full lg:h-full lg:max-h-[550px] object-cover rounded-[3.5rem] shadow-2xl transition duration-700 group-hover:scale-[1.02]"
								/>
							</div>
						</div>
					</div>

					{/* CARROUSEL */}
					<div className="mt-32">
						<div className="flex justify-between items-end mb-16">
							<div>
								<h3 className="text-4xl font-black text-slate-900 tracking-tight">
									Explorer d'autres initiatives
								</h3>
								<div className="w-20 h-2 bg-[#28a745] mt-4 rounded-full" />
							</div>

							<div className="hidden lg:flex space-x-4">
								<button
									type="button"
									onClick={handlePrev}
									disabled={currentIndex === 0}
									className="p-5 rounded-2xl bg-white border border-slate-100 shadow-lg text-slate-900 hover:bg-slate-900 hover:text-white transition-all disabled:opacity-30"
								>
									<ChevronLeft className="w-6 h-6" />
								</button>
								<button
									type="button"
									onClick={handleNext}
									disabled={currentIndex >= maxIndex}
									className="p-5 rounded-2xl bg-white border border-slate-100 shadow-lg text-slate-900 hover:bg-slate-900 hover:text-white transition-all disabled:opacity-30"
								>
									<ChevronRight className="w-6 h-6" />
								</button>
							</div>
						</div>

						<div className="relative overflow-hidden">
							<div
								className="flex gap-8 transition-transform duration-700 ease-out"
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
						<button
							type="button"
							onClick={() => setPage("tous-les-projets")}
							className="inline-flex items-center px-12 py-6 bg-slate-700 text-white text-lg font-black rounded-[2rem] shadow-2xl transition-all duration-500 hover:bg-[#28a745] hover:scale-105"
						>
							Voir tous les projets
							<ChevronDown className="ml-3 w-5 h-5" />
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}
