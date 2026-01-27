import React, { useState } from "react";
import { Gift, Globe, Smartphone, Lock, Heart, CheckCircle2, Loader2, CreditCard, ShieldCheck, X } from "lucide-react";

/**
 * Note pour l'intégration : 
 * Dans un environnement de production, vous devrez installer :
 * npm install @stripe/react-stripe-js @stripe/stripe-js axios
 */

// Composant de formulaire de carte simulé
const MockCardInput = () => (
  <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <CreditCard className="text-gray-400 w-5 h-5" />
      <span className="text-gray-400">4242 4242 4242 4242</span>
    </div>
    <div className="text-gray-400 text-sm">MM/YY CVC</div>
  </div>
);

const CheckoutForm = ({ amount, onSuccess, currency }: { amount: number; onSuccess: () => void; currency: string }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSuccess();
  } catch (error) {
      setError("Une erreur est survenue lors de la communication avec Stripe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border-2 border-gray-100 rounded-xl bg-gray-50">
        <label className="block text-sm font-medium text-gray-600 mb-2">Informations de carte sécurisées</label>
        <MockCardInput />
        <p className="mt-2 text-[10px] text-gray-400 uppercase flex items-center">
          <ShieldCheck className="w-3 h-3 mr-1" /> Données cryptées via Stripe
        </p>
      </div>
      
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || amount <= 0}
        className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.01] flex items-center justify-center disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
        ) : (
          <CreditCard className="w-5 h-5 mr-2" />
        )}
        Confirmer le don de {amount} {currency}
      </button>
    </form>
  );
};

export const DonationSystem: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [method, setMethod] = useState<"local" | "international">("local");
  const [amount, setAmount] = useState<number>(2000);
  const [isSuccess, setIsSuccess] = useState(false);

  const localAmounts = [1000, 2000, 5000, 10000];
  const internationalAmounts = [10, 20, 50, 100 ];
// TODO: Ajuster le bon montant en → EUR (ex: 10, 20, 50, 100 )

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  const closeModale = () => {
    setIsOpen(false);
    setIsSuccess(false);
  };

  return (
    <div className="py-12 bg-white flex flex-col items-center justify-center min-h-[400px]">
      {/* Bouton d'appel à l'action principal */}
      <div className="text-center max-w-xl px-4">
        <h2 className="text-3xl font-black text-gray-900 mb-4">Soutenez Simple Action Citoyenne</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Chaque contribution, qu'elle vienne du Sénégal ou de la diaspora, finance directement nos actions sur le terrain.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-green-600 font-pj rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 hover:bg-green-700 shadow-xl hover:shadow-green-200"
        >
          <Gift className="w-5 h-5 mr-3 animate-bounce" />
          Faire un don maintenant
        </button>
      </div>

      {/* Modale de don */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="relative bg-gray-50 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            
            {/* Bouton de fermeture */}
            <button 
              onClick={closeModale}
              className="absolute top-6 right-6 p-2 bg-white/80 hover:bg-white rounded-full text-gray-400 hover:text-gray-600 transition-colors z-10 shadow-sm"
            >
              <X className="w-6 h-6" />
            </button>

            {isSuccess ? (
              <div className="p-12 text-center border-t-8 border-green-500 bg-white">
                <div className="flex justify-center mb-6">
                  <div className="bg-green-100 p-4 rounded-full">
                    <CheckCircle2 className="w-16 h-16 text-green-600" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">MERCI !</h2>
                <p className="text-gray-600 text-lg">Votre générosité fait la différence.</p>
                <button 
                  onClick={closeModale}
                  className="mt-8 px-10 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <div className="max-h-[90vh] overflow-y-auto">
                <div className="p-8 md:p-10">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-2xl mb-4 text-green-600">
                      <Heart className="w-6 h-6 fill-current" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">FINALISER MON DON</h2>
                    <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Sécurisé & Rapide</p>
                  </div>

                  {/* Choix de la méthode */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <button
                      onClick={() => { setMethod("local"); setAmount(2000); }}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center ${
                        method === "local" 
                        ? "border-green-600 bg-white text-green-700 shadow-md ring-4 ring-green-600/5" 
                        : "border-gray-100 bg-white/50 text-gray-400 hover:border-green-200"
                      }`}
                    >
                      <Smartphone className="w-6 h-6 mb-2" />
                      <span className="font-bold text-xs uppercase tracking-tight">Don Local (MM)</span>
                    </button>
                    
                    <button
                      onClick={() => { setMethod("international"); setAmount(25); }}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center ${
                        method === "international" 
                        ? "border-green-600 bg-white text-green-700 shadow-md ring-4 ring-green-600/5" 
                        : "border-gray-100 bg-white/50 text-gray-400 hover:border-green-200"
                      }`}
                    >
                      <Globe className="w-6 h-6 mb-2" />
                      <span className="font-bold text-xs uppercase tracking-tight">International (CB)</span>
                    </button>
                  </div>

                  {/* Formulaire Blanc */}
                  <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100">
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-gray-700 font-bold text-sm uppercase">Montant souhaité</label>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                          {method === "local" ? "FCFA (Sénégal)" : "EUR (International)"}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {(method === "local" ? localAmounts : internationalAmounts).map((amt) => (
                          <button
                            key={amt}
                            onClick={() => setAmount(amt)}
                            className={`py-2 text-sm font-bold rounded-lg border-2 transition-all ${
                              amount === amt 
                              ? "bg-green-600 border-green-600 text-white" 
                              : "border-gray-50 bg-gray-50 text-gray-500 hover:bg-gray-100"
                            }`}
                          >
                            {amt}
                          </button>
                        ))}
                      </div>

                      <div className="relative group">
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-green-500 focus:bg-white transition-all text-xl font-black"
                          placeholder="Autre..."
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                          {method === "local" ? "FCFA" : "€"}

                        </span>
                      </div>
                    </div>

                    {method === "local" ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                          <p className="text-xs text-orange-800 leading-relaxed italic">
                            Redirection sécurisée vers <strong>Wave, Orange Money ou Free</strong>. Simple Action Citoyenne ne stocke aucune donnée bancaire.
                          </p>
                        </div>
                        <button
                          onClick={() => alert(`Lancement du paiement Mobile Money de ${amount} XOF...`)}
                          className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl shadow-lg transition-all transform hover:-translate-y-1 uppercase text-sm tracking-widest"
                        >
                          Payer par Mobile Money
                        </button>
                      </div>
                    ) : (
                      <CheckoutForm 
                        amount={amount} 
                        onSuccess={handleSuccess} 
                        currency="EUR"
                      />
                    )}
                  </div>
                  
                  {/* Footer modale */}
                  <div className="mt-8 flex items-center justify-center space-x-6 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                    <span className="flex items-center"><Lock className="w-3 h-3 mr-1" /> SSL Secure</span>
                    <span className="flex items-center"><ShieldCheck className="w-3 h-3 mr-1" /> PCI-DSS</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationSystem;