/**
 * PAGE PROJET : L'Épopée Verte "Phare"
 * Composant présentant les détails de la page épopée, l'impact et la galerie d'un projet spécifique.
 */
import {
	ArrowRight,
	Briefcase,
	Camera,
	GraduationCap,
	Home,
	Lightbulb,
	Target,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Simulation des imports d'images (utilisant des placeholders pour le rendu)
const galleryImages = [
	{
		id: 1,
		src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
		alt: "Session de formation collaborative",
	},
	{
		id: 2,
		src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
		alt: "Atelier d'innovation numérique",
	},
	{
		id: 3,
		src: "https://images.unsplash.com/photo-1523240715639-99781318a000?q=80&w=1000&auto=format&fit=crop",
		alt: "Mentorat de jeunes entrepreneurs",
	},
	{
		id: 4,
		src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop",
		alt: "Espace de co-working communautaire",
	},
];

interface MissionPoint {
	id: string;
	icon: React.ReactNode;
	text: string;
}

interface ImpactMetric {
	id: string;
	value: string;
	label: string;
}

interface ProjectData {
	title: string;
	tagline: string;
	description: string;
	missionPoints: MissionPoint[]; //  MissionPoint
	impactMetrics: ImpactMetric[]; // ImpactMetric
}
const EPopeeData: ProjectData = {
	title: "Village l'Épopée",
	tagline:
		"Un voyage d'action, l'espace d'innovation sociale dédié à la formation, à l'entrepreneuriat et au mentorat des jeunes.",
	description: `
    Le projet "Village l’Épopée" est une initiative majeure de la Simple Action Citoyenne visant à promouvoir l’inclusion sociale et la valorisation des talents en réunissant entreprises, écoles, associations et citoyens dans un même espace collaboratif.

    Face au défi du chômage, nous encourageons un modèle éducatif axé sur l’apprentissage par l’action en liant les enseignements académiques aux réalités du monde professionnel. Notre mission est de révéler le potentiel des jeunes en leur offrant un environnement qui promeut leur épanouissement et renforce leurs capacités techniques et managériales.
  `,
	missionPoints: [
		{
			id: "collaboration",
			icon: <Target className="text-emerald-500" size={20} />,
			text: "Réunir entreprises, écoles et citoyens dans un espace collaboratif unique.",
		},
		{
			id: "education",
			icon: <GraduationCap className="text-sky-500" size={20} />,
			text: "Lier enseignements académiques et réalités concrètes du monde professionnel.",
		},
		{
			id: "innovation",
			icon: <Lightbulb className="text-amber-500" size={20} />,
			text: "Révéler le potentiel des jeunes via l'innovation digitale et la robotique.",
		},
		{
			id: "employability",
			icon: <Briefcase className="text-purple-500" size={20} />,
			text: "Assurer l'employabilité par une formation de qualité adéquate aux besoins des recruteurs.",
		},
	],
	impactMetrics: [
		{ id: "duration", value: "5 ans", label: "Durée de projet" },
		{ id: "quality", value: "Qualité", label: "Apprentissage" },
		{ id: "country", value: "Sénégal", label: "Impact National" },
		{ id: "engagement", value: "+100%", label: "Engagement" },
	],
};

const EpopeePage: React.FC = () => {
	const navigate = useNavigate();
	const [hasLoaded, setHasLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setHasLoaded(true), 100);
		return () => clearTimeout(timer);
	}, []);

	const heroStyle = {
		opacity: hasLoaded ? 1 : 0,
		transform: hasLoaded ? "scale(1)" : "scale(0.98)",
		transition: "opacity 1s ease-out, transform 0.8s ease-out",
	};

	const SectionTitle: React.FC<{ children: React.ReactNode }> = ({
		children,
	}) => (
		<h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8 border-l-8 border-[#28a745] pl-6">
			{children}
		</h2>
	);

	return (
		<div className="min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-800">
			<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
				<button
					type="button"
					onClick={() => navigate("/")}
					className="mb-10 inline-flex items-center text-[#28a745] font-bold hover:underline transition-all"
				>
					← Retour à l’accueil
				</button>

				{/* --- 1. Section Héro --- */}
				<header
					className="text-center py-24 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] mb-16 overflow-hidden relative border border-slate-100"
					style={heroStyle}
				>
					<div className="relative z-10 px-6">
						<h1 className="text-5xl sm:text-7xl font-black mb-6 tracking-tighter  inline-flex items-center gap-2">
							<Home className="w-18 h-18 text-amber-500 animate-pulse align-middle" />
							<span className="text-[#28a745]">{EPopeeData.title}</span>

							<span className="text-amber-500"> . . .</span>
						</h1>
						<p className="text-xl sm:text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
							{EPopeeData.tagline}
						</p>
					</div>
					<div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-40" />
				</header>

				{/* --- 2. Mission et Impact --- */}
				<section className="bg-white p-8 sm:p-14 rounded-[2.5rem] shadow-xl shadow-slate-200/50 mb-16 border border-slate-50">
					<SectionTitle>Notre Mission Détaillée</SectionTitle>
					<div className="flex flex-col lg:flex-row gap-12">
						<div className="lg:w-2/3">
							<p className="text-xl text-slate-600 leading-relaxed whitespace-pre-line mb-10">
								{EPopeeData.description.trim()}
							</p>

							<div className="grid grid-cols-1 gap-6">
								<h3 className="text-2xl font-bold text-slate-900 mb-2">
									Objectifs Stratégiques
								</h3>
								<div className="space-y-4">
									{EPopeeData.missionPoints.map((point) => (
										<div
											key={point.id}
											className="flex items-center p-5 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:shadow-md hover:border-green-200"
										>
											<div className="flex-shrink-0 mr-5 bg-white p-3 rounded-xl shadow-sm">
												{point.icon}
											</div>
											<span className="font-bold text-slate-700 text-lg leading-snug">
												{point.text}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* --- 3. Métriques d'Impact --- */}
						<div className="lg:w-1/3 p-8 bg-slate-900 rounded-[2rem] text-white flex flex-col justify-center">
							<h3 className="text-2xl font-bold mb-8 text-center text-[#28a745]">
								Impact Réel
							</h3>
							<div className="grid grid-cols-2 gap-6">
								{EPopeeData.impactMetrics.map((metric) => (
									<div
										key={metric.id}
										className="text-center p-4 bg-white/5 rounded-2xl border border-white/10"
									>
										<p className="text-2xl font-black text-white mb-1">
											{metric.value}
										</p>
										<p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-tight">
											{metric.label}
										</p>
									</div>
								))}
							</div>
							<div className="mt-10 p-4 bg-green-500/10 rounded-2xl border border-green-500/20 text-center">
								<p className="text-sm text-green-300 italic">
									"Chaque geste compte pour l'avenir de notre cité."
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* --- 4. Galerie --- */}
				<section className="mb-16">
					<SectionTitle>Galerie & Témoignages</SectionTitle>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						{galleryImages.map((item) => (
							<div
								key={item.id}
								className="group relative rounded-[2rem] overflow-hidden shadow-lg aspect-video bg-slate-200 border-4 border-white"
							>
								<img
									src={item.src}
									alt={item.alt}
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
									loading="lazy"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
									<p className="text-white font-bold text-lg">{item.alt}</p>
								</div>
								<div className="absolute top-5 right-5 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
									<Camera size={20} />
								</div>
							</div>
						))}
					</div>
				</section>
				{/* --- 5. Appel à l'Action --- */}
				<section className="text-center bg-white p-12 sm:p-20 rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden">
					<div className="relative z-10">
						<h3 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">
							Rejoignez l'aventure<span className="text-[#28a745]">.</span>
						</h3>
						<p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto">
							Que ce soit par un don, du temps ou des compétences, votre
							implication est le moteur de cette transition sociale.
						</p>

						<div className="flex flex-col sm:flex-row justify-center gap-6">
							<button
								type="button"
								className="flex items-center justify-center bg-[#28a745] text-white font-black py-5 px-10 rounded-2xl shadow-xl shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-1 transition-all duration-300 text-lg group"
							>
								Suivre ce Projet
							</button>
							<Link
								to="/contact"
								className="flex items-center justify-center bg-slate-900 text-white font-black py-5 px-10 rounded-2xl shadow-xl shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-1 transition-all duration-300 text-lg group"
							>
								Devenir Volontaire{" "}
								<ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-2" />
							</Link>
						</div>
					</div>
					<div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
					<div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -ml-32 -mb-32 opacity-50" />
				</section>
			</div>
		</div>
	);
};

export default EpopeePage;
