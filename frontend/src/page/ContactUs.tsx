import { CheckCircle2, Clock, CreditCard, Gift, Globe, Loader2, Mail, MapPin, Phone, Send, Smartphone, User, X } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";





type CheckoutFormProps = {
  amount: number;
  currency: string;
  onSuccess: () => void;
};

// --- Début SOUS-COMPOSANT : SYSTÈME DE DON ---

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
      <div className="mx-auto max-w-3xl px-8 text-center py-12 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
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


// --- FIN SOUS-COMPOSANT : SYSTÈME DE DON --- 



const ContactUs = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
		website: "", // honeypot
	});

const [statusMessage, setStatusMessage] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// debut de gestion handleSumit
const handleSubmit = async (e: FormEvent) => {
	e.preventDefault();

// Honeypot anti-bot
if (formData.website) {
	// Bot détecté → on stoppe silencieusement
	return;
}

	setError(null);
	setStatusMessage(null);


	//  Validation simple côté client
	if (!formData.name || !formData.email || !formData.message) {
		setError("Veuillez remplir tous les champs obligatoires.");
		return;
	}

// (optionnel mais recommandé : validations (email, champs requis)

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(formData.email)) {
		setError("Veuillez entrer une adresse email valide."); 
		return;
	}
		setIsLoading(true);

		const { website, ...safeFormData } = formData;
try {

const response = await fetch(`${API_URL}/api/contact`, {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify(safeFormData),
});



	const data = await response.json();


	if (!response.ok) {
			throw new Error("Erreur lors de l'envoi du message.");
		}
				

	// Succès (temporaire avant le fetch backend)
		setStatusMessage(
			data.message ?? "Votre message a été transmis avec succès. @SAC vous remercie 🙏 !",
		);

	setFormData({
			name: "",
			email: "",
			subject: "",
			message: "",
			website: "", //honeypot
		});

	} catch (err) {
		setError(
			err instanceof Error
				? err.message
				: "Une erreur est survenue. Veuillez réessayer.",
		);


	} finally {
		setIsLoading(false);
	}
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
	{/* Message d'erreur backend */}
{error && (
	<p className="text-red-600 text-sm font-medium mb-4">
		{error}
	</p>
)}

{statusMessage && (
	<p className="text-green-600 text-sm font-medium mb-4">
		{statusMessage}
	</p>
)}
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

{/* Honeypot anti-bot : champ invisible pour l’utilisateur,
rempli automatiquement par les bots → blocage silencieux */}

<div className="hidden">
	<label htmlFor="website">Website</label>
	<input
		type="text"
		name="website"
		id="website"
		value={formData.website}
		onChange={handleChange}
		autoComplete="off"
		tabIndex={-1}
	/>
</div>
								<div className="pt-4">
									<button
										type="submit"
										disabled={isLoading}
			
										className={`w-full sm:w-fit px-12 py-4 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 font-black text-white text-lg uppercase tracking-wider ${
		                isLoading
	              		? "bg-gray-400 cursor-not-allowed"
		             	: "bg-[#28a745] hover:-translate-y-1 hover:shadow-green-500/40"
									
      	}`}
									
								>
                  	{isLoading ? "Envoi en cours..." : "Envoyer le message"}
                  	<Send size={20} />
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
											{/* yamsnglfr@gmail.com */}
											simpleactioncitoyenne@gmail.com
											{/* TODO TEST  mail à remplacer après reception acces sécurité  "Google" secretaire SAC simpleactioncitoyenne@gmail.com */}
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

			   {/* --- LE SYSTÈME DE DON INTÉGRÉ ICI --- */}
        <section className="mb-40">
           <DonationSystem />
        </section>


		</div>
	);
};

export default ContactUs;
