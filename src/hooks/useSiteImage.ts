import { useEffect, useState } from "react";
import { CHANGE_EVENT, DEFAULT_SRC, readOverrides, type SiteImageId } from "@/lib/site-images";

/**
 * Returns the current URL for a registered site image, honoring any user
 * override saved via /admin. Falls back to the shipped default. Safe for SSR
 * (returns default on the server; hydrates to the override on the client).
 */
export function useSiteImage(id: SiteImageId | string): string {
  const fallback = DEFAULT_SRC[id] ?? "";
  const [src, setSrc] = useState<string>(fallback);

  useEffect(() => {
    const sync = () => {
      const o = readOverrides();
      setSrc(o[id] || fallback);
    };
    sync();
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [id, fallback]);

  return src;
}
