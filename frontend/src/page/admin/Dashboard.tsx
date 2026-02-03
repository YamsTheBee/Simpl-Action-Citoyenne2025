import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  HeartHandshake, 
  Mail, 
  MessageSquare, 
  LogOut, 
  Search, 
  type LucideIcon 
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

type TabType = 'overview' | 'donations' | 'messages' | 'newsletter';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const { logout } = useAuth();

  const stats: StatCardProps[] = [
    { title: 'Total Dons', value: '1.250.000 FCFA', icon: HeartHandshake, color: 'text-green-600' },
    { title: 'Messages', value: '12 nouveaux', icon: MessageSquare, color: 'text-blue-600' },
    { title: 'Newsletter', value: '450 abonnés', icon: Mail, color: 'text-purple-600' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar - Menu latéral */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 transition-all duration-300">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-green-400 tracking-wider">SAC ADMIN</h1>
          <p className="text-[10px] text-slate-500 uppercase mt-1">Simple Action Citoyenne</p>
        </div>

        <nav className="flex-1 mt-6 space-y-1">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`w-full flex items-center px-6 py-3 transition-colors ${activeTab === 'overview' ? 'bg-green-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" /> 
            <span className="text-sm font-medium">Tableau de bord</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('donations')} 
            className={`w-full flex items-center px-6 py-3 transition-colors ${activeTab === 'donations' ? 'bg-green-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <HeartHandshake className="w-5 h-5 mr-3" /> 
            <span className="text-sm font-medium">Gestion des Dons</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('messages')} 
            className={`w-full flex items-center px-6 py-3 transition-colors ${activeTab === 'messages' ? 'bg-green-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <MessageSquare className="w-5 h-5 mr-3" /> 
            <span className="text-sm font-medium">Messages reçus</span>
          </button>

          <button 
            onClick={() => setActiveTab('newsletter')} 
            className={`w-full flex items-center px-6 py-3 transition-colors ${activeTab === 'newsletter' ? 'bg-green-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Mail className="w-5 h-5 mr-3" /> 
            <span className="text-sm font-medium">Newsletter</span>
          </button>
        </nav>

        {/* Bouton de déconnexion */}
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={logout} 
            className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors font-medium text-sm"
          >
            <LogOut className="w-5 h-5 mr-3" /> 
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content - Contenu principal */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Barre supérieure */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
              {activeTab === 'overview' ? 'Vue d\'ensemble' : activeTab}
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="text-slate-400 w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Recherche rapide..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-64 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">Admin SAC</p>
                <p className="text-[10px] text-slate-500">Super Utilisateur</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full border-2 border-green-500 flex items-center justify-center font-bold text-green-700 shadow-sm">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Section défilante du contenu */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
          {/* Grid des statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
                <div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.title}</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-4 bg-slate-50 rounded-2xl ${stat.color} shadow-inner`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>
          
          {/* Zone de contenu dynamique (Placeholder) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 min-h-[400px] flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <h3 className="text-lg font-bold text-slate-800">Synchronisation en cours</h3>
            <p className="text-slate-400 mt-2 max-w-sm">
              Nous préparons la connexion avec vos tables MySQL pour afficher les données réelles de la plateforme.
            </p>
            <div className="mt-8 flex gap-3">
              <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-200 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;