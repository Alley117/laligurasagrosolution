// Central registry of every customizable image on the site.
// Real resort photos ship as defaults (via Lovable Assets CDN pointers).
// Users can override any slot via /admin — overrides live in localStorage
// under the key `siteImages.v1` as { [id]: dataUrlOrHttpUrl }.

import cottagesDay from "@/assets/real/cottages-day.jpg.asset.json";
import gazeboNight from "@/assets/real/gazebo-night.jpg.asset.json";
import farmCabbage from "@/assets/real/farm-cabbage.jpg.asset.json";
import cottage1Night from "@/assets/real/cottage-1-night.jpg.asset.json";
import bonfire from "@/assets/real/bonfire.jpg.asset.json";
import cottageRowNight from "@/assets/real/cottage-row-night.jpg.asset.json";
import walkwayLights from "@/assets/real/walkway-lights.jpg.asset.json";
import entranceSign from "@/assets/real/entrance-sign.jpg.asset.json";
import swing from "@/assets/real/swing.jpg.asset.json";
import logo from "@/assets/real/logo.jpg.asset.json";

const HERO = cottagesDay.url;
const GAZEBO = gazeboNight.url;
const FARM = farmCabbage.url;
const C1 = cottage1Night.url;
const FIRE = bonfire.url;
const ROW = cottageRowNight.url;
const LIGHTS = walkwayLights.url;
const SIGN = entranceSign.url;
const SWING = swing.url;
export const LOGO_URL = logo.url;

export type SiteImageDef = {
  id: string;
  label: string;
  section: string;
  defaultSrc: string;
};

export const SITE_IMAGES = [
  // Home
  { id: "home.hero", label: "Home — main hero (daytime cottages)", section: "Home", defaultSrc: HERO },
  { id: "home.farm", label: "Home — farm / crops image", section: "Home", defaultSrc: FARM },
  { id: "home.bonfire", label: "Home — evening CTA background (bonfire)", section: "Home", defaultSrc: FIRE },
  { id: "home.logo", label: "Home — resort logo watermark", section: "Home", defaultSrc: LOGO_URL },
  { id: "home.nav.cottages", label: "Home — quick nav: Cottages", section: "Home", defaultSrc: C1 },
  { id: "home.nav.facilities", label: "Home — quick nav: Facilities", section: "Home", defaultSrc: SWING },
  { id: "home.nav.dining", label: "Home — quick nav: Dining", section: "Home", defaultSrc: GAZEBO },
  { id: "home.nav.gallery", label: "Home — quick nav: Gallery", section: "Home", defaultSrc: LIGHTS },
  { id: "home.nav.contact", label: "Home — quick nav: Contact", section: "Home", defaultSrc: SIGN },

  // About
  { id: "about.hero", label: "About — hero (entrance sign)", section: "About", defaultSrc: SIGN },
  { id: "about.cottage", label: "About — cottage row at night", section: "About", defaultSrc: ROW },
  { id: "about.thali", label: "About — farm / produce photo", section: "About", defaultSrc: FARM },

  // Cottages
  { id: "cottages.hero", label: "Cottages — hero", section: "Cottages", defaultSrc: HERO },
  { id: "cottages.c1", label: "Cottage 1 — Laligurans (night, prayer flags)", section: "Cottages", defaultSrc: C1 },
  { id: "cottages.c2", label: "Cottage 2 — row view at night", section: "Cottages", defaultSrc: ROW },
  { id: "cottages.c3", label: "Cottage 3 — hillside cottages", section: "Cottages", defaultSrc: HERO },

  // Dining
  { id: "dining.hero", label: "Dining — hero (garden gazebo)", section: "Dining", defaultSrc: GAZEBO },
  { id: "dining.farm", label: "Dining — farm side image (cabbage field)", section: "Dining", defaultSrc: FARM },
  { id: "dining.menu.thali", label: "Dining — menu: Thali", section: "Dining", defaultSrc: GAZEBO },
  { id: "dining.menu.grill", label: "Dining — menu: Tandoori / Grill", section: "Dining", defaultSrc: FIRE },

  // Facilities
  { id: "facilities.hero", label: "Facilities — hero (garden swing)", section: "Facilities", defaultSrc: SWING },
  { id: "facilities.farm", label: "Facilities — working farm", section: "Facilities", defaultSrc: FARM },
  { id: "facilities.bonfire", label: "Facilities — bonfire", section: "Facilities", defaultSrc: FIRE },
  { id: "facilities.swing", label: "Facilities — garden swings", section: "Facilities", defaultSrc: SWING },
  { id: "facilities.lights", label: "Facilities — ambient lights walkway", section: "Facilities", defaultSrc: LIGHTS },

  // Location
  { id: "location.hero", label: "Location — hero (day cottages & hills)", section: "Location", defaultSrc: HERO },
  { id: "location.pheasant", label: "Location — landscape / fields", section: "Location", defaultSrc: FARM },
  { id: "location.farm", label: "Location — small farm inset", section: "Location", defaultSrc: FARM },
  { id: "location.temple", label: "Location — Malarani Temple area", section: "Location", defaultSrc: HERO },
  { id: "location.river", label: "Location — nearby river / fishing", section: "Location", defaultSrc: FARM },

  // Contact
  { id: "contact.hero", label: "Contact — hero (entrance sign)", section: "Contact", defaultSrc: SIGN },

  // Gallery (12 tiles)
  { id: "gallery.hero", label: "Gallery — hero", section: "Gallery", defaultSrc: LIGHTS },
  { id: "gallery.1", label: "Gallery 1 — Daytime cottages", section: "Gallery", defaultSrc: HERO },
  { id: "gallery.2", label: "Gallery 2 — Cabbage field & mountains", section: "Gallery", defaultSrc: FARM },
  { id: "gallery.3", label: "Gallery 3 — Entrance sign", section: "Gallery", defaultSrc: SIGN },
  { id: "gallery.4", label: "Gallery 4 — Cottage 1 at night", section: "Gallery", defaultSrc: C1 },
  { id: "gallery.5", label: "Gallery 5 — Cottage row at night", section: "Gallery", defaultSrc: ROW },
  { id: "gallery.6", label: "Gallery 6 — Garden gazebo", section: "Gallery", defaultSrc: GAZEBO },
  { id: "gallery.7", label: "Gallery 7 — Walkway lights", section: "Gallery", defaultSrc: LIGHTS },
  { id: "gallery.8", label: "Gallery 8 — Garden swing", section: "Gallery", defaultSrc: SWING },
  { id: "gallery.9", label: "Gallery 9 — Bonfire", section: "Gallery", defaultSrc: FIRE },
  { id: "gallery.10", label: "Gallery 10 — Logo signage", section: "Gallery", defaultSrc: LOGO_URL },
  { id: "gallery.11", label: "Gallery 11 — Cottages & hills", section: "Gallery", defaultSrc: HERO },
  { id: "gallery.12", label: "Gallery 12 — Farm produce", section: "Gallery", defaultSrc: FARM },
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
