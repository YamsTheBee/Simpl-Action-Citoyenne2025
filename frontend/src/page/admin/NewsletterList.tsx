import React, { useEffect, useState } from 'react';
import { Trash2, Download, Search, UserPlus } from 'lucide-react';
import { adminServices } from '../../../../services/adminService';

interface Subscriber {
  id: number;
  email: string;
  created_at: string;
}

const NewsletterList: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadSubscribers = async () => {
      try {
        const data = await adminServices.getNewsletterSubscribers();
        setSubscribers(data);
      } catch {
        setError("Impossible de charger la newsletter.");
      } finally {
        setLoading(false);
      }
    };

    loadSubscribers();
  }, []);

  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-slate-400">Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Abonnés Newsletter</h2>
          <p className="text-slate-500 text-sm">
            Gérez la liste de diffusion de Simple Action Citoyenne
          </p>
        </div>

        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700">
          <Download className="w-4 h-4 mr-2" /> Exporter CSV
        </button>
      </div>

      {/* Recherche + total */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un email..."
            className="w-full pl-12 pr-4 py-3 border rounded-2xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-white p-4 rounded-2xl flex items-center justify-between border">
          <div className="flex items-center gap-3">
            <UserPlus className="w-5 h-5 text-green-600" />
            <span className="text-sm font-bold">Total</span>
          </div>
          <span className="text-xl font-black">{subscribers.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase">Email</th>
              <th className="px-6 py-4 text-xs font-bold uppercase">Date</th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredSubscribers.map(sub => (
              <tr key={sub.id}>
                <td className="px-6 py-4">{sub.email}</td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {new Date(sub.created_at).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 text-right">
                  <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-600 cursor-pointer" />
                </td>
              </tr>
            ))}

            {filteredSubscribers.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic">
                  Aucun abonné trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsletterList;
