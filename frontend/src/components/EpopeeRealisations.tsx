import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";

import formationAtelier from "../assets/epopee-soudure-atelier.jpeg";
import formationGeste from "../assets/epopee-soudure-geste-technique.jpeg";
import formationGroupe from "../assets/epopee-soudure-groupe.jpeg";
import discours4 from "../assets/epoppe/DiscourEpp4.jpg";
import momentFort1 from "../assets/epoppe/MaietNintheeEpp.png";
import momentFort2 from "../assets/epoppe/MomentFort2.png";
import momentFort3 from "../assets/epoppe/Ambassadrice2.png";
import momentFort4 from "../assets/epoppe/MomentFort4.png";
import ceremony1 from "../assets/epoppe/DiscourAmbassadrice.jpg";
import Diplome1 from "../assets/epoppe/Diplome1.png";
import Diplome2 from "../assets/epoppe/Diplome2.png";
import Diplome3 from "../assets/epoppe/Diplome3.png";
import Diplome4 from "../assets/epoppe/Diplome4.png";
import ceremony2 from "../assets/epoppe/DiscourEpp1.png";
import ceremony3 from "../assets/epoppe/DiscourEpp3.png";
import portrait1 from "../assets/epoppe/PortraitEpp1.png";
import portrait2 from "../assets/epoppe/PortraitEpp2.png";
import portrait3 from "../assets/epoppe/PortraitEpp3.png";
import portrait4 from "../assets/epoppe/PortraitEpp4.png";
import portrait5 from "../assets/epoppe/PortraitEpp5.png";
// import FormationCom1 from "../assets/FormationCom/FormationCom1.png";
import FormationCom2 from "../assets/FormationCom/FormationCom2.png";

/* ------------------------------------------------------------------
 * CONTENU À COMPLÉTER
 * ------------------------------------------------------------------ */

// Nombre de bénéficiaires certifiés. Laisser à null tant qu'il n'est pas confirmé :
// la statistique ne s'affiche pas.
const NB_BENEFICIAIRES_CERTIFIES: number | null = null;

// Auteur de la citation (ex. "Mme Christine Fages, ambassadrice de France au Sénégal").
// null = la citation s'affiche sans signature.
const AUTEUR_CITATION: string | null = null;

// TODO : remplacer par une vraie photo du parcours "Communication et relation client".
const communicationImage = FormationCom2;

/* ------------------------------------------------------------------
 * TYPES
 * ------------------------------------------------------------------ */

type GalleryImage = {
  src: string;
  alt: string;
};

type Category = "certificats" | "moments" | "atelier";

type GalleryPhoto = GalleryImage & {
  caption: string;
  category: Category;
};

type ImageCarouselProps = {
  images: GalleryImage[];
  heightClassName: string;
  label?: string;
};

/* ------------------------------------------------------------------
 * IMAGES DES PARCOURS (inchangées)
 * ------------------------------------------------------------------ */

const weldingImages: GalleryImage[] = [
  {
    src: formationAtelier,
    alt: "Des participants s’exercent à la soudure pendant la formation",
  },
  {
    src: formationGeste,
    alt: "Un apprenant réalise un geste technique de soudure",
  },
  {
    src: formationGroupe,
    alt: "Les participants réunis pendant la formation en soudure",
  },
];

/* ------------------------------------------------------------------
 * GALERIE DE LA CÉRÉMONIE
 * Les photos sont chargées automatiquement depuis le dossier
 * src/assets/epopee/galerie/ (nommage : certif-01.jpg, moment-01.jpg, atelier-01.jpg…).
 * ------------------------------------------------------------------ */

const galleryModules = import.meta.glob<string>(
  "../assets/epopee/galerie/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" },
);

const CATEGORY_BY_PREFIX: Record<string, Category> = {
  certif: "certificats",
  moment: "moments",
  atelier: "atelier",
};

const CATEGORY_LABELS: Record<Category, string> = {
  certificats: "Remise des certificats",
  moments: "Moments partagés",
  atelier: "En atelier",
};

