import { Calendar, MapPin, Heart, ArrowRight, Sparkles } from "lucide-react";
import type { FC } from "react";

// Je simule les données pour l'aperçu, à remplacer par vos imports réels

const mockActions = [
	{
		id: "1",
		title: "Épopée",
		description:
			"Collecte de déchets et sensibilisation écologique massive en centre-ville et sur les zones côtières pour préserver notre biodiversité.",
		image:
			"https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000",
		location: "Dakar et ses côtes",
		date: "Toute l'année",
		isCoupDeCoeur: true,
	},
	{
		id: "2",
		title: "Inclusion Numérique",
		description:
			"Ateliers d'accompagnement pour les seniors afin de briser l'isolement social grâce aux outils digitaux.",
		image:
			"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000",
		location: "Centre Communautaire",
		date: "15 Octobre 2025",
		isCoupDeCoeur: false,
	},
	{
		id: "3",
		title: "Potagers Solidaires",
		description:
			"Création de jardins partagés en zone urbaine pour favoriser l'autonomie alimentaire et le lien social.",
		image:
			"https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000",
		location: "Quartier Plateau",
		date: "01 Novembre 2025",
		isCoupDeCoeur: false,
	},
];

const Actions: FC = () => {
	return (
		<div className="min-h-screen bg-[#f8fafc] pb-24 font-sans text-slate-900">
			{/* HEADER  MODERNE */}
			<header className="relative bg-slate-900 text-white py-24 px-6 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-green-900/40 opacity-50" />
				<div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] -mr-48 -mt-48" />

				<div className="container mx-auto relative z-10 text-center">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
						<Sparkles size={16} className="text-green-400" />
						<span className="text-sm font-bold tracking-widest uppercase">
							Engagement Citoyen
						</span>
					</div>
					<h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
						Nos Actions <span className="text-[#28a745]">Impactantes</span>
					</h1>
					<p className="max-w-2xl mx-auto text-xl text-slate-300 font-medium leading-relaxed">
						Parcourez nos initiatives locales et rejoignez le mouvement pour
						transformer durablement notre société.
					</p>
				</div>
			</header>

			{/* FILTRES OU INFO (Optionnel mais moderne) */}
			<div className="container mx-auto px-6 -mt-8 relative z-20">
				<div className="bg-white p-4 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-wrap justify-center gap-4">
					<span className="px-6 py-2 bg-green-50 text-[#28a745] font-bold rounded-2xl border border-green-100 italic">
						{mockActions.length} Actions en cours
					</span>
				</div>
			</div>

			{/* LISTE D’ACTIONS */}
			<section className="container mx-auto px-6 mt-20">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
					{mockActions.map((action) => (
						<div
							key={action.id}
							className="group bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden flex flex-col hover:-translate-y-2"
						>
							{/* Image haute (64 = 16rem/256px ou plus selon besoin) */}
							<div className="relative h-72 overflow-hidden">
								<img
									src={action.image}
									alt={action.title}
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

								{action.isCoupDeCoeur && (
									<div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md text-red-600 px-4 py-2 rounded-2xl shadow-lg flex items-center text-xs font-black uppercase tracking-tighter">
										<Heart className="w-3.5 h-3.5 mr-1.5 fill-red-600" />
										Coup de cœur
									</div>
								)}
							</div>

							{/* Contenu */}
							<div className="p-8 flex flex-col flex-1">
								<div className="mb-6">
									<h2 className="text-2xl font-black text-slate-900 group-hover:text-[#28a745] transition-colors duration-300">
										{action.title}
									</h2>
									<p className="text-slate-500 mt-4 leading-relaxed line-clamp-3 font-medium">
										{action.description}
									</p>
								</div>

								{/* MÉTA */}
								<div className="mt-auto space-y-3 pt-6 border-t border-slate-50">
									<div className="flex items-center text-slate-600 font-bold text-sm">
										<div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mr-3 text-[#28a745]">
											<MapPin size={16} />
										</div>
										{action.location}
									</div>

									<div className="flex items-center text-slate-600 font-bold text-sm">
										<div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mr-3 text-[#28a745]">
											<Calendar size={16} />
										</div>
										{action.date}
									</div>
								</div>

								{/* BOUTON  */}
								<div className="mt-8">
									<a
										href={`/action/${action.id}`}
										className="flex items-center justify-center w-full bg-slate-700 group-hover:bg-[#28a745] text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-slate-900/10 group-hover:shadow-green-500/20 transition-all duration-300 transform active:scale-95"
									>
										Voir l’action
										<ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default Actions;
