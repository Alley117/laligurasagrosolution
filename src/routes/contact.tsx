import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import bonfire from "@/assets/bonfire-evening.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Booking — Laligurans Agro Solutions" },
      { name: "description", content: "Send us a booking inquiry, call, or write. Malarani-5, Bangi, Arghakhanchi, Nepal." },
      { property: "og:title", content: "Contact & Booking — Laligurans" },
      { property: "og:description", content: "Book a cottage or ask us anything about your stay." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Come stay with us."
        subtitle="Send an inquiry below, or reach out directly. We usually reply within a day."
        image={bonfire}
      />

      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-5 md:px-8">
          <aside className="md:col-span-2 space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-accent">Reach us</div>
              <ul className="mt-4 space-y-4 text-sm">
                <li>
                  <div className="text-muted-foreground">Phone</div>
                  <a href="tel:+9779800000000" className="font-medium text-foreground hover:text-accent">
                    +977 98-0000-0000
                  </a>
                </li>
                <li>
                  <div className="text-muted-foreground">Email</div>
                  <a href="mailto:hello@laligurans.example" className="font-medium text-foreground hover:text-accent">
                    hello@laligurans.example
                  </a>
                </li>
                <li>
                  <div className="text-muted-foreground">Address</div>
                  <p className="font-medium text-foreground">
                    Malarani-5, Bangi<br />
                    Arghakhanchi, Lumbini Province, Nepal
                  </p>
                  <a
                    href="https://maps.app.goo.gl/3bZst6WvjZioSvXs6"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-sm font-medium text-accent hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </li>
                <li>
                  <div className="text-muted-foreground">Follow along</div>
                  <div className="mt-1 flex gap-2">
                    {["Facebook", "Instagram", "TikTok"].map((s) => (
                      <a
                        key={s}
                        href="#"
                        className="rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:border-accent hover:text-accent"
                      >
                        {s}
                      </a>
                    ))}
                  </div>
                </li>
              </ul>
            </div>

            <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-border">
              <iframe
                title="Laligurans on Google Maps"
                src="https://www.google.com/maps?q=Malarani-5,Bangi,Arghakhanchi,Nepal&output=embed"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </aside>

          <div className="md:col-span-3">
            <div className="rounded-3xl border border-border bg-card p-6 md:p-10">
              <div className="text-xs font-semibold uppercase tracking-widest text-accent">
                Booking inquiry
              </div>
              <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
                Tell us about your stay.
              </h2>

              {sent ? (
                <div className="mt-8 rounded-2xl bg-primary/10 p-6 text-primary">
                  <h3 className="font-display text-xl font-bold">Thank you!</h3>
                  <p className="mt-2 text-sm text-foreground/80">
                    Your message has been noted. We'll get back to you within a day
                    with availability and next steps.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="mt-6 grid gap-4"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Your name" required>
                      <input required type="text" className="input" placeholder="Full name" />
                    </Field>
                    <Field label="Email" required>
                      <input required type="email" className="input" placeholder="you@example.com" />
                    </Field>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Phone">
                      <input type="tel" className="input" placeholder="+977…" />
                    </Field>
                    <Field label="Guests">
                      <input type="number" min={1} defaultValue={2} className="input" />
                    </Field>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Check-in">
                      <input type="date" className="input" />
                    </Field>
                    <Field label="Check-out">
                      <input type="date" className="input" />
                    </Field>
                  </div>
                  <Field label="Preferred cottage">
                    <select className="input" defaultValue="">
                      <option value="">No preference</option>
                      <option>Cottage 1 — Laligurans</option>
                      <option>Cottage 2 — Bangi View</option>
                      <option>Cottage 3 — Forest Nook</option>
                    </select>
                  </Field>
                  <Field label="Anything else?">
                    <textarea rows={4} className="input" placeholder="Dietary needs, arrival time, celebrations…" />
                  </Field>
                  <button type="submit" className="btn-primary mt-2 justify-self-start">
                    Send inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--color-border);
          background: var(--color-background);
          padding: 0.7rem 0.9rem;
          font-size: 0.95rem;
          color: var(--color-foreground);
          transition: border-color .15s, box-shadow .15s;
        }
        .input:focus {
          outline: none;
          border-color: var(--color-accent);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-accent) 25%, transparent);
        }
      `}</style>
    </>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}
