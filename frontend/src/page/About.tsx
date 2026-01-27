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
	Github,
	Linkedin,
	Code,
	Briefcase,
	Globe,
	Smartphone,
	CheckCircle2,
	Gift,
	Loader2,
	CreditCard,
} from "lucide-react";


type CheckoutFormProps = {
  amount: number;
  currency: string;
  onSuccess: () => void;
};

// --- Début SOUS-COMPOSANT : SYSTÈME DE DON  ---
const MockCardInput = () => (
  <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
    <div className="flex items-center space-x-3 text-gray-400">
      <CreditCard className="w-5 h-5" />
      <span>4242 4242 4242 4242</span>
    </div>
    <div className="text-gray-400 text-sm">MM/YY CVC</div>
  </div>
);


const CheckoutForm: React.FC<CheckoutFormProps> = ({
  amount,
  currency,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
        <MockCardInput />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-green-600 text-white font-bold rounded-xl flex items-center justify-center hover:bg-green-700 transition-all"
      >
        {loading ? <Loader2 className="animate-spin" /> : `Donner ${amount} ${currency}`}
      </button>
    </form>
  );
};


const DonationSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [method, setMethod] = useState("local");
  const [amount, setAmount] = useState(2000);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) {
    return (
      <div className="mx-auto max-w-3xl px_8 text-center py-12 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
        <h2 className="text-3xl font-black mb-4">Soutenez nos actions</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Votre contribution directe permet de financer nos projets d'éducation et d'accès à l'eau.</p>
				<button
  onClick={() => setIsOpen(true)}
  className="
    bg-green-600 text-white
    px-8 py-5
    rounded-3xl
    font-extrabold text-lg
    flex items-center gap-3 mx-auto
    hover:bg-green-700
    hover:scale-105
    active:scale-95
    transition-all duration-200
    shadow-lg shadow-green-300
    focus:outline-none focus:ring-4 focus:ring-green-300
  "
>
  <Gift size={22} />
  Faire un don maintenant
</button>

      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative overflow-hidden p-8 animate-in zoom-in duration-300">
        <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 transition-colors"><X /></button>
        
        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Merci pour votre don !</h2>
            <p className="text-slate-500 mb-6">Un reçu vous sera envoyé par email.</p>
            <button onClick={() => { setIsOpen(false); setIsSuccess(false); }} className="bg-slate-900 text-white px-6 py-2 rounded-lg">Fermer</button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-black">Finaliser mon don</h3>
              <div className="flex justify-center gap-4 mt-6">
                <button onClick={() => setMethod("local")} className={`flex-1 p-3 rounded-xl border-2 flex flex-col items-center gap-1 ${method === "local" ? "border-green-600 bg-green-50" : "border-slate-100"}`}>
                  <Smartphone size={20} /> <span className="text-[10px] font-bold uppercase">Mobile Money</span>
                </button>
                <button onClick={() => setMethod("intl")} className={`flex-1 p-3 rounded-xl border-2 flex flex-col items-center gap-1 ${method === "intl" ? "border-green-600 bg-green-50" : "border-slate-100"}`}>
                  <Globe size={20} /> <span className="text-[10px] font-bold uppercase">Carte Bancaire</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                {[1000, 2000, 5000, 10000].map(val => (
                  <button key={val} onClick={() => setAmount(val)} className={`py-2 text-xs font-bold rounded-lg ${amount === val ? "bg-green-600 text-white" : "bg-slate-50 text-slate-500"}`}>{val}</button>
                ))}
              </div>
              <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold" />
              
              {method === "local" ? (
                <button onClick={() => setIsSuccess(true)} className="w-full py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all">Payer par Wave / Orange Money</button>
              ) : (
                <CheckoutForm amount={amount} currency="EUR" onSuccess={() => setIsSuccess(true)} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// --- FIN SOUS-COMPOSANT : SYSTÈME DE DON (--- 


// Images des logos partenaires et hero
import logoBOA from "../assets/Logo-BOA.png";
import logoFondationSonatel from "../assets/logo-fondation-Sonatel.png";
import logoRecuplast from "../assets/logo-recuplast.png";
import logoSodefitex from "../assets/Logo_ODEFITEX-1.png";
import logoBicis from "../assets/Logo_Bicis-bnp.svg.png";
import parallaxBackground from "../assets/Child_smile_img1.png";
import LogoAmbassadeFranceSngl from "../assets/ambassade_de_france_senegal.jpg";
import logoForvisMazars from "../assets/forvis_mazars.jpg";
import logoAxaAToutCoeur from "../assets/axa_a_tout_coeur.jpg";
import logoFondationKebaMbaye from "../assets/fondation_keba_mbaye.jpg";
import logoIndustrieDesBDS from "../assets/indiustrie_des_bds.jpg";

// Images pour pr section président
import PresidentImage from "../assets/President.png";

// Images pour l'aperçu des bénévoles
import maimounaImage from "../assets/Maïmouna_pp.jpg";
import alyImage from "../assets/Profil.Aly.Mbegte.png";
import mariamaImage from "../assets/PortraitYams.jpg";
import daoudaImage from "../assets/daouda_image.jpg";
import xemessImage from "../assets/Xemess_Profil.jpg";
import elhadjiBadaraImage from "../assets/El_Hadji_Badara_poulon_pp.jpg";
import bambaImage from "../assets/Bamba_pp.jpg";
import mameAliouImage from "../assets/Mame_Aliou_pp.jpg";

type PillarCardProps = {
	icon: React.ComponentType<LucideProps>;
	title: string;
	desc: string;
	iconColor: string;
	bgColor: string;
	hoverBg: string;
};

interface PresidentModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const PARTNERS_INFINITE = [
	{ name: "BOA", logoUrl: logoBOA },
	{ name: "FondationSonatel", logoUrl: logoFondationSonatel },

	{
		name: "AXA",
		logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/94/AXA_Logo.svg",
	},
	{ name: "Bicis", logoUrl: logoBicis },
	{ name: "Recuplast", logoUrl: logoRecuplast },
	{
		name: "Ambassade de France au Sénégal",
		logoUrl: LogoAmbassadeFranceSngl,
	},
	{
		name: "Sodefitex",
		logoUrl: logoSodefitex,
	},
	{
		name: "ForvisMazars",
		logoUrl: logoForvisMazars,
	},
	{
		name: "axaAToutCoeur",
		logoUrl: logoAxaAToutCoeur,
	},
	{
		name: "FondationKebaMbaye",
		logoUrl: logoFondationKebaMbaye,
	},
	{
		name: "Ibs",
		logoUrl: logoIndustrieDesBDS,
	},
];
// 🔁 Liste doublée pour animation continue des partenaires
const LOOPED_PARTNERS = [...PARTNERS_INFINITE, ...PARTNERS_INFINITE];

const VOLUNTEERS = [
	{
		id: "maimouna-01",
		firstName: "Maïmouna",
		role: "Coordonnatrice Projets",
		quote: "L'éducation est l'arme la plus puissante pour changer le monde.",
		image: maimounaImage,
	},
	{
		id: "aly-02",
		firstName: "Aly alias Dr Mbëgté",
		role: "Chef de projet digital",
		quote: "Donner sans rien attendre en retour.",
		image: alyImage,
	},
	{
		id: "xemess-03",
		firstName: "Xemess",
		role: "Chef Logistique",
		quote:
			"Mon plus grand souhait est de consacrer ma vie à aider le plus grand nombre, en partageant mes compétences et mon énergie pour faire une différence, chaque jour.",
		image: xemessImage,
	},
	{
		id: "bamba-04",
		firstName: "Bamba",
		role: " volontaire",
		quote: "Action...",
		image: bambaImage,
	},
	{
		id: "dialy-05",
		firstName: "Dialy",
		role: "Responsable Santé",
		quote: "La santé est un droit fondamental pour chaque communauté.",
		// image Dialy à venir :,
	},
	{
		id: "daouda-06",
		firstName: "Daouda alias Tipsé",
		role: "Chef de projet ",
		quote: "Chaque sourire d'un enfant est une victoire pour notre patrie.",
		image: daoudaImage,
	},

	{
		id: "elhadji-badara-07",
		firstName: "El Hadji Badara Alias Poulon",
		role: "Maitre peintre & Formateur volontaire",
		quote: "Don de soi…",
		image: elhadjiBadaraImage,
	},
	{
		id: "mariama-08",
		firstName: "Mariama",
		role: "Développeuse & bénévole SAC",
		quote: "J’ai conçu et développé le site de SAC avec 💚",
		image: mariamaImage,
		since: "2021",
		isDeveloper: true, // Marqueur pour afficher le bouton 
	},
	{
		id: "mame-aliou-09",
		firstName: "Mame Aliou",
		role: "Chef cuisinier & Formateur volontaire",
		quote: "Passion…",
		image: mameAliouImage,
	},
];

const LOOPED_VOLUNTEERS = [...VOLUNTEERS, ...VOLUNTEERS];

const profilePro = {
	skills: [
		"React (TypeScript)",
		"Node.js",
		"MySQL",
		"Express",
		"Tailwind CSS",
		"Figma",
		"Git",
	],
	github: "https://github.com/YamsTheBee",
	linkedin: "https://linkedin.com",
};

const PresidentModal: React.FC<PresidentModalProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl">
			<div className="bg-white rounded-[3rem] shadow-2xl max-w-2xl w-full p-10 relative overflow-hidden animate-in fade-in zoom-in duration-300">
				<div className="absolute top-0 right-0 w-40 h-40 bg-green-50 rounded-full blur-3xl -mr-20 -mt-20" />
				<div className="flex justify-between items-center mb-8 relative z-10">
					<div>
						<h2 className="text-3xl font-black text-slate-900 leading-tight">
							M. Mamadou Diakhaté
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
						<strong>Enseignant de vocation</strong> et{" "}
						<strong>citoyen engagé</strong>, Mamadou Diakhaté (
						<strong>NIINTCHE</strong>) a fondé
						<strong> Simple Action Citoyenne (SAC)</strong> après avoir constaté
						les réalités poignantes des <strong>zones reculées</strong>.
					</p>

					<p>
						Son engagement est né du constat des difficultés rencontrées par les
						populations des zones reculées, notamment
						<strong> l’accès limité à l’eau potable</strong>.
					</p>

					<p>
						Très tôt confronté aux réalités du terrain, il fonde l’association
						<strong> Simple Action Citoyenne</strong> avec la volonté d’apporter
						des
						<strong> réponses concrètes et durables</strong> aux besoins
						essentiels des
						<strong> communautés locales</strong> à travers tout le
						<strong> Sénégal</strong>.
					</p>

					<p>
						Son engagement s’est traduit par des{" "}
						<strong>réalisations majeures</strong>, notamment la{" "}
						<strong>construction de puits et de forages</strong>, la
						<strong> création de salles de classe</strong> ainsi que la
						<strong> réhabilitation d’infrastructures scolaires</strong> dans
						plusieurs localités, dont <strong>Bakao</strong>,{" "}
						<strong>Fass Tiékène</strong> et d’autres{" "}
						<strong>zones rurales</strong>.
					</p>

					<p>
						À travers une démarche <strong>inclusive</strong> et
						<strong> participative</strong>, il a su mobiliser les
						<strong> communautés bénéficiaires</strong> ainsi que
						<strong> des centaines de volontaires</strong> autour d’un même
						idéal : améliorer durablement les <strong>conditions de vie</strong>
						, favoriser l’accès à <strong>l’éducation</strong> et à
						<strong> l’eau potable</strong>, et renforcer la
						<strong> résilience des territoires</strong>.
					</p>

					<p>
						Son action a également permis de créer des
						<strong> écosystèmes locaux productifs</strong>, en favorisant le
						<strong> maraîchage</strong> et <strong> l’élevage</strong>,
						contribuant ainsi au{" "}
						<strong>développement social et économique</strong> des communautés
						accompagnées.
					</p>

					<p>
						Aujourd’hui, sa vision s’élargit avec le projet
						<strong> Village L’Épopée</strong>, destiné à offrir à la jeunesse
						les
						<strong> clés de l’employabilité</strong> et du
						<strong> numérique</strong>, tout en restant fidèle à la devise qui
						guide son engagement :
						<strong> « Un jour de mission pour la patrie. »</strong>
					</p>
				</div>
			</div>
		</div>
	);
};

const AboutPage = () => {
	const [isPresidentModalOpen, setIsPresidentModalOpen] = useState(false);
	const [isMariamaModalOpen, setIsMariamaModalOpen] = useState(false);

	const [scrollProgress, setScrollProgress] = useState(0);
	const [itemsVisible, setItemsVisible] = useState(3);
	const [isPaused, setIsPaused] = useState(false);
	const [offset, setOffset] = useState(0);
	const [partnersOffset, setPartnersOffset] = useState(0);
	const PARTNERS_SPEED = 0.02; // ⏩ vitesse du scroll partenaires
	const SPEED = 0.02; // vitesse du scroll (ajustable)

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) setItemsVisible(1);
			else if (window.innerWidth < 1280) setItemsVisible(2);
			else setItemsVisible(3);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// 🔄 Défilement automatique fluide et infini
	useEffect(() => {
		if (isPaused) return;

		const interval = setInterval(() => {
			setOffset((prev) => {
				if (prev >= 100) return 0;
				return prev + SPEED;
			});
		}, 16); // ~60 FPS (fluide)

		return () => clearInterval(interval);
	}, [isPaused]);

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
	// 🔄 Défilement continu des partenaires

	useEffect(() => {
		const interval = setInterval(() => {
			setPartnersOffset((prev) => {
				if (prev >= 50) return 0;
				return prev + PARTNERS_SPEED;
			});
		}, 16); // ~60 FPS

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-900 pb-20 relative">
			{/* --- LIGNE DE DÉMARCATION ANIMÉE (SCROLL PROGRESS) --- */}
			<div className="fixed left-4 md:left-10 top-0 bottom-0 w-[2px] bg-slate-200 z-50 hidden md:block">
				<div
					className="w-full bg-[#28a745] transition-all duration-300 ease-out shadow-[0_0_15px_rgba(40,167,69,0.5)]"
					style={{ height: `${scrollProgress}%` }}
				/>
				{/* Point indicateur qui suit la ligne */}
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
						<span className="text-[#28a745] italic">
							{" "}
							Simple Action Citoyenne
						</span>
					</h1>
				</div>
			</header>

			<PresidentModal
				isOpen={isPresidentModalOpen}
				onClose={() => setIsPresidentModalOpen(false)}
			/>

			<main className="container mx-auto px-6 md:pl-24">
				{/* --- PARTENAIRES --- */}
				<div className="relative -mt-30 z-30 mb-70 section-fade">
					<div className="bg-white rounded-[3rem] shadow-xl p-12 border border-slate-100">
						<h2 className="text-center text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-10">
							Ils nous font confiance
						</h2>

						<div className="overflow-hidden relative py-6">
							{/* Fades gauche / droite */}
							<div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
							<div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

							<div
								className="flex items-center will-change-transform"
								style={{
									transform: `translateX(-${partnersOffset}%)`,
									width: `${LOOPED_PARTNERS.length * 20}%`,
								}}
							>
								{LOOPED_PARTNERS.map((p, idx) => (
									<div
										key={`${p.name}-${idx}`}
										className="flex items-center justify-center mx-12 h-32 flex-none"
										style={{ width: "200px" }}
									>
										<img
											src={p.logoUrl}
											alt={p.name}
											className="max-h-20 object-contain opacity-80 hover:opacity-100 transition-opacity"
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* --- SECTION PARALLAX  --- */}
				<section className="relative h-[500px] w-full overflow-hidden mb-32 rounded-[4rem] shadow-2xl section-fade">
					<div
						className="absolute inset-0 bg-no-repeat bg-center"
						style={{
							backgroundImage: `url(${parallaxBackground})`,
							backgroundSize: "80%", // dézoom
							backgroundAttachment: "fixed",
						}}
					/>

					<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 flex items-center justify-center">
						<div className="text-center text-white p-8">
							<Quote
								size={48}
								className="mx-auto mb-6 text-emerald-400 opacity-50"
							/>
							<h2 className="text-3xl md:text-xl font-bold italic leading-relaxed">
								"Construire pour l’avenir, creuser pour l’espoir, façonner des
								vies."
							</h2>
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
								Dit <strong> « NIINTCHE »</strong> est le fondateur de
								l’association <strong>Simple Action Citoyenne (SAC)</strong>, il
								s’engage depuis plusieurs années à susciter des changements
								significatifs au sein des communautés locales partout au
								Sénégal. À travers une démarche fondée sur{" "}
								<strong>l’action concrète et l’engagement citoyen</strong>, son
								engagement a permis d'améliorer les conditions de vie, notamment
								par l’accès à l’eau potable et à l’éducation. Avec le soutien
								des communautés bénéficiaires et de centaines de volontaires, il
								a contribué à la réalisation de nombreux projets structurants,
								favorisant un développement durable et inclusif.
							</p>

							<button
								type="button"
								onClick={() => setIsPresidentModalOpen(true)}
								className="group w-fit flex items-center gap-2 bg-slate-700 text-white px-10 py-6 rounded-3xl font-black hover:bg-[#28a745] transition-all duration-500"
							>
								Découvrir son parcours{" "}
								<ArrowRight className="group-hover:translate-x-2 transition-transform" />
							</button>
						</div>
					</div>
				</section>

				{/* --- GRID PILIERS --- */}
				<section className="mb-40">
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
							desc="Construction et rénovation d’écoles pour offrir un environnement scolaire sûr et adapté."
							iconColor="text-blue-600"
							bgColor="bg-blue-50"
							hoverBg="group-hover:bg-blue-600"
						/>
						<PillarCard
							icon={Droplets}
							title="Accès à l’eau"
							desc="Construction de puits et de forages pour garantir l’accès à l’eau potable."
							iconColor="text-sky-500"
							bgColor="bg-sky-50"
							hoverBg="group-hover:bg-sky-500"
						/>
						<PillarCard
							icon={Heart}
							title="Solidarité"
							desc="Un engagement citoyen et bénévole fondé sur la participation et le développement."
							iconColor="text-red-500"
							bgColor="bg-red-50"
							hoverBg="group-hover:bg-red-500"
						/>
						<PillarCard
							icon={Target}
							title="Impact"
							desc="Des actions concrètes mesurées par l’amélioration durable des conditions de vie."
							iconColor="text-emerald-600"
							bgColor="bg-emerald-50"
							hoverBg="group-hover:bg-emerald-600"
						/>
					</div>
				</section>

				{/* --- SECTION MISSION FINALE --- */}
				<section className="grid lg:grid-cols-2 gap-20 items-center mb-40 section-fade">
					<div>
						<h2 className="text-5xl font-black text-slate-900 mb-8">
							Notre mission pour la{" "}
							<span className="text-[#28a745]">patrie</span>
						</h2>
						<p
							className="text-lg text-slate-600 mb-10 leading-relaxed  text-justify 
              max-w-3xl"
						>
							Notre mission est de susciter des changements significatifs au
							sein des communautés locales, en plaçant le bien-être des
							personnes au centre de nos actions. Nous œuvrons pour qu’aucun
							enfant ne soit contraint d’étudier sous un abri de paille et
							qu’aucune femme n’ait à parcourir des kilomètres pour accéder à
							une eau non potable. À travers des initiatives concrètes et
							structurantes, notre objectif est d’améliorer durablement les
							conditions de vie en garantissant un accès à l’eau potable. La
							construction de puits, d’écoles, de daaras, de maternités et
							d’infrastructures sanitaires adaptées nous permet de lever les
							obstacles qui freinent le développement et l’épanouissement des
							communautés.
						</p>
					</div>
					<div className="bg-slate-900 rounded-[4rem] p-12 text-white relative overflow-hidden group">
						<Quote size={60} className="text-[#28a745] mb-8 opacity-30" />
						<p className="text-2xl font-bold leading-relaxed mb-8">
							"Un jour de plus, un jour de moins, un jour de mission pour la
							patrie 🇸🇳"
						</p>
						<div className="flex items-center gap-3 mb-10">
							<div className="w-10 h-[4px] bg-[#28a745]" />
							<span className="text-slate-400 text-xs font-bold uppercase">
								Devise SAC
							</span>
						</div>

						<div className="flex gap-10 opacity-80">
							<div>
								<p className="text-4xl font-black text-[#28a745]">50+</p>
								<p className="text-xs font-bold text-slate-400 uppercase">
									Écoles
								</p>
							</div>
							<div>
								<p className="text-4xl font-black text-[#28a745]">100+</p>
								<p className="text-xs font-bold text-slate-400 uppercase">
									Puits
								</p>
							</div>
							<div>
								<p className="text-4xl font-black text-[#28a745]">5000+</p>
								<p className="text-xs font-bold text-slate-400 uppercase">
									Kits Scolaires
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* SECTION  NOS BÉNÉVOLES ENGAGÉS  - 3 CARTES AVEC DÉFILEMENT continu */}
				<section
					className="mb-40 px-4 section-fade overflow-hidden"
					onMouseEnter={() => setIsPaused(true)}
					onMouseLeave={() => setIsPaused(false)}
				>
					<div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
						<div className="max-w-2xl">
							<div className="inline-flex items-center gap-2 text-[#28a745] font-black uppercase text-xs tracking-widest mb-4">
								<Star size={16} fill="currentColor" /> Le cœur de SAC
							</div>
							<h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
								Visages de <span className="text-[#28a745]">l'engagement</span>
							</h2>
						</div>
					</div>

					<div className="relative">
						<div
							className="flex will-change-transform"
							style={{
								transform: `translateX(-${offset}%)`,
								width: `${(LOOPED_VOLUNTEERS.length / itemsVisible) * 100}%`,
							}}
						>
							{LOOPED_VOLUNTEERS.map((volunteer, idx) => (
								<div
									key={`${volunteer.firstName}-${idx}`}
									style={{ width: `${100 / LOOPED_VOLUNTEERS.length}%` }}
									className="px-4 flex-none"
								>
									<div className="group bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 h-full flex flex-col items-center">
										<div className="relative w-48 h-60 mb-8 flex-none">
											<div className="absolute inset-0 bg-[#28a745]/10 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
											<img
												src={volunteer.image}
												alt={volunteer.firstName}
												className="absolute inset-0 w-full h-full object-cover rounded-3xl border-2 border-white shadow-md"
											/>
										</div>

										<h3 className="text-2xl font-black text-center text-slate-900 mb-1 group-hover:text-[#28a745] transition-colors">
											{volunteer.firstName}
										</h3>
										<p className="text-center text-[#28a745] font-bold text-xs uppercase tracking-widest mb-6">
											{volunteer.role}
										</p>
										{/* TODO <p className="text-gray-400 text-xs mb-4 text-center italic">
											Membre depuis {volunteer.since} en option 
										</p> */}
										{volunteer.since && (
											<p className="text-gray-400 text-xs mb-4 text-center italic">
												Membre depuis {volunteer.since}
											</p>
										)}

										<div className="relative ">
											<Quote
												size={20}
												className="absolute -top-4 -left-4 text-slate-100 "
											/>
											<p className="text-slate-500 italic text-center leading-relaxed relative z-10">
												"{volunteer.quote}"
											</p>

											{/* BOUTON PRO APPARAÎT UNIQUEMENT POUR MARIAMA */}
											{volunteer.isDeveloper && (
												<button
													type="button"
													onClick={() => setIsMariamaModalOpen(true)}
													className="w-full mt-auto flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 px-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-md text-sm"
												>
													<Briefcase size={16} />
													Collaboration & Contact Pro
												</button>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* MODAL PRO MARIAMA */}
					{isMariamaModalOpen && (
						<div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl">
							<div className="relative bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
								{/* HEADER */}
								<div className="flex justify-between items-center p-8 border-b">
									<div className="flex items-center gap-3">
										<div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
											<Code size={24} />
										</div>
										<div>
											<h2 className="text-xl font-bold text-gray-900">
												Parcours & Expertise Pro
											</h2>
											<p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
												Mariama — Développeuse Web Full-Stack
											</p>
										</div>
									</div>

									<button
										type="button"
										onClick={() => setIsMariamaModalOpen(false)}
										className="p-2 hover:bg-gray-100 rounded-full transition-colors"
									>
										<X size={24} className="text-gray-500" />
									</button>
								</div>

								{/* CONTENU */}
								<div className="p-8 md:p-10 overflow-y-auto max-h-[80vh]">
									<div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
										{/* COLONNE GAUCHE */}
										<div className="lg:col-span-3">
											<h4 className="text-lg font-bold mb-4 border-l-4 border-indigo-600 pl-3">
												Résumé de mon travail
											</h4>

											{/*  TEXTE GLOBAL INTÉGRÉ */}
											<div className="space-y-4 text-slate-600 text-sm leading-relaxed">
												<p>
													Développeuse web <strong>full-stack</strong>{" "}
													passionnée, je conçois et développe des applications
													web modernes, utiles et centrées sur l’humain, avec
													une attention particulière portée à l’
													<strong>UX/UI</strong>, à l’
													<strong>accessibilité</strong>
													et à l’<strong>impact social</strong>.
												</p>

												<p>
													Je travaille principalement avec{" "}
													<strong>React (TypeScript)</strong> côté front-end et{" "}
													<strong>Node.js / Express / MySQL</strong> côté
													back-end. Je mets en place des fonctionnalités
													complètes : CRUD, authentification, formulaires, APIs
													REST, gestion des utilisateurs et premières briques de
													sécurité (
													<strong>RGPD, cookies, bonnes pratiques</strong>).
												</p>

												<p>
													En parallèle, je développe plusieurs{" "}
													<strong> projets concrets </strong> (portfolio, site
													associatif, e-commerce, applications éducatives et
													solidaires), en suivant une méthodologie
													professionnelle :
												</p>

												<ul className="list-disc list-inside ml-2">
													<li>
														Conception (cahier des charges, wireframes, Figma)
													</li>
													<li>Développement structuré et maintenable</li>
													<li>Versioning Git / GitHub</li>
													<li>Attention portée à la qualité du code</li>
												</ul>

												<p>
													Je m’intéresse également à l’
													<strong>intelligence artificielle</strong> et à la
													<strong> cybersécurité</strong>, avec la volonté
													d’intégrer des outils IA de manière responsable pour
													améliorer la productivité et la sécurité des
													applications.
												</p>

												<p className="font-semibold text-slate-700">
													🎯 Mon objectif : créer des solutions web{" "}
													<strong>utiles, humaines et durables</strong>, en
													alliant technique, créativité et engagement.
												</p>
											</div>

											{/* SKILLS */}
											<div className="flex flex-wrap gap-2 mt-6">
												{profilePro.skills.map((skill) => (
													<span
														key={skill}
														className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold border border-indigo-100"
													>
														{skill}
													</span>
												))}
											</div>

											{/*  INVITATION À CONTACTER */}
											<div className="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-200">
												<p className="text-sm text-slate-700 font-medium">
													🤝{" "}
													<strong>Envie d’échanger ou de collaborer ?</strong>
												</p>
												<p className="text-xs text-slate-600 mt-2">
													Je suis ouverte aux échanges avec des{" "}
													<strong>professionnels</strong>,
													<strong> associations</strong> et{" "}
													<strong>porteurs de projets </strong>
													souhaitant créer des solutions web utiles, humaines et
													durables. Chaque projet commence par une discussion.
												</p>
											</div>
										</div>

										{/* COLONNE DROITE */}
										<div className="lg:col-span-2 space-y-6">
											<div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
												<h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
													Présence digitale
												</h4>
												<div className="flex flex-col gap-3">
													<a
														href={profilePro.github}
														target="_blank"
														rel="noreferrer"
														className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 hover:border-indigo-500 transition-all group"
													>
														<Github
															size={20}
															className="text-gray-700 group-hover:text-indigo-600"
														/>
														<span className="font-medium text-sm">
															GitHub – Projets & Code
														</span>
													</a>

													<a
														href={profilePro.linkedin}
														target="_blank"
														rel="noreferrer"
														className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 hover:border-blue-500 transition-all group"
													>
														<Linkedin
															size={20}
															className="text-gray-700 group-hover:text-blue-600"
														/>

														<span className="font-medium text-sm">
															LinkedIn
														</span>
													</a>
												</div>
											</div>

											{/* CTA FINAL */}
											<button
												type="button"
												className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-colors"
											>
												<Briefcase size={18} />
												Discutons de votre projet
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</section>

      

    {/* --- LE SYSTÈME DE DON INTÉGRÉ ICI --- */}
        <section className="mb-40">
	   <DonationSystem />
        </section>
			</main>
		</div>
	);
};

const PillarCard: React.FC<PillarCardProps> = ({
	icon: Icon,
	title,
	desc,
	iconColor,
	bgColor,
	hoverBg,
}) => (
	<div className="bg-white p-10 rounded-[3rem] border border-slate-100 hover:border-slate-200 transition-all duration-500 hover:shadow-2xl group flex flex-col items-start h-full">
		<div
			className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center ${iconColor} mb-8 ${hoverBg} group-hover:text-white transition-all duration-500`}
		>
			<Icon size={32} />
		</div>
		<h3 className="text-2xl font-black text-slate-900 mb-4">{title}</h3>
		<p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
	</div>
);
export default AboutPage;
