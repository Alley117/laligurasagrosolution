import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  SITE_IMAGES,
  clearAllOverrides,
  readOverrides,
  setOverride,
} from "@/lib/site-images";
import { useSiteImage } from "@/hooks/useSiteImage";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Image Admin — Laligurans" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Admin,
});

const SECTIONS = Array.from(new Set(SITE_IMAGES.map((i) => i.section)));

function Admin() {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0]);
  const items = useMemo(
    () => SITE_IMAGES.filter((i) => i.section === activeSection),
    [activeSection],
  );

  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Site admin</span>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">Manage site photos</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Upload a new photo or paste an image URL for any slot on the site.
              Changes are saved in <strong>this browser only</strong> (localStorage)
              — visitors on other devices will still see the built-in defaults
              until you replace those too or move to a shared backend.
            </p>
            <p className="mt-2 max-w-2xl text-xs text-muted-foreground">
              Tip: for large photos, prefer pasting a hosted URL (e.g. from Google
              Drive share link, Imgur, or your own hosting). Uploads over ~1&nbsp;MB
              can fill up browser storage quickly.
            </p>
          </div>
          <button
            onClick={() => {
              if (confirm("Reset every image back to the original placeholder?")) {
                clearAllOverrides();
              }
            }}
            className="btn-ghost text-sm"
          >
            Reset all to defaults
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                s === activeSection
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card text-foreground/70 hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {items.map((it) => (
            <ImageRow key={it.id} id={it.id} label={it.label} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ImageRow({ id, label }: { id: string; label: string }) {
  const currentSrc = useSiteImage(id);
  const [urlInput, setUrlInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const isOverridden = Boolean(readOverrides()[id]);

  const onFile = async (file: File) => {
    setErr(null);
    if (!file.type.startsWith("image/")) {
      setErr("That file isn't an image.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setErr("File is over 3 MB — please pick a smaller image or paste a URL.");
      return;
    }
    setBusy(true);
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result as string);
        r.onerror = () => reject(r.error);
        r.readAsDataURL(file);
      });
      setOverride(id, dataUrl);
    } catch (e) {
      setErr("Couldn't read that file.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start gap-4">
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-muted">
          <img src={currentSrc} alt={label} className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="truncate font-medium">{label}</div>
            {isOverridden && (
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                Custom
              </span>
            )}
          </div>
          <div className="mt-1 font-mono text-[10px] text-muted-foreground">{id}</div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <label className="btn-ghost cursor-pointer text-xs !py-1.5 !px-3">
              {busy ? "Uploading…" : "Upload image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onFile(f);
                  e.currentTarget.value = "";
                }}
              />
            </label>
            {isOverridden && (
              <button
                onClick={() => setOverride(id, null)}
                className="text-xs text-muted-foreground underline hover:text-foreground"
              >
                Reset
              </button>
            )}
          </div>

          <div className="mt-2 flex gap-2">
            <input
              type="url"
              placeholder="Paste image URL…"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs"
            />
            <button
              onClick={() => {
                if (!urlInput.trim()) return;
                setOverride(id, urlInput.trim());
                setUrlInput("");
              }}
              className="btn-primary !py-1.5 !px-3 text-xs"
            >
              Use URL
            </button>
          </div>

          {err && <p className="mt-2 text-xs text-destructive">{err}</p>}
        </div>
      </div>
    </div>
  );
}
