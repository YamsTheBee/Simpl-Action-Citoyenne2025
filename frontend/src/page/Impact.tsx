import {
	BookOpen,
	ChevronLeft,
	ChevronRight,
	Droplets,
	HeartPulse,
	Home,
	X,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useCallback, useEffect, useRef, useState } from "react";
import puitImage from "../assets/Niinth.puit1.jpg";
import solidaritéImage from "../assets/Maïmouna.ministre.jpg";
import alyImage from "../assets/Pic1.Aly.Mbegte.jpg";
import heroImpactImage from "../assets/impact.Hero.jpg";

const HERO_IMAGE_URL = heroImpactImage;

const IMPACT_PHOTOS = [
	{
		url: solidaritéImage,
		caption: "Rencontre avec les partenaires ",
		category: "Partenariat",
	},
	{
		url: alyImage,
		caption: "Rénovation d'écoles ",
		category: "Éducation",
	},
	{
		url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
		caption: "Distribution annuelle de 5000+ kits scolaires",
		category: "Scolarité",
	},
	{
		url: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=80&w=800",
		caption: "Opération Set-Setal dans les quartiers",
		category: "Environnement",
	},

	{
		url: puitImage,
		caption: "Plus de 100 puits creusés",
		category: "Accès à l'eau",
	},
	{
		url: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&q=80&w=800",
		caption: "Réhabilitation de maternités rurales",
		category: "Santé",
	},
];

interface AnimatedStatProps {
	id: string;
	target: number;
	label: string;
	description: string;
	color: string;
	suffix?: string;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({
	id,
	target,
	label,
	description,
	color,
	suffix = "",
}) => {
	const ref = useRef<HTMLDivElement>(null);

	const duration =
		id === "stat-hours" ? 1000 : id === "stat-engagement" ? 1500 : 2000;

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		let start: number | null = null;

		const animate = (timestamp: number) => {
			if (!start) start = timestamp;
			const progress = Math.min((timestamp - start) / duration, 1);
			const value = Math.floor(progress * target);

			el.textContent = value.toLocaleString("fr-FR") + suffix;

			if (progress < 1) {
				requestAnimationFrame(animate);
			}
		};

		requestAnimationFrame(animate);
	}, [target, duration, suffix]);

	const colors: Record<string, { border: string; text: string }> = {
		"#007bff": { border: "border-blue-500", text: "text-blue-600" },
		"#28a745": { border: "border-green-500", text: "text-green-600" },
		"#ffc107": { border: "border-yellow-500", text: "text-yellow-500" },
	};

	const currentColors = colors[color] ?? {
		border: "border-gray-500",
		text: "text-gray-600",
	};

	return (
		<div
			className={`bg-white rounded-xl shadow-lg p-6 text-center border-b-4 ${currentColors.border} hover:shadow-xl transition duration-300`}
		>
			<div
				ref={ref}
				className={`text-5xl font-bold ${currentColors.text} mb-2`}
			>
				0
			</div>
			<p className="text-lg font-semibold text-gray-700">{label}</p>
			<p className="text-sm text-gray-500 mt-1">{description}</p>
		</div>
	);
};

