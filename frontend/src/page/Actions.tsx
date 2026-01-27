import { useState, useEffect } from "react";
import {
	Calendar,
	Heart,
	MapPin,
	Sparkles,
	X,
	BookOpen,
	Droplets,
	Users,
	Leaf,
	Plus,
	ArrowLeft,
	CreditCard,
	Loader2,
	CheckCircle2,
	Smartphone,
	Globe,
	Gift,
} from "lucide-react";



type CheckoutFormProps = {
  amount: number;
  currency: string;
  onSuccess: () => void;
};

// --- Début SOUS-COMPOSANT : SYSTÈME DE DON (Intégré pour éviter les erreurs d'import) ---

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


// --- FIN SOUS-COMPOSANT : SYSTÈME DE DON (Intégré pour éviter les erreurs d'import) --- 



// --- TYPES & INTERFACES ---
interface Project {
	id: string;
	title: string;
	category: string;
	icon: JSX.Element;
	description: string;
	fullDescription: string;
	image: string;
	gallery: string[];
	location: string;
	date: string;
	isCoupDeCoeur: boolean;
}

interface ProjectModalProps {
	project: Project;
	onClose: () => void;
}

// --- CONFIGURATION DES DONNÉES ---
const CATEGORIES = [
	"Toutes",
	"Éducation",
	"Solidarité",
	"Social",
	"Santé",
	"Écologie",
];

const IMPACT_GALLERY: Project[] = [
	{
		id: "1",
		title: "Village l'Épopée",
		category: "Social",
		icon: <Users size={20} />,
		description:
			"Espace d'innovation sociale dédiée à la formation et au mentorat des jeunes au Sénégal.",
		fullDescription:
			"Le Village l'Épopée est un écosystème éducatif majeur. Il répond aux attentes d'une jeunesse en quête d'opportunités en proposant des programmes de formation digitale, de robotique et de leadership citoyen. C'est un levier de transformation qui favorise l'insertion professionnelle et l'entreprenariat.",
		image:
			"https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000",
		gallery: [
			"https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1000",
			"https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000",
		],
		location: "Dakar, Sénégal",
		date: "Projet Phare",
		isCoupDeCoeur: true,
	},
	{
		id: "2",
		title: "Zéro Abri Provisoire",
		category: "Éducation",
		icon: <BookOpen size={20} />,
		description:
			"Remplacement des abris précaires par des salles de classe aux normes internationales.",
		fullDescription:
			"En collaboration avec des partenaires stratégiques comme la BOA, ce projet éradique la précarité scolaire. Nous construisons des salles de classe en dur, des Daaras modernes et des blocs sanitaires pour offrir aux enfants un environnement d'apprentissage digne et sécurisé.",
		image:
			"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000",
		gallery: [
			"https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000",
			"https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000",
		],
		location: "Sénégal (National)",
		date: "En cours",
		isCoupDeCoeur: false,
	},
	{
		id: "3",
		title: "Je veux aller à l'école",
		category: "Éducation",
		icon: <BookOpen size={20} />,
		description:
			"Distribution de plus de 5000 kits scolaires et prise en charge intégrale de la scolarité.",
		fullDescription:
			"Pour l'édition 2025, nous ciblons les classes de CI dans les régions reculées (Podor, Bignona, Bakel, Kolda). L'engagement est total : un suivi sur 6 ans pour garantir que chaque enfant termine son cycle primaire sans obstacle financier.",
		image:
			"https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800",
		gallery: [
			"https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=1000",
		],
		location: "Zones Rurales",
		date: "Rentrée Scolaire",
		isCoupDeCoeur: true,
	},
	{
		id: "4",
		title: "Oasis Njarin",
		category: "Écologie",
		icon: <Leaf size={20} />,
		description:
			"Reverdissement et autonomie alimentaire via le maraîchage et l'élevage moderne.",
		fullDescription:
			"Soutenu par la Fondation Sonatel, Oasis Njarin transforme les localités en zones productives. Par la maîtrise de l'eau et la formation aux techniques agricoles, nous créons des écosystèmes qui nourrissent et emploient les populations locales.",
		image:
			"https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000",
		gallery: [
			"https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1000",
		],
		location: "Territoire National",
		date: "Déploiement 2024",
		isCoupDeCoeur: false,
	},
	{
		id: "5",
		title: "Forage & Eau Potable",
		category: "Santé",
		icon: <Droplets size={20} />,
		description:
			"Accès à l'eau potable pour réduire les maladies et le décrochage scolaire des filles.",
		fullDescription:
			"Depuis 2023, SAC a réalisé plus de 100 points d'eau (puits et forages). L'accès à l'eau propre transforme la vie des femmes en réduisant la pénibilité des tâches et permet aux jeunes filles de rester scolarisées plutôt que de chercher de l'eau.",
		image:
			"https://images.unsplash.com/photo-1538300342682-cf57afb97285?q=80&w=1000",
		gallery: [
			"https://images.unsplash.com/photo-1541252260730-0412e3e2108e?q=80&w=1000",
		],
		location: "Nord & Thiès",
		date: "Impact Permanent",
		isCoupDeCoeur: false,
	},
	{
		id: "6",
		title: "Solidarité Niintche",
		category: "Solidarité",
		icon: <Heart size={20} />,
		description:
			"Cagnottes sociales et distribution d'urgence pour les familles les plus vulnérables.",
		fullDescription:
			"La Solidarité Niintche est le cœur battant de l'association. Par le biais du crowdfunding citoyen, nous finançons des opérations chirurgicales, distribuons des repas et accompagnons les familles en situation d'extrême précarité.",
		image:
			"https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000",
		gallery: [],
		location: "Sénégal",
		date: "Quotidien",
		isCoupDeCoeur: false,
	},
];

