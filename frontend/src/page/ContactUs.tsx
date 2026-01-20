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

	const [statusMessage, setStatusMessage] = useState<string | null>(null);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

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
			<div className="w-full max-w-6xl mb-12 text-left animate-in fade-in slide-in-from-left duration-700">
				<h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900">
					Contactez
					<span className="text-[#28a745] "> - </span>
					nous<span className="text-[#28a745]"> . . .</span>
				</h1>
				<p className="mt-4 text-slate-500 text-lg md:text-xl max-w-2xl font-medium">
					Une question ? Un projet de partenariat ? Notre équipe est à votre
					écoute pour construire l'avenir ensemble.
				</p>
			</div>

			{/* CARTE DE CONTACT PRINCIPALE */}
			<div className="relative z-10 bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] rounded-[2.5rem] overflow-hidden max-w-6xl w-full border border-slate-100 animate-in fade-in zoom-in duration-700">
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
									className="mt-8 text-sm font-bold text-[#28a745] hover:underline transition-all"
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
												className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#28a745] transition-colors"
												size={18}
											/>
											<input
												id="name"
												name="name"
												type="text"
												required
												value={formData.name}
												onChange={handleChange}
												className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-[#28a745] focus:outline-none transition-all placeholder:text-slate-400"
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
												className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#28a745] transition-colors"
												size={18}
											/>
											<input
												id="email"
												name="email"
												type="email"
												required
												value={formData.email}
												onChange={handleChange}
												className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-[#28a745] focus:outline-none transition-all placeholder:text-slate-400"
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
										className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-[#28a745] focus:outline-none transition-all placeholder:text-slate-400"
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
										rows={5}
										required
										value={formData.message}
										onChange={handleChange}
										className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-[#28a745] focus:outline-none transition-all resize-none placeholder:text-slate-400"
										placeholder="Détaillez votre besoin ici..."
									/>
								</div>

								<div className="pt-4">
									<button
										type="submit"
										className="w-full sm:w-fit px-12 py-4 rounded-2xl shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 font-black text-white text-lg uppercase tracking-wider"
										style={{ backgroundColor: SAC_GREEN }}
									>
										Envoyer le message <Send size={20} />
									</button>
								</div>
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
									<div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-slate-200 group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:scale-110 transition-all shadow-sm">
										<MapPin className="text-blue-500" size={22} />
									</div>
									<div>
										<p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">
											Localisation
										</p>
										<p className="text-lg text-slate-700 font-bold leading-tight">
											Route de Ngor extention,
											<br />
											lot n°389 - BP 8809,
											<br />
											Dakar, Sénégal
										</p>
									</div>
								</div>

								<div className="flex items-start gap-5 group">
									<div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-slate-200 group-hover:bg-green-50 group-hover:border-green-100 group-hover:scale-110 transition-all shadow-sm">
										<Phone className="text-[#28a745]" size={22} />
									</div>
									<div>
										<p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">
											Téléphone
										</p>
										<p className="text-lg text-slate-700 font-bold">
											+221 33 800 00 00
										</p>
									</div>
								</div>

								<div className="flex items-start gap-5 group">
									<div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-slate-200 group-hover:bg-purple-50 group-hover:border-purple-100 group-hover:scale-110 transition-all shadow-sm">
										<Mail className="text-purple-500" size={22} />
									</div>
									<div>
										<p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">
											Email
										</p>
										<p className="text-lg text-slate-700 font-bold">
											simpleactioncitoyenne@gmail.com
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-12 p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm relative overflow-hidden group">
							<div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700" />
							<div className="relative z-10">
								<div className="flex items-center gap-3 mb-4 text-[#28a745]">
									<Clock size={20} />
									<h4 className="font-black uppercase tracking-widest text-xs text-slate-900">
										Horaires de réception
									</h4>
								</div>
								<p className="text-sm text-slate-600 leading-relaxed font-medium">
									L'équipe SAC vous accueille du{" "}
									<span className="font-bold text-slate-900">
										lundi au vendredi
									</span>
									, de{" "}
									<span className="text-[#28a745] font-bold">
										09h00 à 18h00
									</span>
									.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* SECTION CARTE (LIGHT) */}
			<div className="relative z-10 max-w-6xl w-full mx-auto mt-20 mb-20 px-2 sm:px-0">
				<div className="relative overflow-hidden rounded-[3rem] shadow-2xl border-[12px] border-white group">
					<div className="absolute inset-0 bg-green-900/5 pointer-events-none z-10 group-hover:bg-transparent transition-colors duration-500" />
					<iframe
						title="Localisation SAC - Ngor Extention"
						width="100%"
						height="500"
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
						className="contrast-[1.05] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 scale-[1.01] group-hover:scale-100"
						/* URL mise à jour pour cibler plus précisément Ngor / Almadies Extention */
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.4234057635694!2d-17.5135246!3d14.7471987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec172ca7866f8af3%3A0x6b907c1b50462002!2sNgor%2C%20Dakar!5e0!3m2!1sfr!2ssn!4v1705330000000!5m2!1sfr!2ssn"
					/>
				</div>
				{/* Badge sur la carte */}
				<div className="absolute -bottom-6 right-10 bg-white px-8 py-4 rounded-2xl shadow-xl z-20 hidden md:flex items-center gap-4 border border-slate-100">
					<div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
						<MapPin size={20} />
					</div>
					<div>
						<p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
							Nous trouver
						</p>
						<p className="text-sm font-bold text-slate-900">
							Ngor Extention, Lot 389
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
