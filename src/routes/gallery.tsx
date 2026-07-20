import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/hero-hillside.jpg";
import bonfire from "@/assets/bonfire-evening.jpg";
import c1 from "@/assets/cottage-1.jpg";
import c2 from "@/assets/cottage-2.jpg";
import c3 from "@/assets/cottage-3.jpg";
import thali from "@/assets/dining-thali.jpg";
import grill from "@/assets/dining-grill.jpg";
import farm from "@/assets/farm-garden.jpg";
import swing from "@/assets/facilities-swing.jpg";
import lights from "@/assets/ambience-lights.jpg";
import hills from "@/assets/location-hills.jpg";
import pheasant from "@/assets/wildlife-pheasant.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Laligurans Agro Solutions" },
      { name: "description", content: "Scenery, cottages, dining, evening ambience, and the farm & garden at Laligurans Agro Solutions in Arghakhanchi." },
      { property: "og:title", content: "Gallery — Laligurans Agro Solutions" },
      { property: "og:description", content: "Photos from around the resort — hillside views, wooden cottages, evening lights, and the farm." },
    ],
  }),
  component: Gallery,
});

type Cat = "All" | "Scenery" | "Cottages" | "Dining" | "Evening" | "Farm";

const PHOTOS: { src: string; cat: Exclude<Cat, "All">; alt: string }[] = [
  { src: hero, cat: "Scenery", alt: "Hillside cottages at golden hour" },
  { src: hills, cat: "Scenery", alt: "Green terraced hills of Arghakhanchi" },
  { src: pheasant, cat: "Scenery", alt: "Pheasant spotted on the grounds" },
  { src: c1, cat: "Cottages", alt: "Cottage 1 exterior with bougainvillea" },
  { src: c2, cat: "Cottages", alt: "Cottage with ridge view" },
  { src: c3, cat: "Cottages", alt: "Wooden cottage interior" },
  { src: thali, cat: "Dining", alt: "Nepali thali served on a brass plate" },
  { src: grill, cat: "Dining", alt: "Tandoori chicken, tikka and grilled skewers" },
  { src: bonfire, cat: "Evening", alt: "Evening bonfire with prayer flags" },
  { src: lights, cat: "Evening", alt: "Colourful lanterns lighting the garden path" },
  { src: swing, cat: "Evening", alt: "Garden swing under lanterns" },
  { src: farm, cat: "Farm", alt: "Working vegetable garden with terraces" },
];

const CATS: Cat[] = ["All", "Scenery", "Cottages", "Dining", "Evening", "Farm"];

function Gallery() {
  const [cat, setCat] = useState<Cat>("All");
  const [open, setOpen] = useState<number | null>(null);
  const filtered = useMemo(
    () => (cat === "All" ? PHOTOS : PHOTOS.filter((p) => p.cat === cat)),
    [cat]
  );

  return (
    <>
      <PageHero
        eyebrow="A walk through the resort"
        title="In photographs."
        subtitle="Scenery, cottages, dining, evening ambience, and the farm. Tap any image to open it."
        image={lights}
      />

      <section className="pt-6 pb-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  cat === c
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-card text-foreground/70 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p, i) => (
              <button
                key={p.src + i}
                onClick={() => setOpen(i)}
                className={`group relative overflow-hidden rounded-2xl ${
                  i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                }`}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-forest-deep/0 transition group-hover:bg-forest-deep/25" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {open !== null && filtered[open] && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-forest-deep/90 p-4 backdrop-blur-sm"
        >
          <button
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"
            aria-label="Close"
            onClick={() => setOpen(null)}
          >
            ✕
          </button>
          <img
            src={filtered[open].src}
            alt={filtered[open].alt}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
