import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import swing from "@/assets/facilities-swing.jpg";
import bonfire from "@/assets/bonfire-evening.jpg";
import farm from "@/assets/farm-garden.jpg";
import lights from "@/assets/ambience-lights.jpg";

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title: "Facilities & Amenities — Laligurans Agro Solutions" },
      { name: "description", content: "Working vegetable farm, bonfire area, garden swings, flower gardens, colourful ambient lighting, and on-site parking." },
      { property: "og:title", content: "Facilities at Laligurans" },
      { property: "og:description", content: "Farm walks, bonfires, garden swings, and warm evening light." },
    ],
  }),
  component: Facilities,
});

const ITEMS = [
  { title: "Working vegetable garden", body: "Walk through the beds — greens, tomatoes, herbs, and whatever is in season. Most of it ends up on your plate.", img: farm, size: "md:col-span-2 md:row-span-2" },
  { title: "Evening bonfire", body: "Lit most evenings. Bring your tea, pull up a stool.", img: bonfire, size: "md:col-span-2" },
  { title: "Garden swings & outdoor seating", body: "Tucked under bougainvillea and lanterns.", img: swing, size: "" },
  { title: "Ambient lighting at night", body: "Colourful lanterns and string lights across the grounds.", img: lights, size: "" },
];

const EXTRAS = [
  "Flower gardens — bougainvillea, chrysanthemum, marigold and more",
  "On-site parking",
  "Prayer flags & string lights along garden paths",
  "Farm walks with a member of the team on request",
  "Shared outdoor dining area",
  "Filtered drinking water",
];

function Facilities() {
  return (
    <>
      <PageHero
        eyebrow="On the grounds"
        title="Small things that make the stay."
        subtitle="A working farm to walk through by day. Swings, gardens, and warm lights by evening. A fire circle when night comes down."
        image={swing}
      />

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-4 md:grid-cols-4 md:auto-rows-[240px]">
            {ITEMS.map((it) => (
              <div
                key={it.title}
                className={`group relative overflow-hidden rounded-3xl ${it.size}`}
              >
                <img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                  <h3 className="font-display text-xl font-bold md:text-2xl">{it.title}</h3>
                  <p className="mt-1 max-w-md text-sm text-cream/80">{it.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary/60">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <span className="eyebrow">Also on site</span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Little comforts around the property.</h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {EXTRAS.map((e) => (
              <li key={e} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <span className="text-sm text-foreground/85">{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
