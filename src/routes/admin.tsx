import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import {
  SITE_IMAGES,
  clearAllOverrides,
  readOverrides,
  setOverride,
} from "@/lib/site-images";
import { useSiteImage } from "@/hooks/useSiteImage";
import {
  getAdminStatus,
  getSiteActive,
  lockAdmin,
  setSiteActive,
  unlockAdmin,
} from "@/lib/admin-gate.functions";

export const Route = createFileRoute("/admin")({
  loader: async () => {
    const [status, site] = await Promise.all([
      getAdminStatus().catch(() => ({ unlocked: false })),
      getSiteActive().catch(() => ({ is_active: true })),
    ]);
    return { unlocked: status.unlocked, is_active: site.is_active };
  },
  head: () => ({
    meta: [
      { title: "Site Admin — Laligurans" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Admin,
});

const SECTIONS = Array.from(new Set(SITE_IMAGES.map((i) => i.section)));

function Admin() {
  const { unlocked, is_active } = Route.useLoaderData();
  if (!unlocked) return <LoginGate />;
  return <AdminPanel initialActive={is_active} />;
}

function LoginGate() {
  const router = useRouter();
  const unlock = useServerFn(unlockAdmin);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await unlock({ data: { password } });
      if (res.ok) {
        await router.invalidate();
      } else {
        setError("Incorrect password.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 pt-24 pb-16">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg"
      >
        <h1 className="font-display text-2xl font-bold">Admin sign-in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the admin password to manage photos and site status.
        </p>
        <label className="mt-5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          autoComplete="current-password"
          className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
        />
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={busy || !password}
          className="btn-primary mt-5 w-full disabled:opacity-60"
        >
          {busy ? "Checking…" : "Unlock admin"}
        </button>
      </form>
    </div>
  );
}

function AdminPanel({ initialActive }: { initialActive: boolean }) {
  const router = useRouter();
  const lock = useServerFn(lockAdmin);
  const toggle = useServerFn(setSiteActive);
  const [active, setActive] = useState(initialActive);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0]);
  const items = useMemo(
    () => SITE_IMAGES.filter((i) => i.section === activeSection),
    [activeSection],
  );

  useEffect(() => setActive(initialActive), [initialActive]);

  async function onToggle(next: boolean) {
    if (
      !next &&
      !confirm(
        "Deactivate the website? Visitors will see a maintenance page until you turn it back on.",
      )
    )
      return;
    setSaving(true);
    setMsg(null);
    try {
      const res = await toggle({ data: { is_active: next } });
      setActive(res.is_active);
      setMsg(next ? "Website is now live." : "Website is now offline.");
    } catch (e) {
      setMsg("Couldn't update site status.");
    } finally {
      setSaving(false);
    }
  }

  async function onLogout() {
    await lock();
    await router.invalidate();
  }

  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Site admin</span>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">Manage site</h1>
          </div>
          <button onClick={onLogout} className="btn-ghost text-sm">
            Sign out
          </button>
        </div>

        {/* Activation toggle */}
        <section
          className={`mt-8 rounded-2xl border p-5 md:p-6 ${
            active
              ? "border-border bg-card"
              : "border-destructive/40 bg-destructive/5"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full ${
                    active ? "bg-emerald-500" : "bg-destructive"
                  }`}
                />
                <h2 className="font-display text-xl font-bold">
                  Website is {active ? "active" : "offline"}
                </h2>
              </div>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                {active
                  ? "Visitors can browse the whole site normally."
                  : "Visitors see a maintenance page. This admin page stays reachable so you can turn the site back on."}
              </p>
              {msg && (
                <p className="mt-2 text-xs font-medium text-foreground/80">{msg}</p>
              )}
            </div>
            <button
              onClick={() => onToggle(!active)}
              disabled={saving}
              className={`${
                active ? "btn-ghost" : "btn-primary"
              } disabled:opacity-60`}
            >
              {saving
                ? "Saving…"
                : active
                  ? "Deactivate website"
                  : "Activate website"}
            </button>
          </div>
        </section>

        {/* Photo manager */}
        <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Manage site photos</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Upload a new photo or paste an image URL for any slot on the site.
              Photo overrides are saved in <strong>this browser only</strong>.
            </p>
          </div>
          <button
            onClick={() => {
              if (confirm("Reset every image back to the original photo?")) {
                clearAllOverrides();
              }
            }}
            className="btn-ghost text-sm"
          >
            Reset all photos
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
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

        <div className="mt-6 grid gap-5 md:grid-cols-2">
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
    } catch {
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
