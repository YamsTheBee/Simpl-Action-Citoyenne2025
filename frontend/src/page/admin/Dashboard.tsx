import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  HeartHandshake,
  Mail,
  MessageSquare,
  LogOut,
  Search,
  type LucideIcon,
} from "lucide-react";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";


ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);


import { useAuth } from "../../context/AuthContext";
import { adminServices } from "../../../../services/adminService";
import MessagesList from "./MessagesList";
import RecentActivities from "../../components/AdminRecentActivities"; // ✅ AJOUT ICI

/**
 * 📌 Types
 */
type TabType = "overview" | "donations" | "messages" | "newsletter";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

interface DashboardStats {
  totalDonations: number;
  totalMessages: number;
  totalSubscribers: number;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const { logout } = useAuth();

  /**
   * 📊 Stats dashboard
   */
  const [stats, setStats] = useState<DashboardStats>({
    totalDonations: 0,
    totalMessages: 0,
    totalSubscribers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const monthlyLabels = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil"];

const monthlyDonations = [
  50000,
  150000,
  120000,
  400000,
  350000,
  600000,
  550000,
];

  /**
   * 🔄 Chargement des stats depuis l’API admin
   */
  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await adminServices.getDashboardStats();

        setStats({
          totalDonations: Number(data?.totalDonations ?? 0),
          totalMessages: data?.totalMessages ?? 0,
          totalSubscribers: data?.totalSubscribers ?? 0,
        });
      } catch (err) {
        console.error("Erreur stats admin :", err);
        setError("Impossible de charger les statistiques.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  /**
   * 🧱 Cartes statistiques
   */
  const statCards: StatCardProps[] = [
    {
      title: "Total Dons",
      value: `${stats.totalDonations.toLocaleString("fr-FR")} FCFA`,
      icon: HeartHandshake,
      color: "text-green-600",
    },
    {
      title: "Messages",
      value: stats.totalMessages.toString(),
      icon: MessageSquare,
      color: "text-blue-600",
    },
    {
      title: "Newsletter",
      value: stats.totalSubscribers.toString(),
      icon: Mail,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-green-400">SAC ADMIN</h1>
          <p className="text-[10px] text-slate-500 uppercase mt-1">
            Simple Action Citoyenne
          </p>
        </div>

        <nav className="flex-1 mt-6 space-y-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center px-6 py-3 ${
              activeTab === "overview"
                ? "bg-green-600"
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Tableau de bord
          </button>

          <button
            onClick={() => setActiveTab("donations")}
            className={`w-full flex items-center px-6 py-3 ${
              activeTab === "donations"
                ? "bg-green-600"
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            <HeartHandshake className="w-5 h-5 mr-3" />
            Dons
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`w-full flex items-center px-6 py-3 ${
              activeTab === "messages"
                ? "bg-green-600"
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            <MessageSquare className="w-5 h-5 mr-3" />
            Messages
          </button>

          <button
            onClick={() => setActiveTab("newsletter")}
            className={`w-full flex items-center px-6 py-3 ${
              activeTab === "newsletter"
                ? "bg-green-600"
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            <Mail className="w-5 h-5 mr-3" />
            Newsletter
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b px-8 py-4 flex justify-between">
          <h2 className="text-xl font-bold text-slate-800">
            Tableau de bord
          </h2>
          <p className="text-xs text-slate-400 hidden sm:block">Bienvenue, Admin. Voici le résumé de l'impact actuel.</p>
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="pl-10 pr-4 py-2 border rounded-full"
              placeholder="Recherche rapide..."
            />
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto">
          {loading && <p className="text-slate-400">Chargement des données…</p>}
          {error && <p className="text-red-500 font-medium">{error}</p>}

   
    {/* 📊 OVERVIEW */}
{!loading && !error && activeTab === "overview" && (
  <div className="space-y-8">
    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statCards.map((stat, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-2xl border shadow-sm flex justify-between"
        >
          <div>
            <p className="text-xs uppercase text-slate-500">
              {stat.title}
            </p>
            <p className="text-2xl font-black">{stat.value}</p>
          </div>
          <div className={`p-4 rounded-xl ${stat.color}`}>
            <stat.icon className="w-6 h-6" />
          </div>
        </div>
      ))}
    </div>

    {/* Charts & Activity */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 📈 Évolution des dons */}
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-slate-800">
            Évolution des Dons (Mensuel)
          </h3>
          <select className="text-xs border rounded p-1 text-slate-500">
            <option>2026</option>
            <option>2025</option>
          </select>
        </div>

        <div className="relative h-[220px]">
          <Line
            data={{
              labels: monthlyLabels,
              datasets: [
                {
                  label: "Dons (FCFA)",
                  data: monthlyDonations,
                  borderColor: "#16a34a",
                  backgroundColor: "rgba(22,163,74,0.08)",
                  fill: true,
                  tension: 0.4,
                  borderWidth: 3,
                  pointRadius: 0,
                  pointHoverRadius: 5,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { display: false } },
                y: { display: false },
              },
            }}
          />
        </div>
      </div>

      {/* 🕒 Activités récentes */}
      <RecentActivities />
    </div>
  </div>
)}


          {/* 📬 MESSAGES */}
          {!loading && !error && activeTab === "messages" && <MessagesList />}

          {/* 💰 DONATIONS */}
          {!loading && !error && activeTab === "donations" && (
            <p className="text-slate-400">Module dons à venir…</p>
          )}

          {/* 📰 NEWSLETTER */}
          {!loading && !error && activeTab === "newsletter" && (
            <p className="text-slate-400">Module newsletter à venir…</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
