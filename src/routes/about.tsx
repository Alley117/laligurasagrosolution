import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { EditableImage } from "@/components/site/EditableImage";
import { useSiteImage } from "@/hooks/useSiteImage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Laligurans Agro Solutions" },
      { name: "description", content: "A working agro-farm and cottage stay above Bangi, Arghakhanchi — built around seasonal food, sustainable hospitality, and the mid-hills of Nepal." },
      { property: "og:title", content: "Our Story — Laligurans Agro Solutions" },
      { property: "og:description", content: "A working agro-farm and cottage stay in the mid-hills of Nepal." },
    ],
  }),
  component: About,
});

const VALUES = [
  { t: "A farm first", d: "The vegetable beds, fruit trees, and flower gardens are worked year-round. Guests are welcome to walk through them." },
  { t: "Farm-to-table meals", d: "What we serve is guided by the season and what the garden gives that week. Simple, generous, home-style Nepali cooking." },
  { t: "Rooted in place", d: "Built and run by people from Malarani, with local materials and local staff. Your stay supports the village around us." },
  { t: "Slow by design", d: "No packed schedules. Long walks, garden swings, tea on the porch, and evenings by the fire." },
];

function About() {
  const heroImg = useSiteImage("about.hero");
  return (
    <>
      <PageHero
        eyebrow="About the resort"
        title="A hillside farm that opened its gate."
        subtitle="Laligurans Agro Solutions is a working agro-farm and small cottage stay above Bangi in Arghakhanchi — the kind of place you come to eat well, sleep deeply, and remember what quiet sounds like."
        image={heroImg}
      />

      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-5 md:px-8">
          <div className="md:col-span-3">
            <span className="eyebrow">Our story</span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Grown from the hillside up.</h2>
            <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
              <p>Long before it was a resort, this land was a farm — terraced plots of seasonal vegetables, a few fruit trees, and flower beds trailing down the slope. Coming from Malarani, the family who runs it wanted a way to share the hillside with travellers without losing what made it feel like home.</p>
              <p>The first cottages went up along the garden paths, small and wooden, with red roofs and porches facing out toward the ridges. Little by little the resort grew — string lights, prayer flags, a bonfire circle, garden swings under the bougainvillea — but the farm always stayed at the center.</p>
              <p>Today, most of what we serve comes from the garden a few steps from the kitchen. Guests walk between the beds in the morning with a cup of tea and, if they're lucky, spot a pheasant stepping out of the treeline at the edge of the property.</p>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="grid gap-4">
              <EditableImage imgKey="about.cottage" alt="A wooden cottage at Laligurans" loading="lazy" className="w-full rounded-2xl object-cover aspect-[4/5]" />
              <EditableImage imgKey="about.thali" alt="Nepali thali served on a brass plate" loading="lazy" className="w-full rounded-2xl object-cover aspect-[4/3]" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-secondary/60">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-2xl">
            <span className="eyebrow">What we believe</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">Small, seasonal, honest hospitality.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {VALUES.map((v, i) => (
              <div key={v.t} className="rounded-3xl border border-border bg-card p-8">
                <div className="font-display text-4xl font-bold text-accent">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-4 text-xl font-bold">{v.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link to="/cottages" className="btn-primary">See the cottages</Link>
            <Link to="/dining" className="btn-ghost">Explore the menu</Link>
          </div>
        </div>
      </section>
    </>
  );
}
