import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { EditableImage } from "@/components/site/EditableImage";
import { useSiteImage } from "@/hooks/useSiteImage";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Location & Climate — Laligurans Agro Solutions" },
      {
        name: "description",
        content:
          "Malarani-5, Bangi, Arghakhanchi, Lumbini Province, Nepal. Mid-hills terrain, monsoon greens, clear winter skies.",
      },
      { property: "og:title", content: "Location & Climate — Laligurans" },
      {
        property: "og:description",
        content: "Where we are and when to visit the mid-hills of Arghakhanchi.",
      },
    ],
  }),
  component: Location,
});

const SEASONS = [
  {
    when: "Oct – Feb",
    title: "Clear winter skies",
    body: "Cool, dry days and the best mountain visibility. Sweaters in the evening, tea by the fire.",
    tone: "from-sky-500/20 to-transparent",
  },
  {
    when: "Mar – May",
    title: "Warm pre-monsoon spring",
    body: "Rhododendrons in bloom on the higher slopes, longer days, and lots of birdsong at dawn.",
    tone: "from-accent/20 to-transparent",
  },
  {
    when: "Jun – Sep",
    title: "Lush green monsoon",
    body: "The hills turn vividly green. Expect showers, dramatic clouds, and quiet, moody days.",
    tone: "from-primary/25 to-transparent",
  },
];

function Location() {
  const heroImg = useSiteImage("location.hero");
  return (
    <>
      <PageHero
        eyebrow="Where we are"
        title="Set into the mid-hills of Arghakhanchi."
        subtitle="Malarani-5, Bangi, Arghakhanchi — Lumbini Province, Nepal. A hillside of terraced farms, forest, and long, layered views."
        image={heroImg}
      />

      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:items-center md:px-8">
          <div>
            <span className="eyebrow">The address</span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Finding us.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We're in Malarani-5, Bangi, in Arghakhanchi district. The terrain around us ranges
              from warm lowland valleys down toward the plains to cooler subtropical slopes higher
              up — you'll feel the shift even on a short walk.
            </p>
            <div className="mt-6 rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Address
              </div>
              <p className="mt-2 font-display text-xl leading-snug">
                Malarani-5, Bangi
                <br />
                Arghakhanchi, Lumbini Province
                <br />
                Nepal
              </p>
              <a
                href="https://maps.app.goo.gl/3bZst6WvjZioSvXs6"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex btn-primary !py-2.5 !px-4 text-sm"
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-xl">
            <iframe
              title="Laligurans location on Google Maps"
              src="https://www.google.com/maps?q=Malarani-5,Bangi,Arghakhanchi,Nepal&output=embed"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary/60 section-light">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-2xl">
            <span className="eyebrow">The climate</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">Three seasons, three moods.</h2>
            <p className="mt-4 text-muted-foreground">
              Best time to visit for clear skies:{" "}
              <strong className="text-foreground">October to April</strong>. Best for the greenest
              scenery: <strong className="text-foreground">June to September</strong>.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {SEASONS.map((s) => (
              <div
                key={s.when}
                className="relative overflow-hidden rounded-3xl border border-border bg-card p-8"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${s.tone}`} />
                <div className="relative">
                  <div className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {s.when}
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 md:items-center md:px-8">
          <EditableImage
            imgKey="location.pheasant"
            alt="A pheasant spotted on the grounds"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
          />
          <div>
            <span className="eyebrow">Around the property</span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Hills, farms, and the occasional pheasant.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The land around Laligurans is a patchwork of terraced fields, pine forest, and
              rhododendron slopes. Wildlife wanders through — pheasants have been spotted on the
              grounds, and mornings often start with the calls of hill birds you won't hear anywhere
              else.
            </p>
            <div className="mt-6">
              <EditableImage
                imgKey="location.farm"
                alt="Vegetable garden"
                loading="lazy"
                className="aspect-[16/9] w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