const Actions = () => {
	const [activeFilter, setActiveFilter] = useState("Toutes");
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [scrollProgress, setScrollProgress] = useState(0);
	const [currentImgIndex, setCurrentImgIndex] = useState(0);

	// Gestion du scroll pour la barre latérale
	useEffect(() => {
		const handleScroll = () => {
			const totalHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			if (totalHeight > 0) {
				setScrollProgress((window.scrollY / totalHeight) * 100);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const filteredActions =
		activeFilter === "Toutes"
			? IMPACT_GALLERY
			: IMPACT_GALLERY.filter((a) => a.category === activeFilter);

	// --- COMPOSANT MODALE ---
	const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
		if (!project) return null;
		const allImages = [project.image, ...project.gallery];

		return (
			<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
				<button
					type="button"
					onClick={onClose}
					aria-label="Fermer la modale"
					className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl cursor-default"
				/>

				<div className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
					{/* Bouton Fermer */}
					<button
						type="button"
						onClick={onClose}
						className="absolute top-6 right-6 z-50 p-3 bg-white/20 hover:bg-red-500 backdrop-blur-md rounded-full text-white transition-all shadow-lg"
					>
						<X size={24} />
					</button>

					{/* Galerie d'images (Gauche) */}
					<div className="w-full md:w-1/2 h-72 md:h-auto relative bg-slate-900 overflow-hidden">
						<img
							src={allImages[currentImgIndex]}
							alt={project.title}
							className="w-full h-full object-cover animate-in fade-in duration-700"
						/>

						{/* Navigation Galerie */}
						{allImages.length > 1 && (
							<div className="absolute inset-x-0 bottom-8 flex justify-center gap-2">
								{allImages.map((img, i) => (
									<button
										key={img} // clé stable
										type="button"
										onClick={() => setCurrentImgIndex(i)}
										className={`h-2 rounded-full transition-all ${
											i === currentImgIndex
												? "bg-[#28a745] w-10"
												: "bg-white/40 w-4 hover:bg-white/60"
										}`}
									/>
								))}
							</div>
						)}

						<div className="absolute top-8 left-8">
							<span className="px-5 py-2 bg-[#28a745] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl">
								{project.category}
							</span>
						</div>
					</div>

					{/* Détails du Projet (Droite) */}
					<div className="w-full md:w-1/2 p-10 md:p-16 overflow-y-auto flex flex-col bg-white">
						<div className="flex items-center gap-3 text-[#28a745] mb-6">
							<div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center shadow-inner">
								{project.icon}
							</div>
							<span className="font-black tracking-[0.2em] text-[10px] uppercase text-slate-400">
								Mission Officielle
							</span>
						</div>

						<h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-[1.1]">
							{project.title}
						</h2>

						<div className="space-y-6">
							<p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
								{project.fullDescription}
							</p>
						</div>

						{/* Metadata */}
						<div className="grid grid-cols-2 gap-8 pt-10 border-t border-slate-100 mt-12">
							<div className="space-y-2">
								<span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
									Localisation
								</span>
								<div className="flex items-center gap-3 text-slate-900 font-bold">
									<div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#28a745]">
										<MapPin size={16} />
									</div>
									{project.location}
								</div>
							</div>
							<div className="space-y-2">
								<span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
									Temporalité
								</span>
								<div className="flex items-center gap-3 text-slate-900 font-bold">
									<div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#28a745]">
										<Calendar size={16} />
									</div>
									{project.date}
								</div>
							</div>
						</div>

						<button
							type="button"
							onClick={onClose}
							className="mt-12 w-full py-6 bg-slate-900 text-white font-black rounded-2xl hover:bg-[#28a745] transition-all flex items-center justify-center gap-4 group shadow-xl shadow-slate-900/10 hover:shadow-green-500/20"
						>
							RETOUR AUX ACTIONS
							<ArrowLeft
								size={20}
								className="group-hover:-translate-x-1 transition-transform"
							/>
						</button>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-900 pb-20 relative selection:bg-green-100">
			{/* Barre de progression verticale */}
			<div className="fixed left-4 md:left-10 top-0 bottom-0 w-[2px] bg-slate-200 z-50 hidden md:block">
				<div
					className="w-full bg-[#28a745] transition-all duration-300 ease-out shadow-[0_0_15px_rgba(40,167,69,0.5)]"
					style={{ height: `${scrollProgress}%` }}
				/>
				<div
					className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#28a745] border-4 border-white rounded-full shadow-lg transition-all duration-300"
					style={{ top: `${scrollProgress}%` }}
				/>
			</div>

			{/* Hero Header */}
			<header className="relative bg-slate-900 text-white py-32 px-6 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-[#28a745]/10" />
				<div className="container mx-auto relative z-10 text-center">
					<div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-10 animate-pulse">
						<Sparkles size={18} className="text-[#28a745]" />
						<span className="text-[10px] font-black tracking-[0.3em] uppercase">
							Impact Citoyen 2025
						</span>
					</div>
					<h1 className="text-6xl md:text-[8rem] font-black tracking-tighter mb-8 leading-none">
						NOS <span className="text-[#28a745] italic">ACTIONS</span>
					</h1>
					<p className="max-w-3xl mx-auto text-l md:text-1xl text-slate-300 font-medium leading-relaxed">
						Chaque geste compte. Explorez les projets de{" "}
						<span className="text-white font-bold underline decoration-[#28a745] underline-offset-[12px]">
							Simple Action Citoyen
						</span>{" "}
						à travers le Sénégal.
					</p>
				</div>
			</header>

			{/* Navigation Filtres */}
			<div className="sticky top-0 z-40 bg-white/80 backdrop-blur-2xl border-b border-slate-100 py-8">
				<div className="container mx-auto px-6 flex flex-wrap justify-center gap-4">
					{CATEGORIES.map((cat) => (
						<button
							key={cat}
							type="button"
							onClick={() => setActiveFilter(cat)}
							className={`px-10 py-4 rounded-2xl text-xs font-black tracking-widest uppercase transition-all duration-500 ${
								activeFilter === cat
									? "bg-[#28a745] text-white shadow-2xl shadow-green-500/40 scale-110"
									: "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
							}`}
						>
							{cat}
						</button>
					))}
				</div>
			</div>

			{/* Grille des projets */}
			<main className="container mx-auto px-6 py-24">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
					{filteredActions.map((action, idx) => (
						<div
							key={action.id}
							className="group bg-white rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all duration-700 border border-slate-50 overflow-hidden flex flex-col hover:-translate-y-5"
							style={{ animationDelay: `${idx * 100}ms` }}
						>
							{/* Image Card */}
							<div className="relative h-80 overflow-hidden bg-slate-100">
								<img
									src={action.image}
									alt={action.title}
									className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
								/>
								<div className="absolute top-8 left-8 flex items-center gap-3 px-5 py-2.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl">
									<span className="text-[#28a745]">{action.icon}</span>
									<span className="text-[10px] font-black uppercase tracking-widest text-slate-800">
										{action.category}
									</span>
								</div>
								{action.isCoupDeCoeur && (
									<div className="absolute top-8 right-8 bg-red-500 text-white p-3.5 rounded-2xl shadow-xl animate-bounce">
										<Heart className="w-4 h-4 fill-white" />
									</div>
								)}
							</div>

							{/* Contenu Card */}
							<div className="p-6 flex flex-col flex-1">
								<h2 className="text-3xl font-black text-slate-900 leading-tight mb-6 group-hover:text-[#28a745] transition-colors">
									{action.title}
								</h2>
								<p className="text-slate-500 font-medium leading-relaxed mb-6text-lg line-clamp-3">
									{action.description}
								</p>

								<div className="mt-auto">
									<div className="flex items-center justify-between text-[11px] font-black uppercase text-slate-400 border-t border-slate-50 pt-8 mb-8">
										<div className="flex items-center gap-2">
											<MapPin size={14} className="text-[#28a745]" />{" "}
											{action.location}
										</div>
										<div className="flex items-center gap-2">
											<Calendar size={14} className="text-[#28a745]" />{" "}
											{action.date}
										</div>
									</div>

									<button
										type="button"
										onClick={() => {
											setSelectedProject(action);
											setCurrentImgIndex(0);
										}}
										className="flex items-center justify-center w-full bg-slate-900 group-hover:bg-[#28a745] text-white font-black py-4 px- rounded-[2rem] shadow-2xl transition-all duration-500 group-active:scale-95"
									>
										DÉCOUVRIR LE PROJET
										<Plus className="ml-3 w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				   {/* --- LE SYSTÈME DE DON INTÉGRÉ ICI --- */}
        <section className="mb-40">
           <DonationSystem />
        </section>

			</main>

			{/* Rendu de la Modale */}
			{selectedProject && (
				<ProjectModal
					project={selectedProject}
					onClose={() => setSelectedProject(null)}
				/>
			)}
		</div>
	);
};

export default Actions;


