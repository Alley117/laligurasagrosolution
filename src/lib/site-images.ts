// Central registry of every customizable image on the site.
// Each key has a stable ID, a human label, a section (for grouping in admin),
// and a built-in default (the AI placeholder that ships with the site).
// Users override any of these via /admin — overrides are stored in localStorage
// under the key `siteImages.v1` as { [id]: dataUrlOrHttpUrl }.

import hero from "@/assets/hero-hillside.jpg";
import bonfire from "@/assets/bonfire-evening.jpg";
import c1 from "@/assets/cottage-1.jpg";
import c2 from "@/assets/cottage-2.jpg";
import c3 from "@/assets/cottage-3.jpg";
import thali from "@/assets/dining-thali.jpg";
import grill from "@/assets/dining-grill.jpg";
import farm from "@/assets/farm-garden.jpg";
import swing from "@/assets/facilities-swing.jpg";
import lights from "@/assets/ambience-lights.jpg";
import hills from "@/assets/location-hills.jpg";
import pheasant from "@/assets/wildlife-pheasant.jpg";

export type SiteImageDef = {
  id: string;
  label: string;
  section: string;
  defaultSrc: string;
};

export const SITE_IMAGES = [
  // Home
  { id: "home.hero", label: "Home — main hero", section: "Home", defaultSrc: hero },
  { id: "home.farm", label: "Home — farm / story image", section: "Home", defaultSrc: farm },
  { id: "home.bonfire", label: "Home — evening CTA background", section: "Home", defaultSrc: bonfire },
  { id: "home.nav.cottages", label: "Home — quick nav: Cottages", section: "Home", defaultSrc: c1 },
  { id: "home.nav.facilities", label: "Home — quick nav: Facilities", section: "Home", defaultSrc: lights },
  { id: "home.nav.dining", label: "Home — quick nav: Dining", section: "Home", defaultSrc: thali },
  { id: "home.nav.gallery", label: "Home — quick nav: Gallery", section: "Home", defaultSrc: bonfire },
  { id: "home.nav.contact", label: "Home — quick nav: Contact", section: "Home", defaultSrc: farm },

  // About
  { id: "about.hero", label: "About — hero", section: "About", defaultSrc: farm },
  { id: "about.cottage", label: "About — cottage photo", section: "About", defaultSrc: c2 },
  { id: "about.thali", label: "About — thali photo", section: "About", defaultSrc: thali },

  // Cottages
  { id: "cottages.hero", label: "Cottages — hero", section: "Cottages", defaultSrc: c1 },
  { id: "cottages.c1", label: "Cottage 1 — Laligurans", section: "Cottages", defaultSrc: c1 },
  { id: "cottages.c2", label: "Cottage 2 — Bangi View", section: "Cottages", defaultSrc: c2 },
  { id: "cottages.c3", label: "Cottage 3 — Forest Nook", section: "Cottages", defaultSrc: c3 },

  // Dining
  { id: "dining.hero", label: "Dining — hero", section: "Dining", defaultSrc: thali },
  { id: "dining.farm", label: "Dining — farm side image", section: "Dining", defaultSrc: farm },
  { id: "dining.menu.thali", label: "Dining — menu: Thali", section: "Dining", defaultSrc: thali },
  { id: "dining.menu.grill", label: "Dining — menu: Tandoori", section: "Dining", defaultSrc: grill },

  // Facilities
  { id: "facilities.hero", label: "Facilities — hero", section: "Facilities", defaultSrc: swing },
  { id: "facilities.farm", label: "Facilities — working garden", section: "Facilities", defaultSrc: farm },
  { id: "facilities.bonfire", label: "Facilities — bonfire", section: "Facilities", defaultSrc: bonfire },
  { id: "facilities.swing", label: "Facilities — garden swings", section: "Facilities", defaultSrc: swing },
  { id: "facilities.lights", label: "Facilities — ambient lights", section: "Facilities", defaultSrc: lights },

  // Location
  { id: "location.hero", label: "Location — hero", section: "Location", defaultSrc: hills },
  { id: "location.pheasant", label: "Location — pheasant / wildlife", section: "Location", defaultSrc: pheasant },
  { id: "location.farm", label: "Location — small farm inset", section: "Location", defaultSrc: farm },

  // Contact
  { id: "contact.hero", label: "Contact — hero", section: "Contact", defaultSrc: bonfire },

  // Gallery (12 tiles)
  { id: "gallery.hero", label: "Gallery — hero", section: "Gallery", defaultSrc: lights },
  { id: "gallery.1", label: "Gallery 1 — Hillside cottages", section: "Gallery", defaultSrc: hero },
  { id: "gallery.2", label: "Gallery 2 — Terraced hills", section: "Gallery", defaultSrc: hills },
  { id: "gallery.3", label: "Gallery 3 — Pheasant", section: "Gallery", defaultSrc: pheasant },
  { id: "gallery.4", label: "Gallery 4 — Cottage 1", section: "Gallery", defaultSrc: c1 },
  { id: "gallery.5", label: "Gallery 5 — Cottage 2", section: "Gallery", defaultSrc: c2 },
  { id: "gallery.6", label: "Gallery 6 — Cottage 3", section: "Gallery", defaultSrc: c3 },
  { id: "gallery.7", label: "Gallery 7 — Thali", section: "Gallery", defaultSrc: thali },
  { id: "gallery.8", label: "Gallery 8 — Tandoori", section: "Gallery", defaultSrc: grill },
  { id: "gallery.9", label: "Gallery 9 — Bonfire", section: "Gallery", defaultSrc: bonfire },
  { id: "gallery.10", label: "Gallery 10 — Lanterns", section: "Gallery", defaultSrc: lights },
  { id: "gallery.11", label: "Gallery 11 — Garden swing", section: "Gallery", defaultSrc: swing },
  { id: "gallery.12", label: "Gallery 12 — Vegetable garden", section: "Gallery", defaultSrc: farm },
] as const satisfies readonly SiteImageDef[];

export type SiteImageId = (typeof SITE_IMAGES)[number]["id"];

export const DEFAULT_SRC: Record<string, string> = Object.fromEntries(
  SITE_IMAGES.map((i) => [i.id, i.defaultSrc]),
);

export const STORAGE_KEY = "siteImages.v1";
export const CHANGE_EVENT = "site-images-changed";

export function readOverrides(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export function writeOverrides(next: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function setOverride(id: string, url: string | null) {
  const cur = readOverrides();
  if (url) cur[id] = url;
  else delete cur[id];
  writeOverrides(cur);
}

export function clearAllOverrides() {
  writeOverrides({});
}
