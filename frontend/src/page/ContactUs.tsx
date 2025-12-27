//  COMPOSANT DE CONTACT

import { Clock, Mail, MapPin, Phone, Send, User } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";

const SAC_GREEN = "#28a745";

const ContactUs = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	// Correction : définition du type pour accepter string ou null
	const [statusMessage, setStatusMessage] = useState<string | null>(null);

	// Correction : Typage de l'événement de changement
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Correction : Typage de l'événement de soumission
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setStatusMessage("Votre message a été transmis avec succès !");

		setTimeout(() => {
			setFormData({ name: "", email: "", subject: "", message: "" });
			setStatusMessage(null);
		}, 4000);
	};

	return (
		<div className="min-h-screen relative flex flex-col items-center p-4 sm:p-12 font-sans bg-[#f8fafc] text-slate-800">
			{/* EFFETS DE COULEURS DOUCES EN ARRIÈRE-PLAN */}
			<div className="fixed inset-0 -z-10 overflow-hidden">
				<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[120px]" />
				<div className="absolute bottom-[0%] right-[-5%] w-[35%] h-[35%] rounded-full bg-green-100/30 blur-[120px]" />
			</div>

			{/* TITRE PRINCIPAL MASSIF */}
			<div className="w-full max-w-6xl mb-12 text-left">
				<h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900">
					Contactez-nous<span className="text-[#28a745]">.</span>
				</h1>
			</div>

			{/* CARTE DE CONTACT PRINCIPALE */}
			<div className="relative z-10 bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] rounded-[2.5rem] overflow-hidden max-w-6xl w-full border border-slate-100">
				<div className="grid grid-cols-1 lg:grid-cols-5">
					{/* COLONNE FORMULAIRE (3/5) - À GAUCHE */}
					<div className="lg:col-span-3 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 bg-white">
						{statusMessage ? (
							<div className="h-full flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
								<div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-100 shadow-sm">
									<Send size={32} />
								</div>
								<h3 className="text-2xl font-bold text-slate-900 mb-2">
									Message envoyé !
								</h3>
								<p className="text-slate-500 max-w-xs">{statusMessage}</p>
								<button
									type="button"
									onClick={() => setStatusMessage(null)}
									className="mt-8 text-sm font-bold text-[#28a745] hover:underline"
								>
									Envoyer un autre message
								</button>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
									<div className="space-y-2">
										<label
											htmlFor="name"
											className="text-sm font-bold text-slate-700 ml-1"
										>
											Nom complet
										</label>
										<div className="relative group">
											<User
												className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
												size={18}
											/>
											<input
												id="name"
												name="name"
												type="text"
												required
												value={formData.name}
												onChange={handleChange}
												className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
												placeholder="Votre nom"
											/>
										</div>
									</div>

									<div className="space-y-2">
										<label
											htmlFor="email"
											className="text-sm font-bold text-slate-700 ml-1"
										>
											Email
										</label>
										<div className="relative group">
											<Mail
												className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
												size={18}
											/>
											<input
												id="email"
												name="email"
												type="email"
												required
												value={formData.email}
												onChange={handleChange}
												className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
												placeholder="nom@mail.com"
											/>
										</div>
									</div>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="subject"
										className="text-sm font-bold text-slate-700 ml-1"
									>
										Objet
									</label>
									<input
										id="subject"
										name="subject"
										type="text"
										required
										value={formData.subject}
										onChange={handleChange}
										className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
										placeholder="Sujet de votre demande"
									/>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="message"
										className="text-sm font-bold text-slate-700 ml-1"
									>
										Votre message
									</label>
									<textarea
										id="message"
										name="message"
										rows={6}
										required
										value={formData.message}
										onChange={handleChange}
										className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all resize-none placeholder:text-slate-400"
										placeholder="Détaillez votre besoin ici..."
									/>
								</div>

								{/* CONTENEUR DU BOUTON CENTRÉ */}

								<button
									type="submit"
									className="w-fit px-10 py-4 rounded-2xl shadow-lg shadow-green-500/10 hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 font-bold text-white text-lg"
									style={{ backgroundColor: SAC_GREEN }}
								>
									Envoyer le message <Send size={20} />
								</button>
							</form>
						)}
					</div>

					{/* COLONNE INFOS (2/5) - À DROITE */}
					<div className="lg:col-span-2 p-8 sm:p-12 bg-slate-50 flex flex-col justify-between">
						<div className="space-y-10">
							<h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
								<span className="w-2 h-8 bg-[#28a745] rounded-full" />
								Nos bureaux
							</h3>

							<div className="space-y-8">
								<div className="flex items-start gap-5 group">
									<div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform">
										<MapPin className="text-blue-500" size={22} />
									</div>
									<div>
										<p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
											Localisation
										</p>
										<p className="text-lg text-slate-700 font-medium leading-tight">
											Rue NG-12, Ngor,
											<br />
											Dakar, Sénégal
										</p>
									</div>
								</div>

								<div className="flex items-start gap-5 group">
									<div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center border border-green-100 group-hover:scale-110 transition-transform">
										<Phone className="text-[#28a745]" size={22} />
									</div>
									<div>
										<p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
											Téléphone
										</p>
										<p className="text-lg text-slate-700 font-medium">
											+221 33 800 00 00
										</p>
									</div>
								</div>

								<div className="flex items-start gap-5 group">
									<div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center border border-purple-100 group-hover:scale-110 transition-transform">
										<Mail className="text-purple-500" size={22} />
									</div>
									<div>
										<p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
											Email
										</p>
										<p className="text-lg text-slate-700 font-medium">
											contact@sac-citoyen.sn
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-12 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
							<div className="flex items-center gap-3 mb-3 text-[#28a745]">
								<Clock size={18} />
								<h4 className="font-bold text-slate-900">Heures d'ouverture</h4>
							</div>
							<p className="text-sm text-slate-600 leading-relaxed">
								L'équipe SAC vous reçoit du{" "}
								<span className="font-semibold text-slate-900">
									lundi au vendredi
								</span>
								, de 09h00 à 18h00.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* SECTION CARTE (LIGHT) */}
			<div className="relative z-10 max-w-6xl w-full mx-auto mt-20 mb-20">
				<div className="overflow-hidden rounded-[2.5rem] shadow-xl border-8 border-white group">
					<iframe
						title="Localisation SAC Light"
						width="100%"
						height="450"
						style={{ border: 0 }}
						allowFullScreen
						className="contrast-[1.02] grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.453303353457!2d-17.5186!3d14.7455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec173db000000001%3A0x0!2zTmdvciwgRGFrYXI!5e0!3m2!1sfr!2sfr!4v1700000000000"
					/>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