const Impact = () => {
	const warningColor = "#ffc107";
	const lightBlueBg = "#e9f2ff";

	// --- Gestion de la Lightbox ---
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	const handleNext = useCallback(() => {
		setSelectedIndex((prev) =>
			prev === null ? null : (prev + 1) % IMPACT_PHOTOS.length,
		);
	}, []);

	const handlePrev = useCallback(() => {
		setSelectedIndex((prev) =>
			prev === null
				? null
				: (prev - 1 + IMPACT_PHOTOS.length) % IMPACT_PHOTOS.length,
		);
	}, []);

	// Défilement automatique et gestion clavier
	useEffect(() => {
		if (selectedIndex === null) return;

		// Auto-play toutes les 4 secondes
		const timer = setInterval(handleNext, 4000);

		// Gestion clavier
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setSelectedIndex(null);
			if (e.key === "ArrowRight") handleNext();
			if (e.key === "ArrowLeft") handlePrev();
		};
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			clearInterval(timer);
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [selectedIndex, handleNext, handlePrev]);

	return (
		<div className="text-gray-800 bg-gray-50 min-h-screen pb-16">
			{/* SECTION HERO */}
			<div className="relative w-full overflow-hidden bg-gray-900 h-[80vh]">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{
						backgroundImage: `url(${HERO_IMAGE_URL})`,
						backgroundAttachment: "fixed",
						height: "150%",
						top: "-25%",
					}}
				/>
				<div className="absolute inset-0 bg-gray-900/60" />

				<div className="relative z-10 flex items-center justify-center h-full text-white text-center p-4">
					<div className="max-w-4xl mt-60">
						<h1 className="text-5xl sm:text-7xl font-extrabold mb-2 leading-tight">
							Chaque Geste
							<span className="text-[#28a745] italic"> Compte.</span>
						</h1>

						<p className="text-xl sm:text-2xl font-light">
							<span className="text-xs font-bold uppercase tracking-widest block mt-2 opacity-90">
								Découvrez la force de notre communauté et l'impact réel des
								actions simples que nous menons ensemble.
							</span>
						</p>
					</div>
				</div>
			</div>
			<div className="container mx-auto px-6">
				{/* STATISTIQUES RÉELLES SAC */}
				<section className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24 relative z-20 mb-32">
					<AnimatedStat
						id="stat-puit"
						target={100}
						label="Puits Creusés"
						description="Accès direct à l'eau potable"
						color="#28a745"
						suffix="+"
					/>
					<AnimatedStat
						id="stat-kits"
						target={5000}
						label="Kits Scolaires"
						description="Distribués chaque année"
						color="#007bff"
						suffix="+"
					/>
					<AnimatedStat
						id="stat-volontaires"
						target={250}
						label="Bénévoles Actifs"
						description="Engagés pour la patrie"
						color="#ffc107"
						suffix="+"
					/>
				</section>

				{/* RÉCITS D'IMPACT */}
				<section className="mb-24 py-16 bg-white rounded-[3rem] px-8 md:px-16 shadow-xl shadow-slate-200/50 border border-slate-100">
					<div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
						<div>
							<div className="flex items-center gap-2 mb-4">
								<div className="w-12 h-1.5 bg-[#28a745] rounded-full" />
								<span className="text-[#28a745] font-black uppercase tracking-widest text-xs">
									Succès Stories
								</span>
							</div>
							<h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
								Histoires de{" "}
								<span className="italic underline decoration-[#28a745]/30">
									Succès
								</span>
							</h2>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
						{/* Education */}
						<div className="group bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-50 hover:shadow-2xl transition-all duration-500">
							<div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
								<BookOpen size={32} />
							</div>
							<h3 className="text-2xl font-black mb-4">Éducation</h3>
							<p className="text-slate-500 leading-relaxed font-medium">
								Nous luttons contre les abris provisoires en réhabilitant des
								salles de classes. Chaque année, plus de{" "}
								<strong>5000 enfants</strong> reçoivent le matériel nécessaire
								pour réussir.
							</p>
						</div>

						{/* Eau & Santé */}
						<div className="group bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-50 hover:shadow-2xl transition-all duration-500">
							<div
								className="
      w-16 h-16
      bg-sky-50
      rounded-2xl
      flex items-center justify-center
      mb-8
      transition-all
      group-hover:bg-sky-500
    "
							>
								<Droplets
									size={32}
									className="text-sky-500 group-hover:text-white transition-colors"
								/>
							</div>

							<h3 className="text-2xl font-black mb-4">Accès à l’Eau</h3>

							<p className="text-slate-500 leading-relaxed font-medium">
								Avec <strong>100 puits</strong>, nous réduisons la pénibilité
								pour les femmes et luttons contre les maladies hydriques, créant
								ainsi des zones de maraîchage fertiles.
							</p>
						</div>

						{/* Santé */}
						<div className="group bg-slate-50 rounded-[2.5rem] p-8 hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-slate-100">
							<div
								className="
      w-16 h-16
      bg-red-50
      rounded-2xl
      flex items-center justify-center
      mb-6
      transition-all
      group-hover:bg-red-500
    "
							>
								<HeartPulse
									size={32}
									className="text-red-500 group-hover:text-white transition-colors"
								/>
							</div>

							<h3 className="text-2xl font-black mb-4 text-slate-900">
								La Santé
							</h3>

							<p className="text-slate-600 leading-relaxed font-medium">
								Construction de structures sanitaires et amélioration de l’accès
								aux soins en zones prioritaires pour réduire les inégalités et
								offrir de meilleures conditions de vie aux populations. Plus de{" "}
								<strong>300 familles</strong> bénéficient désormais de services
								de santé de proximité.
							</p>
						</div>

						{/* L'Epopée */}
						<div className="group bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-50 hover:shadow-2xl transition-all duration-500">
							<div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all">
								<Home size={32} />
							</div>
							<h3 className="text-2xl font-black mb-4">L'Épopée Digitale</h3>
							<p className="text-slate-500 leading-relaxed font-medium">
								Notre nouveau projet vise l'<strong>inclusion numérique</strong>{" "}
								et l'employabilité des jeunes via l'apprentissage professionnel
								moderne et certifié.
							</p>
						</div>
					</div>
				</section>

				{/* GALERIE D'IMPACT */}
				<section className="mb-16">
					<h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
						<span className="w-8 h-1 bg-yellow-500 rounded-full" />
						Notre Impact en Images
					</h2>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{IMPACT_PHOTOS.map((photo, index) => (
							<button
								key={photo.url}
								type="button"
								onClick={() => setSelectedIndex(index)}
								className="group relative overflow-hidden rounded-2xl shadow-md h-72 cursor-pointer text-left"
							>
								<img
									src={photo.url}
									alt={photo.caption}
									className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
								/>
								{/* Overlay fixe (toujours visible) */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
									<span className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">
										{photo.category}
									</span>
									<p className="text-white font-medium text-lg leading-snug">
										{photo.caption}
									</p>
								</div>
							</button>
						))}
					</div>
				</section>

				{/* MODAL LIGHTBOX (Diaporama) */}
				{selectedIndex !== null && (
					<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-300">
						{/* Bouton Fermer */}
						<button
							type="button"
							onClick={() => setSelectedIndex(null)}
							className="absolute top-6 right-6 text-white/80 hover:text-yellow-500 transition-colors z-50"
						>
							<X size={40} />
						</button>

						{/* Flèche Gauche */}
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								handlePrev();
							}}
							className="absolute left-4 md:left-8 text-white/80 hover:text-yellow-500 transition-colors z-50 p-2"
						>
							<ChevronLeft size={56} />
						</button>

						{/* Image & Caption */}
						<div className="relative w-full max-w-6xl h-[85vh] flex flex-col items-center justify-center">
							<img
								src={IMPACT_PHOTOS[selectedIndex].url}
								alt={IMPACT_PHOTOS[selectedIndex].caption}
								className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
							/>
							<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-20 pb-8 px-6 text-center rounded-b-lg">
								<span className="text-yellow-400 text-sm font-bold uppercase tracking-[0.2em] mb-2 block shadow-black drop-shadow-md">
									{IMPACT_PHOTOS[selectedIndex].category}
								</span>
								<p className="text-white text-xl md:text-3xl font-medium drop-shadow-lg">
									{IMPACT_PHOTOS[selectedIndex].caption}
								</p>
							</div>
						</div>

						{/* Flèche Droite */}
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								handleNext();
							}}
							className="absolute right-4 md:right-8 text-white/80 hover:text-yellow-500 transition-colors z-50 p-2"
						>
							<ChevronRight size={56} />
						</button>
					</div>
				)}

				{/* CALL TO ACTION */}
				<section
					style={{ backgroundColor: lightBlueBg }}
					className="p-12 rounded-3xl text-center shadow-sm border border-blue-100"
				>
					<h2 className="text-3xl font-bold text-gray-800 mb-4">
						Rejoignez-nous !
					</h2>
					<p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
						Votre engagement est la seule variable qui compte. Aidez-nous à
						atteindre notre prochain objectif : 500 missions accomplies !
					</p>
					<Link
						to="/actions"
						className="inline-block text-gray-800 font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
						style={{ backgroundColor: warningColor }}
					>
						Voir les Missions Actuelles
					</Link>
				</section>
			</div>
		</div>
	);
};

export default Impact;