const DEFAULT_CAPTIONS: Record<Category, string> = {
  certificats: "Remise d’un certificat de fin de formation.",
  moments: "Les bénéficiaires célèbrent la réussite de leur parcours.",
  atelier: "La formation pratique en atelier.",
};

// Légendes personnalisées (facultatif), clé = nom du fichier sans extension.
const CUSTOM_CAPTIONS: Record<string, string> = {
  // "certif-01": "Remise du certificat en soudure industrielle à l’une des récipiendaires.",
  // "moment-03": "Mme Christine Fages entourée des bénéficiaires.",
};

const galleryPhotos: GalleryPhoto[] = Object.entries(galleryModules)
  .sort(([a], [b]) => a.localeCompare(b, "fr", { numeric: true }))
  .map(([path, src]) => {
    const fileName = path.split("/").pop() ?? "";
    const name = fileName.replace(/\.[^.]+$/, "");
    const prefix = name.split(/[-_]/)[0].toLowerCase();
    const category = CATEGORY_BY_PREFIX[prefix] ?? "moments";
    const caption = CUSTOM_CAPTIONS[name] ?? DEFAULT_CAPTIONS[category];

    return { src, alt: caption, caption, category };
  });

// Filet de sécurité : si le dossier est vide, on réutilise les 3 photos actuelles.
const fallbackPhotos: GalleryPhoto[] = [
  {
    src: ceremony1,
    alt: "Mme Christine Fages avec les bénéficiaires lors de la cérémonie",
    caption: "Mme Christine Fages avec les bénéficiaires.",
    category: "certificats",
  },
  {
    src: Diplome1,
    alt: "",
    caption: "",
    category: "certificats",
  },
  {
    src: ceremony2,
    alt: "Remise des certificats aux bénéficiaires",
    caption: "",
    category: "certificats",
  },
  {
    src: discours4,
    alt: "",
    caption: "",
    category: "certificats",
  },
  {
    src: Diplome2,
    alt: "",
    caption: "",
    category: "certificats",
  },
  {
    src: ceremony3,
    alt: "",
    caption: "",
    category: "certificats",
  },
  {
    src: portrait1,
    alt: "",
    caption: "",
    category: "certificats",
  },
  {
    src: portrait2,
    alt: "",
    caption: "",
    category: "certificats",
  },
  {
    src: portrait3,
    alt: "",
    caption: "",
    category: "certificats",
  },
  {
    src: portrait4,
    alt: "",
    caption: "",
    category: "certificats",
  },
  {
    src: Diplome4,
    alt: "",
    caption: "",
    category: "certificats",
  },
  {
    src: portrait5,
    alt: "",
    caption: "",
    category: "certificats",
  },
  {
    src: momentFort1,
    alt: "",
    caption: "",
    category: "moments",
  },
  {
    src: Diplome3,
    alt: "",
    caption: "",
    category: "certificats",
  },
  {
    src: momentFort2,
    alt: "",
    caption: "",
    category: "moments",
  },
  {
    src: momentFort3,
    alt: "",
    caption: "",
    category: "moments",
  },
  {
    src: momentFort4,
    alt: "",
    caption: "",
    category: "moments",
  },
];

const ceremonyPhotos =
  galleryPhotos.length > 0 ? galleryPhotos : fallbackPhotos;

const INITIAL_VISIBLE = 12;

/* ------------------------------------------------------------------
 * HOOK : apparition au scroll
 * ------------------------------------------------------------------ */

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return mounted;
}

/* ------------------------------------------------------------------
 * CARROUSEL (inchangé, utilisé pour la carte Soudure)
 * ------------------------------------------------------------------ */

