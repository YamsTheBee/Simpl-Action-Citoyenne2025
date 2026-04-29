import React, { useState } from "react";
import {
  Gift,
  Globe,
  Smartphone,
  Lock,
  Heart,
  Loader2,
  CreditCard,
  ShieldCheck,
  X,
} from "lucide-react";

// Mock visuel carte (UI uniquement)
const MockCardInput = () => (
  <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <CreditCard className="text-gray-400 w-5 h-5" />
      <span className="text-gray-400">4242 4242 4242 4242</span>
    </div>
    <div className="text-gray-400 text-sm">MM/YY CVC</div>
  </div>
);

const CheckoutForm = ({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/donations/stripe/create-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            currency,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Erreur serveur");
      }

      const data: {
        success: boolean;
        url?: string;
        error?: string;
      } = await response.json();

      if (!data.success || !data.url) {
        throw new Error(data.error || "Erreur Stripe");
      }

      // 🔥 REDIRECTION STRIPE
      window.location.href = data.url;
    } catch (error) {
      setError("Erreur lors du paiement. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border-2 border-gray-100 rounded-xl bg-gray-50">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Paiement sécurisé par carte
        </label>
        <MockCardInput />
        <p className="mt-2 text-[10px] text-gray-400 uppercase flex items-center">
          <ShieldCheck className="w-3 h-3 mr-1" /> Données sécurisées via Stripe
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
        className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center disabled:opacity-50"
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

  const localAmounts = [1000, 2000, 5000, 10000];
  const internationalAmounts = [10, 20, 50, 100];

  const closeModale = () => {
    setIsOpen(false);
  };

  return (
    <div className="py-12 bg-white flex flex-col items-center justify-center">
      {/* CTA */}
      <div className="text-center max-w-xl px-4">
        <h2 className="text-3xl font-black text-gray-900 mb-4">
          Soutenez Simple Action Citoyenne
        </h2>
        <p className="text-gray-600 mb-8">
          Chaque contribution finance directement nos actions sur le terrain.
        </p>

        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 shadow-xl"
        >
          <Gift className="w-5 h-5 mr-3" />
          Faire un don
        </button>
      </div>

      {/* MODALE */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-50 w-full max-w-2xl rounded-4xl p-8 relative">
            <button onClick={closeModale} className="absolute top-4 right-4">
              <X />
            </button>

            <div className="text-center mb-6">
              <Heart className="mx-auto text-green-600 mb-2" />
              <h2 className="text-2xl font-bold">Finaliser mon don</h2>
            </div>

            {/* Choix méthode */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => {
                  setMethod("local");
                  setAmount(2000);
                }}
                className={
                  method === "local" ? "border-green-600 border-2" : ""
                }
              >
                <Smartphone /> Local
              </button>

              <button
                onClick={() => {
                  setMethod("international");
                  setAmount(25);
                }}
                className={
                  method === "international" ? "border-green-600 border-2" : ""
                }
              >
                <Globe /> International
              </button>
            </div>

            {/* Montants */}
            <div className="mb-6">
              {(method === "local" ? localAmounts : internationalAmounts).map(
                (amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt)}
                    className="m-1 px-4 py-2 border rounded"
                  >
                    {amt}
                  </button>
                ),
              )}
            </div>

            {/* Paiement */}
            {method === "international" ? (
              <CheckoutForm amount={amount} currency="EUR" />
            ) : (
              <button className="w-full bg-orange-500 text-white py-3 rounded">
                Mobile Money (à venir)
              </button>
            )}

            {/* Footer */}
            <div className="mt-6 text-center text-xs text-gray-400 flex justify-center gap-4">
              <span className="flex items-center">
                <Lock className="w-3 h-3 mr-1" /> SSL
              </span>
              <span className="flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1" /> Sécurisé
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationSystem;
