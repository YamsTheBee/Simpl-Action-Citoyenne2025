import React, { useEffect, useState } from "react";
import {
	ArrowRight,
	Briefcase,
	Home,
	Lightbulb,
	Target,
	Zap,
	ShieldCheck,
	ChevronRight,
	CheckCircle2,
	Sparkles,
	Users,
	GraduationCap,
	BookOpen,
	Accessibility,
} from "lucide-react";
import { Link } from "react-router-dom";

const EpopeePage = () => {
	const [hasLoaded, setHasLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setHasLoaded(true), 100);
		return () => clearTimeout(timer);
	}, []);

	const filieres = [
		{
			name: "Pavage & Aménagement",
			icon: <Target size={24} />,
			desc: "Maîtrise de l'aménagement urbain et des techniques de pavage durable.",
			accent: "border-emerald-500",
			iconBg: "bg-emerald-50 text-emerald-600",
		},
		{
			name: "Menuiserie & Métallurgie",
			icon: <Briefcase size={24} />,
			desc: "L'art de la transformation du bois et des métaux pour l'habitat.",
			accent: "border-blue-500",
			iconBg: "bg-blue-50 text-blue-600",
		},
		{
			name: "Communication Digitale",
			icon: <Zap size={24} />,
			desc: "Expertise des nouveaux médias et du storytelling numérique.",
			accent: "border-purple-500",
			iconBg: "bg-purple-50 text-purple-600",
		},
		{
			name: "BTP & Électricité",
			icon: <Home size={24} />,
			desc: "Les fondamentaux de la construction et de l'énergie de demain.",
			accent: "border-amber-500",
			iconBg: "bg-amber-50 text-amber-600",
		},
		{
			name: "Secourisme & Santé",
			icon: <ShieldCheck size={24} />,
			desc: "Formation aux gestes qui sauvent et prévention des risques.",
			accent: "border-red-500",
			iconBg: "bg-red-50 text-red-600",
		},
		{
			name: "Robotique & Fintech",
			icon: <Lightbulb size={24} />,
			desc: "Solutions technologiques et financières innovantes.",
			accent: "border-sky-500",
			iconBg: "bg-sky-50 text-sky-600",
		},
	];

	const cibles = [
		{
			tag: "Jeunesse",
			title: "Adolescents",
			desc: "Accompagnement spécifique pour les jeunes en déperdition scolaire afin de les réintégrer via des métiers pratiques.",
			icon: <Users className="w-8 h-8" />,
			color: "text-blue-600",
			borderColor: "group-hover:border-blue-200",
			bgColor: "bg-blue-50",
			iconColor: "text-blue-600",
		},
		{
			tag: "Emploi",
			title: "Jeunes Diplômés",
			desc: "Renforcement de l'adéquation compétences-emploi pour faciliter l'insertion directe en entreprise.",
			icon: <GraduationCap className="w-8 h-8" />,
			color: "text-emerald-600",
			borderColor: "group-hover:border-emerald-200",
			bgColor: "bg-emerald-50",
			iconColor: "text-emerald-600",
		},
		{
			tag: "Avenir",
			title: "Étudiants",
			desc: "Réorientation vers les filières porteuses : digital, Fintech, robotique et nouveaux métiers du BTP.",
			icon: <BookOpen className="w-8 h-8" />,
			color: "text-amber-600",
			borderColor: "group-hover:border-amber-200",
			bgColor: "bg-amber-50",
			iconColor: "text-amber-600",
		},
		{
			tag: "Inclusion",
			title: "Inclusion Sociale",
			desc: "Programmes adaptés pour l'autonomisation et l'insertion professionnelle des personnes handicapées.",
			icon: <Accessibility className="w-8 h-8" />,
			color: "text-purple-600",
			borderColor: "group-hover:border-purple-200",
			bgColor: "bg-purple-50",
			iconColor: "text-purple-600",
		},
	];

	const gallery = [
		{
			url: "https://images.unsplash.com/photo-1581092916357-5896ebc48073?q=80&w=2000&auto=format&fit=crop",
			title: "Innovation Technologique",
			category: "Robotique & Fintech",
		},
		{
			url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop",
			title: "Artisanat de Précision",
			category: "BTP & Maçonnerie",
		},
		{
			url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop",
			title: "Collaboration Créative",
			category: "Communication Digitale",
		},
	];

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
			{/* --- HERO SECTION --- */}
			<section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-[#0a192f]">
				<div className="absolute inset-0 opacity-40">
					<img
						src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
						alt="Collaboration et innovation"
						className="w-full h-full object-cover"
					/>
				</div>

				<div
					className={`relative z-10 px-6 text-center transition-all duration-1000 ${hasLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
				>
					<h1 className="flex items-center justify-center gap-4 text-5xl md:text-5xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tighter">
						<Home className="w-16 h-16 md:w-20 md:h-20 text-[#28a745]" />
						L'ÉPOPÉE <span className="text-[#28a745] italic">DAKAR</span>
					</h1>
					<p className="text-xl md:text-xl text-blue-50 max-w-3xl mx-auto leading-relaxed font-light">
						Une initiative de{" "}
						<span className="font-bold text-white border-b-2 border-[#28a745]">
							Simple Action Citoyenne
						</span>{" "}
						avec l’appui de l’Ambassade de France.
					</p>
				</div>
				<div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent" />
			</section>

			{/* --- MAIN CONTENT CONTAINER --- */}
			<div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-16 relative z-20 space-y-48 pb-48">
				{/* --- 1. CONTEXTE --- */}
				<section className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
					<div className="grid grid-cols-1 lg:grid-cols-12">
						<div className="lg:col-span-8 p-8 md:p-16">
							<h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 border-l-8 border-[#28a745] pl-6 uppercase tracking-tight">
								Contexte & <span className="text-[#28a745]"> Ambition </span>
							</h2>
							<div className="space-y-6 text-lg text-slate-600 leading-relaxed">
								<p>
									Le Sénégal traverse une transformation économique majeure
									portée par le numérique, les énergies renouvelables et le BTP.
									Cette mutation crée d'immenses opportunités, mais souligne
									aussi un défi de taille.
								</p>
								<p>
									Le{" "}
									<span className="font-bold text-slate-900">
										Village l’Épopée
									</span>{" "}
									est la réponse stratégique de l'Association{" "}
									<span className="text-[#28a745] font-semibold">SAC</span>,
									avec l'appui de l'Ambassade de France, pour structurer
									l'apprentissage professionnel.
								</p>
								<p>
									En parfait alignement avec la stratégie nationale,
								
				    		notre ambition est de bâtir un capital humain fort et
									résilient.
								</p>

								{/* Badges d'impact */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
									<div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#28a745] transition-colors">
										<CheckCircle2 className="text-[#28a745] w-6 h-6 shrink-0" />
										<div>
											<span className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
												Insertion durable
											</span>
											<span className="text-xs text-slate-500">
												600 jeunes formés aux métiers d'avenir
											</span>
										</div>
									</div>
									<div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#28a745] transition-colors">
										<CheckCircle2 className="text-[#28a745] w-6 h-6 shrink-0" />
										<div>
											<span className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
												Leadership Citoyen
											</span>
											<span className="text-xs text-slate-500">
												Développement de soft-skills et mentorat
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Encart Focus */}
						<div className="lg:col-span-4 bg-[#0a192f] p-12 text-white flex flex-col justify-center relative">
							<div className="absolute top-0 right-0 p-8 opacity-10">
								<Target size={120} />
							</div>
							<h3 className="text-xl font-bold mb-6 text-emerald-400 uppercase tracking-widest flex items-center gap-2">
								<Target className="w-5 h-5" /> Objectif Global
							</h3>
							<p className="text-blue-100 mb-10 italic text-lg leading-relaxed border-l-2 border-emerald-500/30 pl-4">
								"Faire de l'Épopée Dakar un centre d'excellence reconnu en
								Afrique de l'Ouest."
							</p>
							<div className="space-y-4 text-sm">
								<div className="flex justify-between border-b border-white/10 pb-3 font-medium">
									<span className="text-slate-400 uppercase tracking-tighter">
										Durée Phase 1
									</span>
									<span>5 Ans</span>
								</div>
								<div className="flex justify-between border-b border-white/10 pb-3 font-medium">
									<span className="text-slate-400 uppercase tracking-tighter">
										Localisation
									</span>
									<span>Yoff, Dakar</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* --- 2. GALERIE --- */}
				<section className="space-y-16">
					<div className="text-center max-w-2xl mx-auto">
						<h2 className="text-sm font-bold tracking-[0.3em] text-[#28a745] uppercase mb-4">
							Aperçu du Village
						</h2>
						<h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
							Le geste métier en action.
						</h3>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{gallery.map((img) => (
							<div
								key={img.url} 
								className="relative group overflow-hidden rounded-[2.5rem] aspect-[4/5] bg-slate-200 shadow-xl"
							>
								<img
									src={img.url}
									alt={img.title}
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
									<p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
										{img.category}
									</p>
									<h4 className="text-white text-2xl font-bold">{img.title}</h4>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* --- 3. CIBLES (CORRIGÉ AVEC COULEURS DYNAMIQUES) --- */}
				<section className="pt-10">
					<div className="mb-20 text-center lg:text-left">
						<h2 className="text-sm font-bold tracking-[0.3em] text-[#28a745] uppercase mb-4">
							Impact Social
						</h2>
						<h3 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
							À qui nous adressons-nous ?
						</h3>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						{cibles.map((cible) => (
							<div
								key={cible.title}
								className={`group bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300 ${cible.borderColor}`}
							>
								<div
									className={`mb-6 p-4 ${cible.bgColor} w-fit rounded-2xl transition-colors`}
								>
									{React.cloneElement(cible.icon as React.ReactElement, {
										className: `w-8 h-8 ${cible.iconColor}`,
									})}
								</div>
								<span
									className={`text-xs font-black mb-2 block uppercase tracking-wider ${cible.color}`}
								>
									{cible.tag}
								</span>
								<h4 className="text-xl font-bold text-slate-900 mb-3 transition-colors">
									{cible.title}
								</h4>
								<p className="text-[15px] text-slate-500 leading-relaxed">
									{cible.desc}
								</p>
							</div>
						))}
					</div>
				</section>

				{/* --- 4. FILIÈRES --- */}
				<section>
					<div className="bg-[#0a192f] rounded-[3.5rem] p-8 md:p-16 overflow-hidden relative shadow-2xl">
						<div className="absolute top-0 right-0 w-80 h-80 bg-[#28a745]/10 rounded-full blur-[100px]" />
						<div className="relative z-10">
							<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
								<div>
									<div className="flex items-center gap-2 mb-3">
										<Sparkles className="text-emerald-400" size={16} />
										<span className="text-emerald-400 font-bold uppercase tracking-[0.2em] text-[10px]">
											Expertises métiers
										</span>
									</div>
									<h2 className="text-3xl md:text-5xl font-black text-white">
										Nos <span className="text-[#28a745]">Filières</span>
									</h2>
								</div>
								<p className="text-slate-400 text-lg lg:text-right max-w-sm italic border-l lg:border-l-0 lg:border-r border-emerald-500/30 px-6">
									"Une pédagogie active basée sur les besoins réels du marché."
								</p>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
								{filieres.map((f) => (
									<div
										key={f.name}
										className={`group bg-white p-7 rounded-[2rem] border-b-4 ${f.accent} hover:-translate-y-2 transition-all duration-300 flex flex-col h-full`}
									>
										<div
											className={`w-12 h-12 ${f.iconBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
										>
											{f.icon}
										</div>
										<h4 className="text-xl font-black text-slate-900 mb-2">
											{f.name}
										</h4>
										<p className="text-slate-500 text-xs leading-relaxed mb-6">
											{f.desc}
										</p>
										<div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
											<span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
												Formation Pro
											</span>
											<ChevronRight
												className="text-[#28a745] opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all"
												size={16}
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* --- 5. PARTENAIRES --- */}
				<section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					<div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100">
						<h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tighter">
							Durabilité
						</h3>
						<div className="space-y-6">
							<div className="p-6 bg-emerald-50 rounded-2xl">
								<h4 className="font-black text-emerald-900 text-xl mb-2">
									Modèle Économique
								</h4>
								<p className="text-s text-emerald-700 leading-relaxed">
									Frais solidaires, prestations d'ateliers et location
									d'espaces.
								</p>
							</div>
							<div className="p-6 bg-sky-50 rounded-2xl">
								<h4 className="font-black  text-sky-900 text-xl mb-2">
									Franchise Sociale
								</h4>
								<p className="text-s text-sky-700 leading-relaxed">
									Modèle documenté et réplicable dans tout le Sénégal.
								</p>
							</div>
						</div>
					</div>
					<div className="lg:col-span-2 bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100">
						<h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tighter">
							Écosystème Partenarial
						</h3>
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
							{[
								"Min. Formation Pro",
								"ONFP / 3FPT",
								"Collectivités Yoff",
								"Ambassade de France",
								"Secteur Privé",
								"Chambres de Commerce",
							].map((p) => (
								<div
									key={p}
									className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100"
								>
									<div className="w-2 h-2 bg-[#28a745] rounded-full" />
									<span className="text-[12px] font-black text-slate-700 uppercase tracking-tight">
										{p}
									</span>
								</div>
							))}
						</div>
						<div className="mt-12 p-6 bg-amber-50 rounded-2xl border border-amber-100 text-center">
							<p className="text-l text-amber-800 italic font-medium">
								"Réunir les forces vives pour un impact durable."
							</p>
						</div>
					</div>
				</section>

				{/* --- 6. CALL TO ACTION --- */}
				<section className="text-center bg-white p-16 md:p-20 rounded-[5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
					<div className="relative z-10">
						<h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tighter">
							Rejoignez l'aventure<span className="text-[#28a745]"> . . .</span>
						</h3>
						<p className="text-xl text-slate-500 mb-16 max-w-2xl mx-auto leading-relaxed">
							Que ce soit par un partenariat, du mentorat ou une inscription,
							votre engagement est le moteur de cette transition sociale.
						</p>
						<div className="flex flex-col sm:flex-row justify-center gap-6">
							<Link
								to="/contact"
								className="flex items-center justify-center bg-[#28a745] text-white font-black py-4 px-6 rounded-[2rem] shadow-xl hover:-translate-y-2 transition-all duration-300 text-lg"
							>
								Nous Contacter{" "}
								<ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
							</Link>
						</div>
					</div>
					<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[120px] -mr-64 -mt-64 opacity-50" />
				</section>
			</div>
		</div>
	);
};

export default EpopeePage;
