// import { Globe, Heart, Users, Zap } from "lucide-react";
import { useEffect, useRef } from "react";
import puitImage from "../assets/Niinth.puit1.jpg";
import solidaritéImage from "../assets/Maïmouna.ministre.jpg";
import alyImage from "../assets/Pic1.Aly.Mbegte.jpg";
import heroImpactImage from "../assets/impact.Hero.jpg";

const HERO_IMAGE_URL = heroImpactImage;

const SOCIAL_IMAGE_URL =
	"https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800";

const IMPACT_PHOTOS = [
	{
		url: solidaritéImage,
		caption: "Rencontre avec le ministre ",
		category: "Partanariat",
	},
	{
		url: alyImage,
		caption: "Travaux de rénovation de l'école....",
		category: "Renovation école",
	},
	{
		url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
		caption: "Distribution de kits Scolaires",
		category: "Éducation",
	},
	{
		url: SOCIAL_IMAGE_URL,
		caption: "Distribution de kits Scolaires",
		category: "Social",
	},
	{
		url: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=80&w=800",
		caption: "Opération de nettoyage de quartier",
		category: "Environnement",
	},
	{
		url: puitImage,
		caption: "Inauguration d'un nouveau puits",
		category: "Humanitaire",
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
	const primaryColor = "#007bff";
	const successColor = "#28a745";
	const warningColor = "#ffc107";
	const lightBlueBg = "#e9f2ff";

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
						<h1 className="text-7xl sm:text-Rxl font-extrabold mb-4 leading-tight">
							Chaque Geste
							<span className="text-[#28a745]"> Compte.</span>
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

			<div className="container mx-auto px-4 sm:px-8">
				{/* STATISTIQUES */}
				<section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 -mt-20 relative z-20">
					<AnimatedStat
						id="stat-engagement"
						target={2500}
						label="Citoyens Engagés"
						description="Utilisateurs actifs sur les missions."
						color={primaryColor}
					/>
					<AnimatedStat
						id="stat-missions"
						target={450}
						label="Missions Accomplies"
						description="Projets locaux menés à terme."
						color={successColor}
						suffix="+"
					/>
					<AnimatedStat
						id="stat-hours"
						target={12345}
						label="Heures de Bénévolat"
						description="Temps total donné par les volontaires."
						color={warningColor}
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
						{/* <p className="max-w-md text-slate-500 font-medium">
							Découvrez comment vos dons et votre engagement transforment
							concrètement le quotidien des communautés.
						</p> */}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{/* Education */}
						<div className="group bg-slate-50 rounded-[2.5rem] p-8 hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-slate-100">
							<div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 origin-left">
								🏫
							</div>
							<h3 className="text-2xl font-black mb-4 text-slate-900">
								Éducation Inclusive
							</h3>
							<p className="text-slate-600 leading-relaxed font-medium">
								Grâce à la construction et la rénovation d'écoles pour garantir
								un environnement scolaire dans le confort et la sécurité, ainsi
								que la distribution de kits scolaires.
							</p>
						</div>

						{/* Santé */}
						<div className="group bg-slate-50 rounded-[2.5rem] p-8 hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-slate-100">
							<div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 origin-left">
								🪣
							</div>
							<h3 className="text-2xl font-black mb-4 text-slate-900">
								La Santé
							</h3>
							<p className="text-slate-600 leading-relaxed font-medium">
								Construction de puits et forages en zones prioritaires pour
								réduire les inégalités et donner aux femmes garantes des foyers
								de meilleures conditions de vie. Plus de{" "}
								<strong>300 familles</strong> bénéficient désormais d'un accès
								direct à l'eau potable.
							</p>
						</div>

						{/* Bien-être (Ajouté) */}
						<div className="group bg-slate-50 rounded-[2.5rem] p-8 hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-slate-100">
							<div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 origin-left">
								🌱
							</div>
							<h3 className="text-2xl font-black mb-4 text-slate-900">
								Bien-être Social
							</h3>
							<p className="text-slate-600 leading-relaxed font-medium">
								Mise en place d'espaces de rencontre et d'ateliers de
								développement personnel pour favoriser l'épanouissement
								individuel et renforcer la cohésion au sein des quartiers.
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
						{IMPACT_PHOTOS.map((photo) => (
							<div
								key={photo.url}
								className="group relative overflow-hidden rounded-2xl shadow-md h-72"
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
							</div>
						))}
					</div>
				</section>

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
					<a
						href="/missions"
						className="inline-block text-gray-800 font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
						style={{ backgroundColor: warningColor }}
					>
						Voir les Missions Actuelles
					</a>
				</section>

				{/* FOOTER STATS RAPIDES */}
				{/* <section className="bg-slate-900 py-24 px-6 text-white text-center">
					<div className="container mx-auto max-w-5xl">
						<h2 className="text-4xl font-black mb-16 italic">
							L'impact en chiffres
						</h2>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-12">
							{[
								{ icon: <Users />, label: "Membres", val: "500+" },
								{ icon: <Globe />, label: "Villes", val: "12" },
								{ icon: <Zap />, label: "Actions", val: "150+" },
								{ icon: <Heart />, label: "Sourires", val: "∞" },
							].map((stat, i) => (
								<div key={i} className="flex flex-col items-center">
									<div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-green-400">
										{stat.icon}
									</div>
									<div className="text-3xl font-black">{stat.val}</div>
									<div className="text-slate-500 text-xs font-bold uppercase mt-1 tracking-widest">
										{stat.label}
									</div>
								</div>
							))}
						</div>
					</div>
				</section> */}
			</div>
		</div>
	);
};

export default Impact;
