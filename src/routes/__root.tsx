import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { FloatingContact } from "@/components/site/FloatingContact";
import { LOGO_URL } from "@/lib/site-images";
import { getSiteActive } from "@/lib/admin-gate.functions";

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
  loader: async () => {
    try {
      return await getSiteActive();
    } catch {
      return { is_active: true };
    }
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Laligurans Agro Solutions — Hillside Cottages in Arghakhanchi, Nepal" },
      { name: "description", content: "Stay in cozy wooden cottages on a working agro-farm in Malarani-5, Bangi, Arghakhanchi. Enjoy farm-fresh meals, bonfires, hillside views, and nearby Malarani Temple." },
      { name: "author", content: "Laligurans Agro Solutions" },
      { name: "theme-color", content: "#091F14" },
      { property: "og:title", content: "Laligurans Agro Solutions — Hillside Cottages in Arghakhanchi, Nepal" },
      { property: "og:description", content: "Stay in cozy wooden cottages on a working agro-farm in Malarani-5, Bangi, Arghakhanchi. Enjoy farm-fresh meals, bonfires, hillside views, and nearby Malarani Temple." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
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
          <img
            src={LOGO_URL}
            alt="Laligurans Agro Solutions logo"
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-accent/40 shadow-md"
          />
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
              className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/90 transition hover:text-foreground hover:bg-foreground/5"
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
                className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground/90 hover:bg-foreground/5"
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
          <p className="mt-3 max-w-md text-sm text-cream/95">
            A working agro-farm and cottage stay in the mid-hills of Arghakhanchi.
            Slow mornings, garden-grown meals, bonfires under the stars.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-cream/95">Visit</h4>
          <p className="mt-3 text-sm text-cream/95">
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
          <p className="mt-4 text-sm text-cream/95">
            <a href="mailto:laligurans555@gmail.com" className="hover:text-accent break-all">laligurans555@gmail.com</a><br />
            <a href="tel:+9779851155485" className="hover:text-accent">+977 98511 55485</a>
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-cream/95">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV.slice(1).map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-cream/95 hover:text-accent">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-cream/95 md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} Laligurans Agro Solutions. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">Handcrafted in the hills of Arghakhanchi.</span>
            <Link
              to="/admin"
              className="rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wider text-forest-deep shadow hover:bg-accent/90"
            >
              god
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MaintenancePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="max-w-lg text-center">
        <img
          src={LOGO_URL}
          alt="Laligurans Agro Solutions"
          className="mx-auto h-24 w-24 rounded-full object-cover ring-2 ring-accent/40 shadow-md"
        />
        <h1 className="mt-6 font-display text-3xl font-bold text-foreground md:text-4xl">
          We'll be right back
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Laligurans Agro Solutions is briefly offline for updates. Please check
          back soon — for bookings or urgent enquiries, reach us directly:
        </p>
        <div className="mt-6 flex flex-col items-center gap-2 text-sm">
          <a href="tel:+9779851155485" className="btn-primary">Call +977 98511 55485</a>
          <a href="mailto:laligurans555@gmail.com" className="text-muted-foreground hover:text-accent">
            laligurans555@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { is_active } = Route.useLoaderData();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdminRoute = pathname.startsWith("/admin");

  if (!is_active && !isAdminRoute) {
    return (
      <QueryClientProvider client={queryClient}>
        <MaintenancePage />
      </QueryClientProvider>
    );
  }

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
