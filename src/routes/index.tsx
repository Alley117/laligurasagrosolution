import { createFileRoute, Link } from "@tanstack/react-router";
import { EditableImage } from "@/components/site/EditableImage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Laligurans Agro Solutions — Hillside Cottages in Arghakhanchi, Nepal" },
      { name: "description", content: "Stay in wooden cottages on a working farm in Malarani-5, Bangi. Farm-to-table meals, bonfires, and terraced hillside views." },
    ],
  }),
  component: Home,
});

const QUICK_NAV = [
  { to: "/cottages", label: "Cottages", imgKey: "home.nav.cottages" },
  { to: "/facilities", label: "Facilities", imgKey: "home.nav.facilities" },
  { to: "/dining", label: "Dining", imgKey: "home.nav.dining" },
  { to: "/gallery", label: "Gallery", imgKey: "home.nav.gallery" },
  { to: "/contact", label: "Contact", imgKey: "home.nav.contact" },
] as const;

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <EditableImage
          imgKey="home.hero"
          alt="Hillside cottages at Laligurans Agro Solutions at golden hour"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/50 via-forest-deep/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-24">
          <div className="max-w-3xl text-cream">
            <span className="eyebrow !text-cream/85">Malarani-5 · Bangi · Arghakhanchi</span>
            <h1 className="mt-4 text-5xl font-bold leading-[1] md:text-7xl lg:text-8xl">
              Where the hills<br />
              <span className="italic text-accent">breathe slower.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-cream/85 md:text-lg">
              Wooden cottages tucked into terraced farmland. Meals cooked from
              the garden outside your door. Evenings by the bonfire under a
              blanket of Himalayan stars.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Book your stay</Link>
              <Link to="/cottages" className="btn-ghost !text-cream !border-cream/40 hover:!bg-cream/10">
                See the cottages
              </Link>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/60">
          <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
            Scroll
            <span className="h-8 w-px bg-cream/40 animate-pulse" />
          </div>
        </div>
      </section>

      {/* QUICK NAV STRIP */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <span className="eyebrow">The resort at a glance</span>
              <h2 className="mt-3 text-3xl font-bold md:text-5xl">
                A quiet corner of the mid-hills, made to stay a while.
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground">
              Everything you need for a slow weekend — cottages, a working
              vegetable farm, hearty Nepali meals, and evenings that end by the fire.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">
            {QUICK_NAV.map((q) => (
              <Link
                key={q.to}
                to={q.to}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
              >
                <EditableImage
                  imgKey={q.imgKey}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="text-xs uppercase tracking-widest text-cream/70">Explore</div>
                  <div className="mt-1 font-display text-xl font-bold text-cream">{q.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STORY / FARM */}
      <section className="section-pad bg-secondary/60">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 md:items-center md:px-8">
          <div className="relative">
            <EditableImage
              imgKey="home.farm"
              alt="Working vegetable garden with hillside terraces"
              loading="lazy"
              width={1400}
              height={1000}
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-4 hidden max-w-[220px] rounded-2xl bg-background p-5 shadow-xl md:block">
              <div className="text-3xl font-bold text-accent font-display">Farm-to-table</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Most of what lands on your plate was picked that morning, a few steps away.
              </p>
            </div>
          </div>
          <div>
            <span className="eyebrow">Our story</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">
              A working farm that opened its gate to guests.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Laligurans Agro Solutions began as a hillside farm above Bangi, growing
              seasonal vegetables, greens, and fruit along Arghakhanchi's terraced
              slopes. Over time, a handful of wooden cottages went up along the
              garden paths — small, quiet places for travellers to slow down and eat
              what the land gives.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Today, it is still very much a farm first. The chickens, the vegetable
              beds, and the flower gardens are part of every stay.
            </p>
            <div className="mt-8">
              <Link to="/about" className="btn-ghost">Read our story →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* EVENING CTA */}
      <section className="relative section-pad overflow-hidden">
        <EditableImage
          imgKey="home.bonfire"
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-forest-deep/70" />
        <div className="relative mx-auto max-w-3xl px-5 text-center text-cream md:px-8">
          <span className="eyebrow !text-cream/80">Evenings at Laligurans</span>
          <h2 className="mt-4 text-4xl font-bold md:text-6xl">
            Fire, flags, and the quiet of the hills.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-cream/85">
            When the sun drops behind the ridge, the lanterns come on and the
            bonfire is lit. Bring a cup of tea and stay a while.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">Book Now</Link>
            <Link to="/gallery" className="btn-ghost !text-cream !border-cream/40 hover:!bg-cream/10">
              See the gallery
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
