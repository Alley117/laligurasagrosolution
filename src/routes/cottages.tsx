import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { EditableImage } from "@/components/site/EditableImage";
import { useSiteImage } from "@/hooks/useSiteImage";

export const Route = createFileRoute("/cottages")({
  head: () => ({
    meta: [
      { title: "Cottages — Laligurans Agro Solutions" },
      { name: "description", content: "Individually named wooden cottages set along garden paths, with porches, prayer flags, and warm evening lighting." },
      { property: "og:title", content: "Cottages at Laligurans" },
      { property: "og:description", content: "Wooden cottages tucked into the garden. Each with its own porch and view." },
    ],
  }),
  component: Cottages,
});

const COTTAGES = [
  { name: "Cottage 1 — Laligurans", imgKey: "cottages.c1", tag: "Garden porch · 2 guests", body: "A cosy timber cottage on the main garden path, framed by bougainvillea and warm string lights. The porch faces east — perfect for the morning light." },
  { name: "Cottage 2 — Bangi View", imgKey: "cottages.c2", tag: "Ridge view · 2 guests", body: "Set slightly higher on the slope with a wide view across the ridge. Stone base, timber walls, wooden rocking chairs on the porch." },
  { name: "Cottage 3 — Forest Nook", imgKey: "cottages.c3", tag: "Forest side · 2 guests", body: "Tucked closer to the treeline, with a small window seat and locally woven textiles inside. The quietest cottage on the property." },
] as const;

function Cottages() {
  const heroImg = useSiteImage("cottages.hero");
  return (
    <>
      <PageHero
        eyebrow="Where you'll sleep"
        title="Small wooden cottages along the garden path."
        subtitle="Each cottage has its own porch, its own view, and its own name. Prayer flags overhead, string lights in the trees, and the sound of the hills at night."
        image={heroImg}
      />

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="space-y-16 md:space-y-28">
            {COTTAGES.map((c, i) => (
              <article
                key={c.name}
                className={`grid gap-8 md:grid-cols-12 md:gap-12 md:items-center ${
                  i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="md:col-span-7">
                  <div className="relative overflow-hidden rounded-3xl shadow-xl">
                    <EditableImage
                      imgKey={c.imgKey}
                      alt={c.name}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:col-span-5">
                  <div className="text-xs font-semibold uppercase tracking-widest text-accent">{c.tag}</div>
                  <h2 className="mt-3 text-3xl font-bold md:text-4xl">{c.name}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{c.body}</p>
                  <ul className="mt-5 grid gap-2 text-sm">
                    {["Private porch & seating", "Warm bedding & local textiles", "Garden & ridge views", "String lights at night"].map((x) => (
                      <li key={x} className="flex items-center gap-2 text-foreground/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to="/contact" className="btn-primary">Check availability</Link>
                    <Link to="/gallery" className="btn-ghost">More photos</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
