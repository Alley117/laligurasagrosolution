import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { FloatingContact } from "@/components/site/FloatingContact";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This trail doesn't lead anywhere. Let's get you back to the resort.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary">Go home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Please try again or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary">
            Try again
          </button>
          <a href="/" className="btn-ghost">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Laligurans Agro Solutions — Hillside Resort & Cottages in Arghakhanchi" },
      { name: "description", content: "A working agro-farm and cottage stay in Malarani-5, Bangi, Arghakhanchi, Nepal. Wood cottages, farm-to-table food, bonfires under the stars." },
      { name: "author", content: "Laligurans Agro Solutions" },
      { name: "theme-color", content: "#5a2a1a" },
      { property: "og:title", content: "Laligurans Agro Solutions — Hillside Resort & Cottages" },
      { property: "og:description", content: "Cottage stays and farm-to-table dining in the mid-hills of Arghakhanchi, Nepal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/cottages", label: "Cottages" },
  { to: "/facilities", label: "Facilities" },
  { to: "/dining", label: "Dining" },
  { to: "/gallery", label: "Gallery" },
  { to: "/location", label: "Location" },
  { to: "/contact", label: "Contact" },
] as const;

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-background/85 backdrop-blur-md border-b border-border/70"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span
            aria-hidden
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground shadow-lg"
            style={{ boxShadow: "0 6px 16px -6px color-mix(in oklab, var(--color-accent) 60%, transparent)" }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M12 2c-1.5 3 .5 5 .5 7S10 12 10 15c0 3.3 2.7 6 6 6-1-2-1-4 0-6-2.5-1-4-4-4-6 0-3 1-5 0-7z" />
            </svg>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-bold tracking-tight text-foreground">
              Laligurans
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Agro Solutions
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/70 transition hover:text-foreground hover:bg-foreground/5"
              activeProps={{ className: "!text-foreground !bg-foreground/8" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/contact" className="btn-primary !py-2.5 !px-5 text-sm">
            Book Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-border bg-background/70"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground/80 hover:bg-foreground/5"
                activeProps={{ className: "!text-accent !bg-accent/10" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 bg-forest-deep text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <h3 className="font-display text-2xl font-bold">Laligurans Agro Solutions</h3>
          <p className="mt-3 max-w-md text-sm text-cream/70">
            A working agro-farm and cottage stay in the mid-hills of Arghakhanchi.
            Slow mornings, garden-grown meals, bonfires under the stars.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-cream/60">Visit</h4>
          <p className="mt-3 text-sm text-cream/85">
            Malarani-5, Bangi<br />
            Arghakhanchi, Lumbini Province<br />
            Nepal
          </p>
          <a
            href="https://maps.app.goo.gl/3bZst6WvjZioSvXs6"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
          >
            Open in Google Maps →
          </a>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-cream/60">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV.slice(1).map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-cream/85 hover:text-accent">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-cream/55 md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} Laligurans Agro Solutions. All rights reserved.</p>
          <p>
            Handcrafted in the hills of Arghakhanchi. ·{" "}
            <Link to="/admin" className="text-cream/70 hover:text-accent">Manage photos</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
    </QueryClientProvider>
  );
}
