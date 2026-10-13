// --- PartenariatEpopee.tsx ---
// Section de mobilisation – Page Épopée – Simple Action Citoyenne
// Recherche de partenaires pour la campagne de levée de fonds du Village Épopée Sénégal.

import {
  ArrowRight,
  Building2,
  Camera,
  Globe2,
  Handshake,
  HeartHandshake,
  Landmark,
  Sparkles,
  Wrench,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

/* --------------------------------- Contenu --------------------------------- */

const enjeux = [
  "Insertion professionnelle",
  "Leadership citoyen",
  "Inclusion numérique",
];

interface Raison {
  title: string;
  desc: string;
  icon: LucideIcon;
  iconBg: string;
  accent: string;
}

const raisons: Raison[] = [
  {
    title: "Un impact social fort",
    desc: "Contribuer à un projet tourné vers l’avenir des jeunes et des femmes.",
    icon: HeartHandshake,
    iconBg: "bg-emerald-50 text-emerald-600",
    accent: "border-emerald-500",
  },
  {
    title: "La coopération franco-sénégalaise",
    desc: "Soutenir des priorités partagées : éducation, jeunesse, égalité femmes-hommes et innovation.",
    icon: Globe2,
    iconBg: "bg-blue-50 text-blue-600",
    accent: "border-blue-500",
  },
  {
    title: "Engagement local & RSE",
    desc: "Valoriser l’ancrage local et la démarche de responsabilité sociétale de votre structure.",
    icon: Building2,
    iconBg: "bg-amber-50 text-amber-600",
    accent: "border-amber-500",
  },
  {
    title: "Un modèle à partager",
    desc: "Participer à un modèle qui pourrait être reproduit dans d’autres pays d’Afrique.",
    icon: Sparkles,
    iconBg: "bg-purple-50 text-purple-600",
    accent: "border-purple-500",
  },
];

const formations = [
  "Soudure et maintenance industrielle",
  "Communication et relation client",
];

const publics = [
  "Entreprises",
  "Institutions",
  "ONG",
  "Jeunes",
  "Chercheurs",
  "Citoyens",
];

/* --------------------------------- Section --------------------------------- */

const PartenariatEpopee = () => (
  <section
    id="partenariat"
    aria-labelledby="partenariat-title"
    className="space-y-8"
  >
    {/* ---------- En-tête + projet pilote ---------- */}
    <div className="bg-[#0a192f] rounded-[3.5rem] p-8 md:p-16 overflow-hidden relative shadow-2xl">
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-80 h-80 bg-[#28a745]/15 rounded-full blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/10 rounded-full blur-[100px]"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 mb-4">
            <Handshake className="text-emerald-400" size={18} aria-hidden="true" />
            <span className="text-emerald-400 font-bold uppercase tracking-[0.2em] text-xs">
              Campagne de levée de fonds
            </span>
          </div>

          <h2
            id="partenariat-title"
            className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight"
          >
            Devenez partenaire du{" "}
            <span className="text-[#28a745]">Village Épopée Sénégal</span>
          </h2>

          <p className="mt-6 text-lg text-blue-100/90 leading-relaxed max-w-2xl">
            L’Association{" "}
            <span className="font-bold text-white">Simple Action Citoyenne</span>{" "}
            (SAC), avec l’appui de l’Ambassade de France au Sénégal, mobilise
            les entreprises sénégalaises et étrangères opérant au Sénégal, ainsi
            que toutes les parties prenantes, pour donner vie au Village Épopée.
          </p>
        </div>

        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3">
            Un projet pilote
          </p>
          <p className="text-xl font-bold text-white leading-snug">
            Innovation sociale, éducation numérique et autonomisation des
            jeunes et des femmes.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Enjeux du projet">
            {enjeux.map((enjeu) => (
              <li
                key={enjeu}
                className="px-4 py-2 rounded-full bg-[#28a745]/15 border border-[#28a745]/40 text-emerald-300 text-xs font-bold uppercase tracking-wide"
              >
                {enjeu}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* ---------- Pourquoi s'engager ---------- */}
    <div className="pt-8">
      <div className="mb-10 text-center lg:text-left">
        <h3 className="text-sm font-bold tracking-[0.3em] text-[#28a745] uppercase mb-4">
          Pourquoi s’engager ?
        </h3>
        <p className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
          Un partenariat qui a du sens.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {raisons.map((raison) => (
          <div
            key={raison.title}
            className={`group bg-white p-7 rounded-4xl border border-slate-100 border-b-4 ${raison.accent} shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300`}
          >
            <div
              className={`w-12 h-12 ${raison.iconBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
            >
              <raison.icon size={24} aria-hidden="true" />
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-2 leading-snug">
              {raison.title}
            </h4>
            <p className="text-[15px] text-slate-500 leading-relaxed">
              {raison.desc}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* ---------- Preuves concrètes + Ambassade ---------- */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Wrench size={22} aria-hidden="true" />
          </div>
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
            Déjà des réalisations concrètes
          </h3>
        </div>

        <p className="text-slate-600 leading-relaxed mb-6">
          Financées par l’Ambassade de France au Sénégal, les premières
          formations d’Épopée développent des compétences locales au service
          d’une employabilité durable.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {formations.map((formation) => (
            <li
              key={formation}
              className="flex items-center gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#28a745] transition-colors"
            >
              <span className="w-2 h-2 bg-[#28a745] rounded-full shrink-0" aria-hidden="true" />
              <span className="text-sm font-bold text-slate-800">
                {formation}
              </span>
            </li>
          ))}
        </ul>

        <a
          href="#realisations"
          className="mt-8 inline-flex items-center gap-2 text-[#28a745] font-black uppercase tracking-wider text-sm hover:translate-x-1 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28a745] focus-visible:ring-offset-2 rounded"
        >
          Voir nos réalisations
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col">
        <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
          <Landmark size={22} aria-hidden="true" />
        </div>
        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-6">
          L’appui de l’Ambassade de France
        </h3>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <Handshake className="w-5 h-5 text-[#28a745] shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-slate-600 leading-relaxed">
              Appui et parrainage institutionnels de la campagne.
            </span>
          </li>
          <li className="flex gap-3">
            <Camera className="w-5 h-5 text-[#28a745] shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-slate-600 leading-relaxed">
              Une exposition de photos consacrée aux activités déjà menées par
              SAC au Sénégal.
            </span>
          </li>
        </ul>
      </div>
    </div>

    {/* ---------- À qui s'adresse la campagne + appel ---------- */}
    <div className="bg-emerald-50 rounded-[3rem] border border-emerald-100 p-8 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-4">
            <MessagesSquare className="w-5 h-5 text-[#28a745]" aria-hidden="true" />
            <h3 className="text-sm font-bold tracking-[0.3em] text-[#28a745] uppercase">
              Une campagne ouverte à tous
            </h3>
          </div>
          <ul className="flex flex-wrap gap-2 mb-6" aria-label="Acteurs concernés">
            {publics.map((p) => (
              <li
                key={p}
                className="px-4 py-2 bg-white rounded-full border border-emerald-100 text-sm font-bold text-slate-700 shadow-sm"
              >
                {p}
              </li>
            ))}
          </ul>
          <p className="text-slate-700 leading-relaxed">
            Chaque acteur peut s’engager à sa manière. Ensemble, partageons des
            pratiques qui répondent au chômage des jeunes et au décalage entre
            formation et emploi.
          </p>
        </div>

        <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-4">
          <Link
            to="/contact"
            className="group w-full sm:w-auto flex items-center justify-center bg-[#28a745] text-white font-black py-4 px-8 rounded-4xl shadow-xl hover:-translate-y-1 hover:bg-[#218838] transition-all duration-300 text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28a745] focus-visible:ring-offset-2"
          >
            Échanger sur un partenariat
            <ArrowRight
              className="ml-3 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
          <p className="text-sm text-slate-500 text-center lg:text-right">
            Parlons ensemble de la forme d’engagement qui vous correspond.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default PartenariatEpopee;
