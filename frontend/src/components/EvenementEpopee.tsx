// --- EvenementEpopee.tsx ---
// Section événement – Page d'accueil – Simple Action Citoyenne
// Met en avant l'invitation au lancement de la campagne de levée de fonds Épopée.

import {
  ArrowRight,
  Calendar,
  Clock,
  Expand,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import invitationEpopee from "../assets/epoppe/InvitationLancementEpopee.jpg";

const INVITATION_ALT =
  "Invitation de Simple Action Citoyenne et de l'Ambassade de France au Sénégal à la soirée de lancement officiel de la campagne de levée de fonds pour le projet Épopée, le 15 octobre 2026 à partir de 19 h, à la Résidence de France. Infoline : 77 254 38 69 / 77 587 90 57.";

// Date de l'événement (heure de Dakar, UTC+0) : sert uniquement au compte à rebours.
const EVENT_DATE = new Date("2026-10-15T19:00:00Z");

interface EventDetail {
  label: string;
  icon: LucideIcon;
  content: React.ReactNode;
  wide?: boolean;
}

const eventDetails: EventDetail[] = [
  { label: "Date", icon: Calendar, content: "Jeudi 15 octobre 2026" },
  { label: "Heure", icon: Clock, content: "À partir de 19 h" },
  { label: "Lieu", icon: MapPin, content: "Résidence de France", wide: true },
  {
    label: "Contacts",
    icon: Phone,
    wide: true,
    content: (
      <>
        <a
          href="tel:+221772543869"
          className="underline-offset-4 hover:text-green-600 hover:underline"
        >
          77 254 38 69
        </a>
        {" / "}
        <a
          href="tel:+221775879057"
          className="underline-offset-4 hover:text-green-600 hover:underline"
        >
          77 587 90 57
        </a>
      </>
    ),
  },
];

/* --------------------------- Apparition au scroll --------------------------- */

function useReveal<T extends Element>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, visible] as const;
}

/* ------------------------------ Compte à rebours ----------------------------- */

function getCountdownLabel(): string | null {
  const now = new Date();
  if (now >= EVENT_DATE) return null;

  const startOfToday = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );
  const startOfEventDay = Date.UTC(
    EVENT_DATE.getUTCFullYear(),
    EVENT_DATE.getUTCMonth(),
    EVENT_DATE.getUTCDate(),
  );
  const days = Math.round((startOfEventDay - startOfToday) / 86_400_000);

  if (days <= 0) return "C'est ce soir";
  if (days === 1) return "C'est demain";
  return `Dans ${days} jours`;
}

/* --------------------------------- Section --------------------------------- */

// Classes d'apparition partagées (fondu + glissement), désactivées si
// l'utilisateur a demandé à réduire les animations.
const revealBase =
  "transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none";

export const EvenementEpopee: React.FC = () => {
  const [sectionRef, visible] = useReveal<HTMLElement>();
  const countdown = getCountdownLabel();

  // Une fois l'entrée terminée, on retire les délais pour que les effets
  // de survol restent instantanés.
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setSettled(true), 1800);
    return () => window.clearTimeout(timer);
  }, [visible]);

  const delay = (ms: number) => ({
    transitionDelay: visible && !settled ? `${ms}ms` : "0ms",
  });

  return (
    <section
      ref={sectionRef}
      id="evenement-epopee"
      aria-labelledby="evenement-epopee-title"
      className="relative overflow-hidden bg-green-50/60 py-16 md:py-24"
    >
      {/* Halos décoratifs */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-green-200/50 blur-3xl transition-opacity duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl transition-opacity delay-300 duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---------------- Visuel de l'invitation ---------------- */}
          <figure
            className={`m-0 mx-auto w-full max-w-md sm:max-w-lg lg:col-span-5 lg:max-w-none ${revealBase} ${
              visible
                ? "translate-x-0 rotate-0 opacity-100"
                : "-translate-x-12 -rotate-6 opacity-0"
            }`}
          >
            <div className="group relative">
              {/* Carte verte décalée derrière : effet "invitation posée" */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 rounded-2xl bg-green-600 transition-transform delay-500 duration-700 ease-out group-hover:rotate-6 motion-reduce:transition-none ${
                  visible ? "rotate-3 translate-x-2 translate-y-2" : "rotate-0"
                }`}
              />

              <a
                href={invitationEpopee}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ouvrir l'invitation en grand dans un nouvel onglet"
                className="relative block -rotate-1 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-0 group-hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-4 motion-reduce:transition-none"
              >
                <img
                  src={invitationEpopee}
                  alt={INVITATION_ALT}
                  width={1080}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />

                {/* Reflet lumineux qui balaie la carte au survol */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/50 to-transparent opacity-0 transition-all duration-1000 ease-out group-hover:left-[120%] group-hover:opacity-100 motion-reduce:hidden"
                />
              </a>

              {/* Badge compte à rebours (masqué après l'événement) */}
              {countdown && (
                <span
                  className={`absolute -right-3 -top-4 z-10 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-green-700 shadow-lg ring-1 ring-green-100 transition-all delay-700 duration-500 ease-out motion-reduce:transition-none ${
                    visible ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  }`}
                >
                  <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-600" />
                  </span>
                  {countdown}
                </span>
              )}
            </div>

            <figcaption className="mt-5 flex items-center justify-center gap-2 text-sm text-gray-500 lg:justify-start">
              <Expand className="h-4 w-4 shrink-0" aria-hidden={true} />
              Cliquez sur l'invitation pour l'afficher en grand.
            </figcaption>
          </figure>

          {/* ---------------- Informations ---------------- */}
          <div className="lg:col-span-7">
            <p
              className={`mb-4 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-green-600 ${revealBase} ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={delay(150)}
            >
              <span
                aria-hidden="true"
                className={`h-0.5 bg-green-600 transition-all delay-300 duration-700 ease-out ${
                  visible ? "w-10" : "w-0"
                }`}
              />
              Événement
            </p>

            <h2
              id="evenement-epopee-title"
              className={`text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl lg:text-5xl ${revealBase} ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={delay(250)}
            >
              Lancement officiel de la campagne de levée de fonds pour le projet{" "}
              <span className="text-green-600 italic">Épopée</span>
            </h2>

            <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {eventDetails.map((detail, index) => (
                <div
                  key={detail.label}
                  className={`group flex items-start gap-4 rounded-xl ${
                    detail.wide ? "sm:col-span-2" : ""
                  } border border-gray-100 bg-white p-4 shadow-sm hover:-translate-y-1 hover:shadow-lg ${revealBase} ${
                    visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={delay(400 + index * 120)}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-600 text-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                    <detail.icon className="h-5 w-5" aria-hidden={true} />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      {detail.label}
                    </dt>
                    <dd className="mt-0.5 text-lg font-semibold text-gray-900">
                      {detail.content}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div
              className={`${revealBase} ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={delay(950)}
            >
              <Link
                to="/epopee"
                className="group mt-10 inline-flex items-center justify-center gap-3 rounded-full bg-green-600 px-7 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
              >
                Découvrir le projet Épopée
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden={true}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EvenementEpopee;
