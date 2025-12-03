/**
 * Composant : GalerieImpact + Carrousel des actions citoyennes
 * Projet : Simpl-Action-Citoyenne
 * Auteur : Mariama Diaw
 * Description :
 *  - Affiche les actions phares (3 premières)
 *  - Propose un carrousel horizontal pour les actions restantes
 *  - Responsive : grille sur desktop, scroll horizontal sur mobile
 */

import React, { useState, useMemo, useCallback } from "react";
import {
	Heart,
	Map as MapIcon,
	Calendar,
	ChevronRight,
	ChevronLeft,
	ChevronDown,
} from "lucide-react";

/* ----------------------------- 1. INTERFACES ----------------------------- */

interface Action {
	id: string;
	title: string;
	description: string;
	image: string;
	location: string;
	date: string;
	isCoupDeCoeur: boolean;
	href: string;
}

/* ------------------------------ 2. DONNÉES ------------------------------- */

const mockActions: Action[] = [
	{
		id: "1",
		title: "Épopée Verte",
		description:
			"Collecte de déchets et sensibilisation écologique en centre-ville.",
		image: "https://placehold.co/400x250/34D399/ffffff?text=Action+1",
		location: "Paris",
		date: "20/09/2025",
		isCoupDeCoeur: false,
		href: "/actions/1",
	},
	{
		id: "2",
		title: "Inclusion Numérique",
		description:
			"Aide à l'inclusion numérique des personnes âgées dans les maisons de retraite.",
		image: "https://placehold.co/400x250/FBBF24/ffffff?text=Action+2",
		location: "Lyon",
		date: "15/10/2025",
		isCoupDeCoeur: true,
		href: "/actions/2",
	},
	{
		id: "3",
		title: "Potagers Solidaires",
		description:
			"Création et entretien de potagers collectifs pour l'autonomie alimentaire.",
		image: "https://placehold.co/400x250/60A5FA/ffffff?text=Action+3",
		location: "Marseille",
		date: "01/11/2025",
		isCoupDeCoeur: false,
		href: "/actions/3",
	},
	{
		id: "4",
		title: "Rénov'Écoles",
		description:
			"Rénovation d'écoles primaires dans les quartiers défavorisés.",
		image: "https://placehold.co/400x250/8B5CF6/ffffff?text=Action+4",
		location: "Lille",
		date: "10/12/2025",
		isCoupDeCoeur: false,
		href: "/actions/4",
	},
	{
		id: "5",
		title: "Bibliothèque Mobile",
		description:
			"Bibliothèque itinérante pour favoriser l'accès à la lecture en zones rurales.",
		image: "https://placehold.co/400x250/EC4899/ffffff?text=Action+5",
		location: "Toulouse",
		date: "05/01/2026",
		isCoupDeCoeur: true,
		href: "/actions/5",
	},
	{
		id: "6",
		title: "Parrainage Étudiant",
		description:
			"Programme de mentorat pour étudiants de première année issus de milieux modestes.",
		image: "https://placehold.co/400x250/374151/ffffff?text=Action+6",
		location: "Bordeaux",
		date: "15/02/2026",
		isCoupDeCoeur: false,
		href: "/actions/6",
	},
	{
		id: "7",
		title: "Ateliers Cuisine Solidaire",
		description:
			"Ateliers anti-gaspillage + distribution de repas aux plus démunis.",
		image: "https://placehold.co/400x250/6D28D9/ffffff?text=Action+7",
		location: "Nantes",
		date: "01/03/2026",
		isCoupDeCoeur: true,
		href: "/actions/7",
	},
	{
		id: "8",
		title: "Hackathon Citoyen",
		description: "Événement de 48h pour des solutions numériques citoyennes.",
		image: "https://placehold.co/400x250/06B6D4/ffffff?text=Action+8",
		location: "Strasbourg",
		date: "15/04/2026",
		isCoupDeCoeur: false,
		href: "/actions/8",
	},
];

/* ------------------ 3. Composant de carte réutilisable ------------------- */