function ImageCarousel({ images, heightClassName, label }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <div
      className={`group relative overflow-hidden bg-[#1c3441] ${heightClassName}`}
      role="region"
      aria-roledescription="carrousel"
      aria-label={label ?? "Galerie de photos"}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((image) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="h-full w-full flex-none object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ))}
      </div>

      {label && (
        <span className="absolute left-5 top-5 rounded-full bg-[#0b1722]/85 px-4 py-2 text-xs font-semibold text-white">
          {label}
        </span>
      )}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Afficher la photo précédente"
            className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#0b1722]/75 text-white transition-colors hover:bg-[#37c77b] focus:outline-none focus:ring-2 focus:ring-white"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={showNext}
            aria-label="Afficher la photo suivante"
            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#0b1722]/75 text-white transition-colors hover:bg-[#37c77b] focus:outline-none focus:ring-2 focus:ring-white"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>

          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Afficher la photo ${index + 1}`}
                aria-current={activeIndex === index}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  activeIndex === index
                    ? "scale-110 bg-[#37c77b]"
                    : "bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
 * VIGNETTE ANIMÉE
 * ------------------------------------------------------------------ */

type GalleryTileProps = {
  photo: GalleryPhoto;
  index: number;
  inView: boolean;
  onOpen: () => void;
};

function GalleryTile({ photo, index, inView, onOpen }: GalleryTileProps) {
  const mounted = useMounted();
  const [loaded, setLoaded] = useState(false);
  const visible = mounted && inView;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Agrandir la photo : ${photo.alt || photo.caption}`}
      className={`group relative mb-2 block w-full cursor-zoom-in break-inside-avoid overflow-hidden bg-[#142431] text-left transition-all duration-700 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#37c77b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08131d] motion-reduce:transform-none motion-reduce:transition-none sm:mb-3 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      } ${loaded ? "" : "aspect-4/3"}`}
      style={{
        transitionDelay: visible
          ? `${(index % INITIAL_VISIBLE) * 60}ms`
          : "0ms",
      }}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className="block h-auto w-full transition-transform duration-900 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04] motion-reduce:transition-none"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#08131d]/90 via-[#08131d]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
      />

      <span className="pointer-events-none absolute inset-x-4 bottom-4 flex translate-y-2 items-end justify-between gap-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        <span className="text-sm leading-snug text-[#f4f3ef]">
          {photo.caption}
        </span>
        <Maximize2
          size={18}
          aria-hidden="true"
          className="shrink-0 text-[#37c77b]"
        />
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------
 * LIGHTBOX (agrandissement au clic)
 * ------------------------------------------------------------------ */

type LightboxProps = {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

function LightboxImage({ photo }: { photo: GalleryPhoto }) {
  const mounted = useMounted();

  return (
    <img
      src={photo.src}
      alt={photo.alt}
      className={`max-h-[70vh] max-w-full object-contain shadow-[0_30px_80px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out motion-reduce:transition-none ${
        mounted ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"
      }`}
    />
  );
}

function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const total = photos.length;
  const photo = photos[index];
  const mounted = useMounted();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const activeThumbRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const showPrevious = useCallback(
    () => onNavigate((index - 1 + total) % total),
    [index, total, onNavigate],
  );
  const showNext = useCallback(
    () => onNavigate((index + 1) % total),
    [index, total, onNavigate],
  );

  // Focus, blocage du scroll de la page et restauration à la fermeture.
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  // Clavier : Échap, flèches gauche / droite.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, showPrevious, showNext]);

  // Garde la miniature active visible dans la bande.
  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [index]);

  if (!photo) return null;

  // Rendu directement dans <body> : le conteneur de la section utilise
  // "-translate-x-1/2", ce qui empêche un "fixed" de couvrir l'écran.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo agrandie"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 50) {
          if (delta > 0) showPrevious();
          else showNext();
        }
        touchStartX.current = null;
      }}
      className={`fixed inset-0 z-100 flex flex-col bg-[#040a10]/95 p-4 backdrop-blur-sm transition-opacity duration-300 sm:p-6 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold tracking-[0.12em] text-[#aab5bf]">
          {index + 1} / {total}
        </p>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer la galerie"
          className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-[#f4f3ef] transition-colors hover:bg-[#37c77b] hover:text-[#08131d] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center gap-3 py-4 sm:gap-6">
        <button
          type="button"
          onClick={showPrevious}
          aria-label="Photo précédente"
          className="hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 text-[#f4f3ef] transition-colors hover:bg-[#37c77b] hover:text-[#08131d] focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:grid"
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>

        <figure className="m-0 flex min-w-0 max-w-275 flex-col items-center gap-4">
          <LightboxImage key={photo.src} photo={photo} />
          <figcaption className="max-w-160 text-center text-[15px] leading-relaxed text-[#c3ccd4]">
            {photo.caption}
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={showNext}
          aria-label="Photo suivante"
          className="hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 text-[#f4f3ef] transition-colors hover:bg-[#37c77b] hover:text-[#08131d] focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:grid"
        >
          <ChevronRight size={22} aria-hidden="true" />
        </button>
      </div>

      <div className="mx-auto flex max-w-full gap-2 overflow-x-auto pb-1">
        {photos.map((thumb, thumbIndex) => {
          const isActive = thumbIndex === index;
          return (
            <button
              key={`${thumb.src}-${thumbIndex}`}
              ref={isActive ? activeThumbRef : undefined}
              type="button"
              onClick={() => onNavigate(thumbIndex)}
              aria-label={`Afficher la photo ${thumbIndex + 1}`}
              aria-current={isActive}
              className={`h-12 w-16 shrink-0 overflow-hidden rounded border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                isActive
                  ? "border-[#37c77b] opacity-100"
                  : "border-transparent opacity-50 hover:opacity-90"
              }`}
            >
              <img
                src={thumb.src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>,
    document.body,
  );
}

/* ------------------------------------------------------------------
 * GALERIE
 * ------------------------------------------------------------------ */

function CeremonyGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [gridRef, inView] = useInView<HTMLDivElement>();

  const categories = useMemo(
    () =>
      (Object.keys(CATEGORY_LABELS) as Category[]).filter((category) =>
        photos.some((photo) => photo.category === category),
      ),
    [photos],
  );

  const filteredPhotos = useMemo(
    () =>
      filter === "all"
        ? photos
        : photos.filter((photo) => photo.category === filter),
    [photos, filter],
  );

  const visiblePhotos = expanded
    ? filteredPhotos
    : filteredPhotos.slice(0, INITIAL_VISIBLE);
  const hasMore = filteredPhotos.length > INITIAL_VISIBLE;

  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  const filterOptions: { id: Category | "all"; label: string }[] = [
    { id: "all", label: "Toutes" },
    ...categories.map((category) => ({
      id: category,
      label: CATEGORY_LABELS[category],
    })),
  ];

  return (
    <div id="galerie" className="relative">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.24em] text-[#37c77b]">
            Galerie
          </p>
          <h3 className="font-serif text-3xl font-normal leading-tight tracking-[-0.03em] sm:text-[2.5rem]">
            La cérémonie en images
          </h3>
        </div>

        {categories.length > 1 && (
          <div
            role="group"
            aria-label="Filtrer les photos"
            className="flex flex-wrap gap-2"
          >
            {filterOptions.map((option) => {
              const isActive = filter === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setFilter(option.id);
                    setExpanded(false);
                  }}
                  aria-pressed={isActive}
                  className={`min-h-11 rounded-full border px-4.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    isActive
                      ? "border-[#37c77b] bg-[#37c77b] text-[#08131d]"
                      : "border-white/20 bg-transparent text-[#ddd9d1] hover:border-[#37c77b]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div
        ref={gridRef}
        key={filter}
        className="columns-2 gap-2 sm:columns-3 sm:gap-3 lg:columns-4"
      >
        {visiblePhotos.map((photo, index) => (
          <GalleryTile
            key={`${photo.src}-${index}`}
            photo={photo}
            index={index}
            inView={inView}
            onOpen={() => setOpenIndex(index)}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-white/20 px-7 text-[15px] font-semibold text-[#f4f3ef] transition-colors hover:border-[#37c77b] hover:bg-[#37c77b] hover:text-[#08131d] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {expanded
              ? "Afficher moins"
              : `Voir les ${filteredPhotos.length} photos`}
            <ChevronDown
              size={18}
              aria-hidden="true"
              className={`transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      )}

      {openIndex !== null && (
        <Lightbox
          photos={filteredPhotos}
          index={openIndex}
          onClose={closeLightbox}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
 * SECTION COMPLÈTE
 * ------------------------------------------------------------------ */

function EpopeeRealisations() {
  const hasCertifiedCount = NB_BENEFICIAIRES_CERTIFIES !== null;

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#0b1722] text-[#f4f3ef]">
      {/* 1. FIN DE FORMATION */}
      <section
        id="fin-de-formation"
        aria-labelledby="epopee-fin-title"
        className="border-b border-white/8"
      >
        <div className="mx-auto grid w-full max-w-330 grid-cols-1 items-end gap-12 px-4 pb-20 pt-22 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-24 lg:pt-30">
          <div>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-[#37c77b]">
              Épopée · Fin de formation
            </p>
            <h2
              id="epopee-fin-title"
              className="font-serif text-[clamp(2.9rem,6.4vw,6rem)] font-normal leading-none tracking-[-0.045em]"
            >
              Trois mois d’apprentissage.{" "}
              <span className="italic text-[#37c77b]">Un métier en main.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            <p className="max-w-130 text-base leading-[1.75] text-[#aab5bf] sm:text-lg">
              Soutenue par l’Ambassade de France au Sénégal, l’Épopée a formé
              des jeunes à des métiers porteurs et à la relation client. Retour
              sur les parcours et sur la cérémonie qui les a célébrés.
            </p>

            <dl
              className={`grid border-t border-white/16 ${
                hasCertifiedCount ? "grid-cols-3" : "grid-cols-2"
              }`}
            >
              <div className="flex flex-col-reverse pr-4 pt-5">
                <dt className="mt-2 text-[13px] text-[#aab5bf]">
                  mois de formation
                </dt>
                <dd className="font-serif text-[2.75rem] leading-none">3</dd>
              </div>
              <div className="flex flex-col-reverse border-l border-white/16 px-4 pt-5">
                <dt className="mt-2 text-[13px] text-[#aab5bf]">
                  parcours complémentaires
                </dt>
                <dd className="font-serif text-[2.75rem] leading-none">2</dd>
              </div>
              {hasCertifiedCount && (
                <div className="flex flex-col-reverse border-l border-white/16 pl-4 pt-5">
                  <dt className="mt-2 text-[13px] text-[#aab5bf]">
                    bénéficiaires certifiés
                  </dt>
                  <dd className="font-serif text-[2.75rem] leading-none text-[#e2b04a]">
                    {NB_BENEFICIAIRES_CERTIFIES}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </section>

      {/* 2. LA FORMATION EN ACTION */}
      <section
        id="realisations"
        aria-labelledby="epopee-training-title"
        className="py-18 lg:py-28"
      >
        <div className="mx-auto w-full max-w-330 px-4 sm:px-6 lg:px-8">
          <header className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-14">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#37c77b]">
                Nos réalisations
              </p>
              <h2
                id="epopee-training-title"
                className="font-serif text-[clamp(2.6rem,5vw,4.4rem)] font-normal leading-[1.04] tracking-[-0.045em]"
              >
                La formation en action
              </h2>
            </div>

            <p className="max-w-105 text-base leading-[1.75] text-[#aab5bf] sm:text-[17px]">
              Des parcours concrets pour développer les compétences locales et
              renforcer l’autonomie professionnelle.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Parcours principal */}
            <article className="grid min-w-0 grid-cols-1 overflow-hidden bg-[#142431] md:grid-cols-2 lg:col-span-2">
              <ImageCarousel
                images={weldingImages}
                label="01 · Formation technique"
                heightClassName="h-65 sm:h-[340px] md:h-full md:min-h-[440px]"
              />

              <div className="flex flex-col gap-4.5 p-7 sm:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#37c77b]">
                  Parcours de 3 mois
                </p>
                <h3 className="font-serif text-[2rem] font-normal leading-[1.1] tracking-[-0.02em] sm:text-4xl">
                  Soudure et maintenance industrielle
                </h3>
                <p className="text-base leading-[1.75] text-[#aab5bf]">
                  Une formation financée par l’Ambassade de France au Sénégal
                  pour acquérir des savoir-faire pratiques dans des métiers
                  porteurs.
                </p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-3">
                  {[
                    "Gestes techniques",
                    "Sécurité en atelier",
                    "Maintenance",
                  ].map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-white/18 px-3 py-1.75 text-[13px] text-[#ddd9d1]"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* Parcours complémentaire */}
            <article className="flex min-w-0 flex-col overflow-hidden bg-[#142431]">
              <div className="relative h-65 overflow-hidden bg-[#1c3441]">
                <img
                  src={communicationImage}
                  alt="Des participants échangent pendant une activité de formation"
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                />
                <span className="absolute left-5 top-5 rounded-full bg-[#0b1722]/85 px-4 py-2 text-xs font-semibold text-white">
                  02 · Savoir-être
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-7 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#37c77b]">
                  Compétences transversales
                </p>
                <h3 className="font-serif text-[1.875rem] font-normal leading-[1.12] tracking-[-0.02em]">
                  Communication et relation client
                </h3>
                <p className="text-base leading-[1.75] text-[#aab5bf]">
                  Un second parcours consacré à la posture professionnelle, à la
                  communication et à la qualité de la relation client.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 3. CÉRÉMONIE DE CLÔTURE + 4. GALERIE (fond photo sombre conservé) */}
      <section
        id="ceremonie-cloture"
        aria-labelledby="epopee-closing-title"
        className="relative overflow-hidden bg-[#08131d]"
      >
        <img
          src={ceremony2}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_30%] opacity-20 blur-[2px] grayscale-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#08131d] from-30% via-[#08131d]/80 to-[#08131d]/60"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-[#08131d] to-transparent"
        />

        <div className="relative mx-auto grid w-full max-w-330 grid-cols-1 items-center gap-12 px-4 py-22 sm:px-6 lg:grid-cols-2 lg:gap-[clamp(48px,6vw,72px)] lg:px-8 lg:py-32">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#37c77b]">
              Cérémonie de clôture
            </p>

            <h2
              id="epopee-closing-title"
              className="max-w-140 font-serif text-[clamp(2.6rem,4.8vw,4.4rem)] font-normal leading-[1.04] tracking-[-0.045em]"
            >
              Des compétences reconnues, des parcours valorisés.
            </h2>

            <p className="mt-7 max-w-130 text-base leading-[1.75] text-[#c3ccd4] sm:text-lg">
              À l’issue de la formation, les bénéficiaires ont reçu leur
              certificat en présence de Mme Christine Fages, ambassadrice de
              France au Sénégal.
            </p>
          </div>

          <figure className="m-0 border border-white/10 bg-[#142431]/70 p-8 backdrop-blur-sm sm:p-11">
            <svg
              width="36"
              height="28"
              viewBox="0 0 36 28"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 26V16C2 8 6 3 14 2M20 26V16c0-8 4-13 12-14"
                stroke="#e2b04a"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
            <blockquote className="mt-5 font-serif text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.35] text-[#f4f3ef]">
              Chaque certificat marque l’aboutissement d’un apprentissage et le
              début d’une nouvelle étape professionnelle.
            </blockquote>
            {AUTEUR_CITATION && (
              <figcaption className="mt-6 border-t border-white/14 pt-5 text-sm text-[#aab5bf]">
                {AUTEUR_CITATION}
              </figcaption>
            )}
          </figure>
        </div>

        <div className="relative mx-auto w-full max-w-330 px-4 pb-[clamp(88px,12vw,140px)] sm:px-6 lg:px-8">
          <CeremonyGallery photos={ceremonyPhotos} />
        </div>
      </section>
    </div>
  );
}

export default EpopeeRealisations;
