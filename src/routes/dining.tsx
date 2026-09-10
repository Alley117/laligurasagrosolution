import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { EditableImage } from "@/components/site/EditableImage";
import { useSiteImage } from "@/hooks/useSiteImage";

export const Route = createFileRoute("/dining")({
  head: () => ({
    meta: [
      { title: "Dining & Menu — Laligurans Agro Solutions" },
      { name: "description", content: "Home-style Nepali thali, tandoori chicken, tikka and grilled skewers — cooked with vegetables from our own farm wherever possible." },
      { property: "og:title", content: "Dining at Laligurans — Farm-to-table Nepali cooking" },
      { property: "og:description", content: "Thali, tandoori, and grilled skewers, served from the garden." },
    ],
  }),
  component: Dining,
});

const MENU: { name: string; body: string; tag: string; imgKey?: string }[] = [
  { name: "Nepali Thali — Dal Bhat Set", body: "Steamed rice, seasonal dal, saag, tarkari (vegetable curry), homemade achar, and papad. Vegetables straight from the farm.", tag: "Signature", imgKey: "dining.menu.thali" },
  { name: "Tandoori Whole Chicken", body: "Marinated overnight in yoghurt and hill spices, then cooked whole until the edges just char.", tag: "Sharing plate", imgKey: "dining.menu.grill" },
  { name: "Chicken Tikka & Wings", body: "Served with a bright mint-lemon dip and a small pickled onion-carrot salad on the side.", tag: "Small plate" },
  { name: "Grilled Meat Skewers", body: "Cooked over open flame, with a crunchy onion-carrot salad tossed in lime and coriander.", tag: "From the grill" },
];

function Dining() {
  const heroImg = useSiteImage("dining.hero");
  return (
    <>
      <PageHero
        eyebrow="What's on the table"
        title="Cooked from the garden, a few steps away."
        subtitle="Our kitchen leans on the farm. What's in season is what's on the plate — served generously, the way we eat at home."
        image={heroImg}
      />

      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <span className="eyebrow">Farm-to-table</span>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Most of it grew here.</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Greens for the saag, tomatoes for the achar, herbs for the marinades — most of what our kitchen uses comes from the beds right outside. What we don't grow, we source from farms and producers around Bangi.
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Tell us in advance about dietary needs — vegetarian, no onion & garlic, spice level — and we'll cook to suit.
              </p>
            </div>
            <EditableImage imgKey="dining.farm" alt="Farm garden" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl" />
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary/60 section-light">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <span className="eyebrow">The menu</span>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">A few things we cook well.</h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {MENU.map((m) => (
              <article key={m.name} className="group overflow-hidden rounded-3xl border border-border bg-card">
                {m.imgKey && (
                  <div className="overflow-hidden">
                    <EditableImage
                      imgKey={m.imgKey}
                      alt={m.name}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="text-xs font-semibold uppercase tracking-widest text-accent">{m.tag}</div>
                  <h3 className="mt-2 font-display text-2xl font-bold">{m.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-border bg-card p-8 text-center">
            <h3 className="font-display text-2xl font-bold">Want a specific meal for your stay?</h3>
            <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
              Let us know a day or two ahead and the kitchen will plan around it.
            </p>
            <div className="mt-5">
              <Link to="/contact" className="btn-primary">Contact the kitchen</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
