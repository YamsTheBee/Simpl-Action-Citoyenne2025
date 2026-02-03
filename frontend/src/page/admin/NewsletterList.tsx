import React, { useState } from 'react';
import { 
  Mail, 
  UserPlus, 
  Trash2, 
  Download, 
  Search, 
  CheckCircle2 
} from 'lucide-react';

interface Subscriber {
  id: number;
  email: string;
  dateJoined: string;
  status: 'actif' | 'désabonné';
}

const NewsletterList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - À lier à votre table MySQL 'newsletter_subscribers'
  const subscribers: Subscriber[] = [
    { id: 1, email: "contact@jean-luc.com", dateJoined: "2026-01-15", status: "actif" },
    { id: 2, email: "marie.togo@gmail.com", dateJoined: "2026-01-20", status: "actif" },
    { id: 3, email: "test-user@yahoo.fr", dateJoined: "2026-01-25", status: "désabonné" },
  ];

  const filteredSubscribers = subscribers.filter(sub => 
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header de la section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Abonnés Newsletter</h2>
          <p className="text-slate-500 text-sm">Gérez la liste de diffusion de Simple Action Citoyenne</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-all shadow-sm">
            <Download className="w-4 h-4 mr-2" /> Exporter CSV
          </button>
        </div>
      </div>

      {/* Barre de recherche et stats rapides */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Rechercher un email..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <UserPlus className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-700">Total</span>
          </div>
          <span className="text-xl font-black text-slate-900">{subscribers.length}</span>
        </div>
      </div>

      {/* Liste des abonnés */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date d'inscription</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredSubscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{sub.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(sub.dateJoined).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      sub.status === 'actif' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {sub.status === 'actif' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredSubscribers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                    Aucun abonné trouvé pour cette recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewsletterList;