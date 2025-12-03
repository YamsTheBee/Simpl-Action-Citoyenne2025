// --- 7. FaitesUnDon.tsx ---

import type React from "react";
import { useState } from "react";
import { DollarSign, Gift, Repeat2, Lock } from "lucide-react";

// --- DONNÉES ---
const suggestedDonationAmounts = [25, 50, 100, 200];

export const FaitesUnDon: React.FC = () => {
	const [amount, setAmount] = useState<number | "">(
		suggestedDonationAmounts[1],
	);
	const [isRecurring, setIsRecurring] = useState(false);

	const handleDonation = (e: React.FormEvent) => {
		e.preventDefault();

		console.log(
			`Simulation de don : ${amount}€ ${
				isRecurring ? "par mois" : "unique"
			}. Merci !`,
		);

		document.getElementById("donation-message")?.classList.remove("hidden");
		setTimeout(
			() =>
				document.getElementById("donation-message")?.classList.add("hidden"),
			3000,
		);
	};

	return (
		<section id="donate" className="py-20 md:py-32 bg-green-50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
				<h2 className="text-4xl md:text-5xl font-extrabold text-center text-green-800 mb-4 flex items-center justify-center">
					<Gift className="w-10 h-10 mr-4 text-green-600" />
					FAITES UN DON.
				</h2>

				<p className="text-xl text-center max-w-3xl mx-auto text-gray-700 mb-12">
					Votre soutien financier est le moteur de nos actions. Chaque euro
					finance directement un projet citoyen.
				</p>

				<div className="bg-white p-6 md:p-10 rounded-2xl shadow-2xl border-t-4 border-green-600">
					<form onSubmit={handleDonation}>
						{/* Choix du montant */}
						<div className="mb-8">
							<p className="block text-lg font-semibold text-gray-700 mb-3">
								Choisissez le montant (en €) :
							</p>

							<div className="flex flex-wrap gap-4 mb-4 justify-center">
								{suggestedDonationAmounts.map((amt) => (
									<button
										key={amt}
										type="button"
										onClick={() => setAmount(amt)}
										className={`px-6 py-3 text-lg font-bold rounded-full transition duration-200 shadow-md ${
											amount === amt
												? "bg-green-600 text-white ring-4 ring-green-300"
												: "bg-gray-100 text-gray-800 hover:bg-green-100"
										}`}
									>
										{amt} €
									</button>
								))}
							</div>

							<input
								type="number"
								value={amount}
								onChange={(e) => setAmount(Number(e.target.value) || "")}
								placeholder="Autre montant..."
								min="5"
								className="mt-4 w-full px-5 py-3 border-2 border-green-300 rounded-xl text-center text-xl focus:ring-green-500 focus:border-green-500 transition duration-150"
							/>
						</div>

						{/* Choix de la récurrence */}
						<div className="mb-8 border-t pt-6">
							<label className="flex items-center space-x-3 cursor-pointer">
								<input
									type="checkbox"
									checked={isRecurring}
									onChange={(e) => setIsRecurring(e.target.checked)}
									className="h-6 w-6 text-green-600 rounded-md border-gray-300 focus:ring-green-500"
								/>

								<span className="text-base font-medium text-gray-700 flex items-center">
									<Repeat2 className="w-5 h-5 mr-2 text-green-600" />
									Faire un don mensuel récurrent
								</span>
							</label>

							{isRecurring && (
								<p className="text-sm text-gray-500 mt-2 ml-8">
									Soutenez-nous de manière stable et continue.
								</p>
							)}
						</div>

						{/* Bouton de Don */}
						<button
							type="submit"
							disabled={!amount}
							className={`w-full py-4 text-xl font-bold uppercase rounded-xl transition duration-300 shadow-xl transform hover:scale-[1.01] flex items-center justify-center ${
								amount
									? "bg-green-600 text-white hover:bg-green-700"
									: "bg-gray-300 text-gray-600 cursor-not-allowed"
							}`}
						>
							<DollarSign className="w-6 h-6 mr-3" />
							Donner {amount ? `${amount} €` : "..."}
						</button>
					</form>

					{/* Message de confirmation */}
					<p
						id="donation-message"
						className="hidden mt-4 text-center text-lg font-semibold text-green-600"
					>
						Merci pour votre générosité ! (Don simulé)
					</p>

					<p className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center">
						<Lock className="w-4 h-4 mr-2" />
						Paiement 100% sécurisé. Réduction d'impôt possible.
					</p>
				</div>
			</div>
		</section>
	);
};
