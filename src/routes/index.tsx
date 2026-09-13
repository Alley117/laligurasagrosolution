import { createFileRoute, Link } from "@tanstack/react-router";
import { EditableImage } from "@/components/site/EditableImage";
import { useSiteImage } from "@/hooks/useSiteImage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Laligurans Agro Solutions — Hillside Cottages in Arghakhanchi, Nepal" },
      {
        name: "description",
        content:
          "Stay in cozy wooden cottages on a working agro-farm in Malarani-5, Bangi, Arghakhanchi. Enjoy farm-fresh meals, bonfires, hillside views, and nearby Malarani Temple.",
      },
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

const PRODUCE = [
  {
    icon: "🥚",
    title: "Farm-fresh eggs",
    note: "From our own local hens and free-roaming wild hens.",
  },
  {
    icon: "🥛",
    title: "Buffalo milk & curd",
    note: "Milked each morning from our resident buffalo herd.",
  },
  {
    icon: "🐔",
    title: "Chicken & meat",
    note: "Local hens and wild hens raised on-site, no shortcuts.",
  },
  {
    icon: "🥬",
    title: "Seasonal crops",
    note: "Cabbage, mustard greens, potato, chillies — grown right here.",
  },
];

const NEARBY = [
  {
    title: "Malarani Temple",
    distance: "A short drive up the ridge",
    body: "One of Arghakhanchi's most loved pilgrimage sites, perched on the Malarani hilltop with sweeping views across the mid-hills and, on clear days, the Himalayan range to the north. Popular for sunrise visits and festival gatherings.",
  },
  {
    title: "River fishing",
    distance: "Walking distance from the cottages",
    body: "A clear hill river runs close to the property — a favourite spot for local-style fishing (asala and other native fish). We can help arrange rods, a guide, and a packed lunch from the kitchen for a slow day by the water.",
  },
  {
    title: "Terrace walks & viewpoints",
    distance: "Straight out the front gate",
    body: "Meandering paths through terraced farmland, forested ridges, and small villages — perfect for morning walks, birding, and photography.",
  },
];

function Home() {
  const logoSrc = useSiteImage("home.logo");
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <EditableImage
          imgKey="home.hero"
          alt="Hillside cottages at Laligurans Agro Solutions with terraced hills behind"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/60 via-forest-deep/45 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Logo watermark background */}
        <img
          src={logoSrc}
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-[-8%] top-[18%] w-[70vw] max-w-[560px] opacity-15 mix-blend-screen md:right-[6%] md:top-[14%] md:w-[38vw]"
        />

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-24">
          <div className="max-w-3xl text-cream">
            <span className="eyebrow !text-cream/95">Malarani-5 · Bangi · Arghakhanchi</span>
            <h1 className="mt-4 text-5xl font-bold leading-[1] md:text-7xl lg:text-8xl">
              Where the hills
              <br />
              <span className="italic text-accent">breathe slower.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-cream/95 md:text-lg">
              Wooden cottages on a working agro-farm — buffalo, hens, and a full vegetable garden a
              few steps from your door. Meals cooked from what we raise and grow, and evenings by
              the bonfire under Himalayan stars.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Book your stay
              </Link>
              <Link
                to="/cottages"
                className="btn-ghost !text-cream !border-cream/40 hover:!bg-cream/10"
              >
                See the cottages
              </Link>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/95">
          <div className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
            Scroll
            <span className="h-8 w-px bg-cream/70 animate-pulse" />
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
              Cottages, a working farm, hearty Nepali meals cooked from our own produce, and
              evenings that end by the fire.
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
                  <div className="text-xs uppercase tracking-widest text-cream/95">Explore</div>
                  <div className="mt-1 font-display text-xl font-bold text-cream">{q.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STORY / FARM */}
      <section className="section-pad bg-secondary/60 section-light">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 md:items-center md:px-8">
          <div className="relative">
            <EditableImage
              imgKey="home.farm"
              alt="Rows of cabbages growing in front of the resort with the Arghakhanchi hills behind"
              loading="lazy"
              width={1400}
              height={1000}
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-4 hidden max-w-[240px] rounded-2xl bg-background p-5 shadow-xl md:block">
              <div className="text-3xl font-bold text-accent font-display">100% ours</div>
              <p className="mt-1 text-sm text-cream/90">
                Eggs, milk, meat and vegetables — raised and grown on this same hillside, then
                walked into the kitchen.
              </p>
            </div>
          </div>
          <div>
            <span className="eyebrow">Our farm</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">
              We produce almost everything you'll eat here.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Laligurans Agro Solutions is a working farm first. We raise our own
              <strong> buffalo</strong> for milk and curd, keep both
              <strong> local hens and wild hens</strong> for eggs and meat, and grow our own
              seasonal <strong>vegetables and crops</strong> across the terraced fields around the
              cottages.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              What lands on your plate at breakfast or dinner was, more often than not, in the
              garden or the shed that morning.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {PRODUCE.map((p) => (
                <li
                  key={p.title}
                  className="flex items-start gap-3 rounded-2xl border border-cream/20 bg-background p-4 text-cream"
                >
                  <span className="text-2xl leading-none">{p.icon}</span>
                  <div>
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-xs text-cream/90">{p.note}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/about" className="btn-ghost">
                Read our story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEARBY / THINGS TO DO */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-2xl">
            <span className="eyebrow">Around the resort</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">
              Temples, rivers, and quiet hilltop walks.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We sit inside one of Arghakhanchi's most scenic pockets. Guests often plan their days
              around a temple visit, an afternoon by the river, or just a slow walk along the
              terraces.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {NEARBY.map((n) => (
              <div key={n.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-widest text-accent">
                  {n.distance}
                </div>
                <h3 className="mt-2 font-display text-xl font-bold">{n.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{n.body}</p>
              </div>
            ))}
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
        <div className="absolute inset-0 bg-forest-deep/75" />
        <div className="relative mx-auto max-w-3xl px-5 text-center text-cream md:px-8">
          <span className="eyebrow !text-cream/95">Evenings at Laligurans</span>
          <h2 className="mt-4 text-4xl font-bold md:text-6xl">
            Fire, prayer flags, and the quiet of the hills.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-cream/95">
            When the sun drops behind the ridge, the lanterns come on and the bonfire is lit. Bring
            a cup of tea and stay a while.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-primary">
              Book Now
            </Link>
            <a
              href="tel:+9779768843117"
              className="btn-ghost !text-cream !border-cream/40 hover:!bg-cream/10"
            >
              Call 9768843117
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
