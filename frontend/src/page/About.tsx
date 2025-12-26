import type React from "react";
import { useState, useEffect } from "react";
import {
	BookOpen,
	Target,
	Heart,
	X,
	Sparkles,
	ArrowRight,
	Quote,
	Award,
	Droplets,
	Star,
	type LucideProps,
} from "lucide-react";

// Images de remplacement pour l'aperçu des logos partenaires, pr et hero
import logoBOA from "../assets/Logo-BOA.png";
import logoFondationSonatel from "../assets/logo-fondation-Sonatel.png";
import logoRecuplast from "../assets/logo-recuplast.png";
import PresidentImage from "../assets/President.png";
import parallaxBackground from "../assets/Child_smile_img1.png";

import maimounaImage from "../assets/Maïmouna_pp.jpg";
import alyImage from "../assets/Profil.Aly.Mbegte.png";
import mariamaImage from "../assets/PortraitYams.jpg";
import oumarImage from "../assets/Pic1.Aly.Mbegte.jpg";

type PillarCardProps = {
	icon: React.ComponentType<LucideProps>; // <- corrigé
	title: string;
	desc: string;
};

interface PresidentModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const PARTNERS_INFINITE = [
	{ name: "BOA", logoUrl: logoBOA },
	{ name: "FondationSonatel", logoUrl: logoFondationSonatel },
	{ name: "Recuplast", logoUrl: logoRecuplast },
	{ name: "Partenaire 4", logoUrl: logoBOA },
	{ name: "Partenaire 5", logoUrl: logoFondationSonatel },
	{ name: "Partenaire 6", logoUrl: logoRecuplast },
	{ name: "BOA", logoUrl: logoBOA },
	{ name: "FondationSonatel", logoUrl: logoFondationSonatel },
	{ name: "Recuplast", logoUrl: logoRecuplast },
];

const VOLUNTEERS = [
	{
		firstName: "Maïmouna",
		role: "Coordonnatrice Projets",
		quote: "L'éducation est l'arme la plus puissante pour changer le monde.",
		image: maimounaImage,
	},
	{
		firstName: "Aly alias Dr Mbëgté",
		role: "Responsable Logistique & Forages",
		quote: "Donner de l'eau, c'est offrir la vie et la dignité aux villages.",
		image: alyImage,
	},
	{
		firstName: "Mariama",
		role: "Lead-Dev et membre de SAC",
		quote: "SAC est plus qu'un projet pour moi....",
		image: mariamaImage,
	},
	{
		firstName: "Daouda",
		role: "Bénévole Terrain & Médiateur",
		quote: "Chaque sourire d'un enfant est une victoire pour notre patrie.",
		image: oumarImage,
	},
];

const PresidentModal: React.FC<PresidentModalProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl">
			<div className="bg-white rounded-[3rem] shadow-2xl max-w-2xl w-full p-10 relative overflow-hidden animate-in fade-in zoom-in duration-300">
				<div className="absolute top-0 right-0 w-40 h-40 bg-green-50 rounded-full blur-3xl -mr-20 -mt-20" />
				<div className="flex justify-between items-center mb-8 relative z-10">
					<div>
						<h2 className="text-3xl font-black text-slate-900 leading-tight">
							M. Mamadou DIAKHATE
						</h2>
						<p className="text-[#28a745] font-bold uppercase tracking-widest text-sm">
							Le mot du fondateur
						</p>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="p-3 rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all"
					>
						<X size={24} />
					</button>
				</div>
				<div className="text-slate-600 space-y-5 relative z-10 leading-relaxed text-lg italic">
					<p>
						"Fondateur et président de Simple Action Citoyenne, M. Mamadou
						DIAKHATE est un enseignant sénégalais animé par une conviction
						profonde."
					</p>
					<p>
						"Son engagement est né du constat des difficultés rencontrées par
						les populations des zones reculées, notamment l'accès limité à l'eau
						potable."
					</p>
				</div>
			</div>
		</div>
	);
};

const AboutPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);

	// Calcul de la progression du scroll pour l'animation du trait
	useEffect(() => {
		const handleScroll = () => {
			const totalHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const progress = (window.scrollY / totalHeight) * 100;
			setScrollProgress(progress);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-900 pb-20 relative">
			{/* --- LIGNE DE DÉMARCATION ANIMÉE (SCROLL PROGRESS) --- */}
			<div className="fixed left-4 md:left-10 top-0 bottom-0 w-[2px] bg-slate-200 z-50 hidden md:block">
				<div
					className="w-full bg-[#28a745] transition-all duration-300 ease-out shadow-[0_0_15px_rgba(40,167,69,0.5)]"
					style={{ height: `${scrollProgress}%` }}
				/>
				{/* Petit point indicateur qui suit la ligne */}
				<div
					className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#28a745] border-4 border-white rounded-full shadow-lg transition-all duration-300"
					style={{ top: `${scrollProgress}%` }}
				/>
			</div>

			{/* --- HEADER --- */}
			<header className="relative bg-slate-900 text-white py-50 px-6 overflow-hidden">
				<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
				<div className="container mx-auto relative z-10 text-center">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8">
						<Sparkles size={16} className="text-green-400" />
						<span className="text-xs font-bold tracking-[0.2em] uppercase">
							Qui sommes-nous ?
						</span>
					</div>
					<h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
						À propos de <br />
						<span className="text-[#28a745]"> Simple Action Citoyenne</span>
					</h1>
				</div>
			</header>

			<PresidentModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>

			<main className="container mx-auto px-6 md:pl-24">
				{/* --- PARTENAIRES --- */}
				<div className="relative -mt-30 z-30 mb-70 section-fade">
					<div className="bg-white rounded-[3rem] shadow-xl p-12 border border-slate-100">
						<h2 className="text-center text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-10">
							Ils nous font confiance
						</h2>
						<div className="overflow-hidden whitespace-nowrap relative py-6">
							<div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
							<div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
							<div className="inline-block animate-scroll-infinite">
								{PARTNERS_INFINITE.map((p) => (
									<div
										key={`${p.name}-${p.logoUrl}`} // clé unique et stable
										className="inline-flex items-center justify-center mx-12 h-32"
									>
										<img
											src={p.logoUrl}
											alt={p.name}
											className="max-h-20 object-contain"
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* --- SECTION PARALLAX --- */}
				<section className="relative h-[500px] w-full overflow-hidden mb-32 rounded-[4rem] shadow-2xl section-fade">
					<div
						className="absolute inset-0 bg-cover bg-center bg-no-repeat"
						style={{
							backgroundImage: `url(${parallaxBackground})`,
							backgroundSize: "con",
							backgroundAttachment: "fixed",
						}}
					>
						<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 flex items-center justify-center">
							<div className="text-center text-white p-8">
								<h1 className="text-2xl light-black italic">
									"Partagez un sourire, soutenez l'espoir"
								</h1>
							</div>
						</div>
					</div>
				</section>

				{/* --- SECTION PRÉSIDENT --- */}
				<section className="mb-40 relative section-fade">
					<div className="absolute inset-0 bg-green-50/50 rounded-[5rem] -rotate-1 scale-105 -z-10" />
					<div className="flex flex-col lg:flex-row items-stretch bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-white">
						<div className="lg:w-2/5 relative min-h-[400px] flex items-center justify-center p-10 bg-slate-50">
							<div className="relative w-full max-w-[80%] h-fit">
								<img
									src={PresidentImage}
									alt="Mamadou Diakhate"
									className="w-full h-auto object-contain rounded-lg shadow-lg"
								/>
								<div className="absolute bottom-6 left-6 right-6">
									<div className="bg-white/10 backdrop-blur-xl p-3 rounded-xl border border-white/20 flex items-center gap-3">
										<Award size={20} className="text-[#28a745]" />
										<p className="text-white font-bold text-sm">
											Fondateur SAC
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="lg:w-3/5 p-12 md:p-20 flex flex-col justify-center">
							<h3 className="text-4xl font-black text-slate-900 mb-6">
								M. Mamadou <span className="text-[#28a745]">DIAKHATE</span>
							</h3>
							<p className="text-lg text-slate-600 mb-8 leading-relaxed">
								Enseignant de profession et fondateur de l'association{" "}
								<strong>Simple Action Citoyenne (SAC)</strong>, Mamadou, alias
								Junior (@Niintche), consacre sa vie à servir les communautés
								rurales et à lutter contre les inégalités. Grâce à une approche
								axée sur <strong>l'action concrète</strong>, il transforme
								durablement les villages les plus isolés du Sénégal.{" "}
								<strong>Avec son équipe</strong>, ils relèvent sans relâche de
								nouveaux défis pour susciter des changements significatifs,
								portés par une générosité sans faille et une détermination
								inébranlable.{" "}
								<strong>#TeamNiintche #Deurkiss #CommunityService</strong>
							</p>

							<button
								type="button"
								onClick={() => setIsModalOpen(true)}
								className="group w-fit flex items-center gap-2 bg-slate-700 text-white px-10 py-6 rounded-3xl font-black hover:bg-[#28a745] transition-all duration-500"
							>
								Découvrir son parcours{" "}
								<ArrowRight className="group-hover:translate-x-2 transition-transform" />
							</button>
						</div>
					</div>
				</section>

				{/* --- GRID PILIERS --- */}
				<section className="mb-40 section-fade">
					<div className="text-center mb-20">
						<h2 className="text-5xl font-black text-slate-900 tracking-tight">
							Nos piliers d'action
						</h2>
						<div className="w-24 h-2 bg-[#28a745] mx-auto mt-6 rounded-full" />
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						<PillarCard
							icon={BookOpen}
							title="Éducation"
							desc="Remplacer les abris provisoires par des écoles en dur."
						/>
						<PillarCard
							icon={Droplets}
							title="Eau Potable"
							desc="Forer des puits pour offrir la vie aux zones reculées."
						/>
						<PillarCard
							icon={Target}
							title="Impact"
							desc="Mesurer chaque action par le sourire des bénéficiaires."
						/>
						<PillarCard
							icon={Heart}
							title="Solidarité"
							desc="Un engagement bénévole total pour le développement."
						/>
					</div>
				</section>

				{/* --- NOS BÉNÉVOLES ENGAGÉS --- */}
				<section className="mb-40 px-4 section-fade">
					<div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
						<div className="max-w-2xl">
							<div className="inline-flex items-center gap-2 text-[#28a745] font-black uppercase text-xs tracking-widest mb-4">
								<Star size={16} fill="currentColor" /> Le cœur de SAC
							</div>
							<h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
								Visages de <span className="text-[#28a745]">l'engagement</span>
							</h2>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{VOLUNTEERS.map((volunteer) => (
							<div
								key={`${volunteer.firstName}-${volunteer.role}`} // Clé combinée
								className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-4"
							>
								<div className="relative w-48 h-60 mb-6 mx-auto">
									<div className="absolute inset-0 bg-[#28a745]/10 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform" />
									{/* Utilise object-cover ou object-contain pour éviter la déformation */}
									<img
										src={volunteer.image}
										alt={volunteer.firstName}
										className="absolute inset-0 w-full h-full object-contain rounded-3xl border-2 border-white"
									/>
								</div>
								<h3 className="text-xl font-black text-center text-slate-900 mb-1 group-hover:text-[#28a745]">
									{volunteer.firstName}
								</h3>
								<p className="text-center text-[#28a745] font-bold text-[10px] uppercase mb-4">
									{volunteer.role}
								</p>
								<p className="text-slate-500 italic text-sm text-center leading-relaxed">
									"{volunteer.quote}"
								</p>
							</div>
						))}
					</div>
				</section>

				{/* --- SECTION MISSION FINALE --- */}
				<section className="grid lg:grid-cols-2 gap-20 items-center mb-40 section-fade">
					<div>
						<h2 className="text-5xl font-black text-slate-900 mb-8">
							Notre mission pour la{" "}
							<span className="text-[#28a745]">patrie</span>
						</h2>
						<p className="text-lg text-slate-600 mb-10 leading-relaxed">
							Nous ne changeons pas le monde d'un coup, mais un village à la
							fois. Chaque puits, chaque école est une pierre à l'édifice d'un
							Sénégal plus juste.
						</p>
						<div className="flex gap-10">
							<div>
								<p className="text-4xl font-black text-[#28a745]">15+</p>
								<p className="text-xs font-bold text-slate-400 uppercase">
									Puits
								</p>
							</div>
							<div>
								<p className="text-4xl font-black text-[#28a745]">2.5k</p>
								<p className="text-xs font-bold text-slate-400 uppercase">
									Élèves
								</p>
							</div>
						</div>
					</div>
					<div className="bg-slate-900 rounded-[4rem] p-12 text-white relative overflow-hidden group">
						<Quote size={60} className="text-[#28a745] mb-8 opacity-20" />
						<p className="text-2xl font-bold leading-relaxed mb-8">
							"Un jour de plus, un jour de moins, un jour de mission pour la
							patrie 🇸🇳"
						</p>
						<div className="flex items-center gap-3">
							<div className="w-10 h-[2px] bg-[#28a745]" />
							<span className="text-slate-400 text-xs font-bold uppercase">
								Devise SAC
							</span>
						</div>
					</div>
				</section>
			</main>

			<style>{`
        @keyframes scroll-infinite {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll-infinite {
          animation: scroll-infinite 40s linear infinite;
        }

        /* Animation d'apparition des sections au scroll */
        .section-fade {
          opacity: 1;
          transition: all 0.8s ease-out;
        }

        @media (max-width: 768px) {
           main { padding-left: 1.5rem !important; }
        }
      `}</style>
		</div>
	);
};

const PillarCard: React.FC<PillarCardProps> = ({ icon: Icon, title, desc }) => (
	<div className="bg-white p-10 rounded-[3rem] border border-slate-100 hover:border-[#28a745] transition-all duration-500 hover:shadow-2xl group">
		<div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-[#28a745] mb-8 group-hover:bg-[#28a745] group-hover:text-white transition-all duration-500">
			<Icon size={32} /> {/* JSX direct */}
		</div>
		<h3 className="text-2xl font-black text-slate-900 mb-4">{title}</h3>
		<p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
	</div>
);
export default AboutPage;
