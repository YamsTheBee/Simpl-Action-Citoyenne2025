import React, { useEffect, useState } from 'react';
import { Download, MoreVertical, Loader2, AlertCircle } from 'lucide-react';
import { adminServices } from "../../../../services/adminService";

interface Donation {
  id: number;
  name: string;
  amount: string;
  date: string;
  status: string;
}

const Donations: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const loadDonations = async () => {
    try {
      setLoading(true);
      const data = await adminServices.getDonations();
      setDonations(data);
      setError(null);
    } catch {
      setError("Impossible de récupérer les dons. Vérifiez la connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  loadDonations();
}, []);


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin mb-2" />
      <p className="font-medium">Récupération des données MySQL...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Historique des Dons</h2>
          <p className="text-slate-500 text-sm">Données synchronisées en temps réel</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors">
          <Download className="w-4 h-4 mr-2" /> Exporter PDF
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Donateur</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Montant</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Statut</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {donations.length > 0 ? (
            donations.map((don) => (
                <tr key={don.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-700">
                    {don.name || "Anonyme"}
                  </td>
                  <td className="px-6 py-4 text-green-600 font-black">
                    {Number(don.amount).toLocaleString('fr-FR')} XOF
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {new Date(don.date).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      don.status === 'success' ? 'bg-green-100 text-green-700' : 
                      don.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {don.status === 'success' ? 'Confirmé' : 
                      don.status === 'pending' ? 'En attente' : 'Échoué'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
                      <MoreVertical className="w-5 h-5 ml-auto" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                  Aucun don enregistré dans la base de données.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donations;