const GalerieImpact: React.FC<{ action: Action }> = React.memo(({ action }) => (
	<div
		className="bg-white rounded-xl shadow-lg overflow-hidden group transition duration-500 hover:shadow-xl hover:scale-[1.02] relative
               min-w-[320px] w-full sm:min-w-[45%] lg:min-w-[calc(33.333%-20px)] snap-center"
	>
		{/* Badge Coup de Cœur */}
		{action.isCoupDeCoeur && (
			<div className="absolute top-4 right-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xl flex items-center animate-fade-in-down">
				<Heart className="w-4 h-4 mr-1 fill-white" />
				Coup de Cœur
			</div>
		)}

		<img
			src={action.image}
			alt={action.title}
			className="w-full h-56 object-cover transition duration-500 group-hover:opacity-85"
			onError={(e) => {
				e.currentTarget.src =
					"https://placehold.co/400x250/6B7280/ffffff?text=Image+Introuvable";
			}}
		/>

		<div className="p-6 flex flex-col justify-between h-[calc(100%-14rem)]">
			<div>
				<h3 className="text-2xl font-bold text-gray-900 mb-2">
					{action.title}
				</h3>

				<p className="text-gray-600 mb-4 line-clamp-3">{action.description}</p>
			</div>

			<div>
				<div className="space-y-2 text-sm text-gray-500 mb-6 border-t pt-4 border-gray-100">
					<p className="flex items-center">
						<MapIcon className="w-4 h-4 mr-2 text-green-600" />
						{action.location}
					</p>

					<p className="flex items-center">
						<Calendar className="w-4 h-4 mr-2 text-green-600" />
						{action.date}
					</p>
				</div>

				<a
					href={action.href}
					className="text-green-600 font-bold flex items-center hover:text-green-800 transition duration-200"
				>
					Découvrir le projet <ChevronRight className="w-5 h-5 ml-1" />
				</a>
			</div>
		</div>
	</div>
));

/* -------------------- 4. Composant principal (Carrousel) -------------------- */

export default function App() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const totalItems = mockActions.length;
	const itemsPerView = 3;

	const primaryActions = mockActions.slice(0, itemsPerView);
	const carouselActions = mockActions.slice(itemsPerView);
	const totalCarouselItems = carouselActions.length;

	const maxIndex = useMemo(() => {
		return totalCarouselItems > itemsPerView
			? totalCarouselItems - itemsPerView
			: 0;
	}, [totalCarouselItems]);

	const handleNext = useCallback(() => {
		setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
	}, [maxIndex]);

	const handlePrev = useCallback(() => {
		setCurrentIndex((prev) => Math.max(prev - 1, 0));
	}, []);

	const translateX = `-${currentIndex * (100 / itemsPerView)}%`;
	const carouselWidth = `${totalCarouselItems * (100 / itemsPerView)}%`;

	const isCarouselNeeded = totalItems > itemsPerView;

	return (
		<section id="actions" className="py-20 md:py-32 bg-gray-50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
				{/* Titre / Header */}
				<div className="text-center mb-16">
					<span className="text-sm font-semibold uppercase tracking-wider text-green-600 bg-green-100 px-3 py-1 rounded-full">
						Notre Engagement
					</span>

					<h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4">
						Découvrez nos projets phares.
					</h2>

					<p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
						De la préservation de l'environnement à l'aide sociale,
						Simpl-Action-Citoyenne transforme l'engagement en impact réel.
					</p>
				</div>

				{/* 3 projets phares */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
					{primaryActions.map((action) => (
						<GalerieImpact key={action.id} action={action} />
					))}
				</div>

				{/* Carrousel */}
				{isCarouselNeeded && (
					<div className="mt-20 pt-10 border-t border-gray-200">
						<div className="flex justify-between items-center mb-12 md:mb-16">
							<h3 className="text-3xl font-bold text-gray-900">
								Explorer d'autres initiatives
							</h3>

							{totalCarouselItems > itemsPerView && (
								<div className="hidden lg:flex space-x-4">
									<button
										type="button"
										onClick={handlePrev}
										disabled={currentIndex === 0}
										className="p-3 rounded-full ..."
									>
										<ChevronLeft className="w-6 h-6" />
									</button>

									<button
										type="button"
										onClick={handleNext}
										disabled={currentIndex >= maxIndex}
										className="p-3 rounded-full ..."
									>
										<ChevronRight className="w-6 h-6" />
									</button>
								</div>
							)}
						</div>

						<div className="relative">
							<div className="flex overflow-x-scroll lg:overflow-hidden gap-6 pb-6 snap-x snap-mandatory scroll-smooth">
								<div
									className="flex gap-6 transition-transform duration-500 ease-in-out"
									style={
										isCarouselNeeded
											? {
													transform: `translateX(${translateX})`,
													width: carouselWidth,
												}
											: {}
									}
								>
									{carouselActions.map((action) => (
										<GalerieImpact key={action.id} action={action} />
									))}
								</div>
							</div>

							<p className="lg:hidden text-center text-sm text-gray-500 mt-4 flex items-center justify-center">
								<ChevronLeft className="w-4 h-4 mr-1" />
								Faites glisser pour voir plus
								<ChevronRight className="w-4 h-4 ml-1" />
							</p>
						</div>
					</div>
				)}

				{/* Bouton final */}
				<div className="text-center mt-20">
					<a
						href="/actions"
						className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-bold rounded-full shadow-xl text-white bg-green-600 hover:bg-green-700 ring-4 ring-green-200 transition duration-300 transform hover:scale-105"
					>
						Voir la liste complète des projets ({totalItems})
						<ChevronDown className="ml-2 w-5 h-5" />
					</a>
				</div>
			</div>
		</section>
	);
}
