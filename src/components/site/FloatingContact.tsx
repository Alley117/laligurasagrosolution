import { LOGO_URL } from "@/lib/site-images";

const PHONE = "9768843117";
const WA_MESSAGE = encodeURIComponent(
  "Namaste! I'd like to know more about staying at Laligurans Agro Solutions.",
);
const FB_URL = "https://www.facebook.com/laliguransagrosolutions";

export function FloatingContact() {
  return (
    <div className="fixed right-3 bottom-3 z-[60] flex flex-col items-end gap-2.5 md:right-5 md:bottom-5 md:gap-3">
      <a
        href={FB_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Visit our Facebook page"
        className="group grid h-12 w-12 place-items-center rounded-full bg-[#1877F2] text-white shadow-xl ring-2 ring-white/70 transition hover:scale-110 md:h-14 md:w-14"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 md:h-6 md:w-6" fill="currentColor" aria-hidden>
          <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.7c0-.9.25-1.5 1.55-1.5h1.65V4.5c-.3 0-1.3-.1-2.45-.1-2.4 0-4.05 1.45-4.05 4.15v2.45H7.7v3h2.5V21h3.3z"/>
        </svg>
      </a>
      <a
        href={`https://wa.me/977${PHONE}?text=${WA_MESSAGE}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-xl ring-2 ring-white/70 transition hover:scale-110 md:h-14 md:w-14"
      >
        <svg viewBox="0 0 32 32" className="h-6 w-6 md:h-7 md:w-7" fill="currentColor" aria-hidden>
          <path d="M19.11 17.63c-.28-.14-1.63-.8-1.88-.9-.25-.09-.43-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.62-1.5-.86-2.06-.22-.54-.45-.46-.62-.47l-.53-.01c-.18 0-.49.07-.75.35-.26.28-.99.97-.99 2.36 0 1.4 1.02 2.75 1.16 2.94.14.19 2 3.05 4.85 4.28.68.29 1.2.47 1.61.6.68.22 1.29.19 1.78.11.54-.08 1.63-.66 1.86-1.31.23-.65.23-1.2.16-1.31-.07-.11-.25-.18-.53-.32zM16 3C8.82 3 3 8.82 3 16c0 2.28.6 4.42 1.64 6.28L3 29l6.9-1.8A12.94 12.94 0 0016 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.66c-1.98 0-3.83-.53-5.42-1.46l-.39-.23-4.1 1.07 1.1-4-.25-.41A10.6 10.6 0 015.4 16c0-5.85 4.76-10.6 10.6-10.6 5.85 0 10.6 4.76 10.6 10.6 0 5.85-4.76 10.6-10.6 10.6z"/>
        </svg>
      </a>
      <a
        href={`tel:+977${PHONE}`}
        aria-label={`Call ${PHONE}`}
        className="group flex items-center gap-2 rounded-full bg-accent px-3 py-2.5 text-accent-foreground shadow-xl ring-2 ring-white/70 transition hover:scale-105 md:px-4 md:py-3"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-white/25 md:h-7 md:w-7">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 md:h-4 md:w-4" fill="currentColor" aria-hidden>
            <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.7-6.5-6.5l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.6 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z"/>
          </svg>
        </span>
        <span className="text-xs font-semibold leading-tight md:text-sm">
          <span className="block opacity-80 text-[9px] uppercase tracking-wider md:text-[10px]">Call now</span>
          <span>{PHONE}</span>
        </span>
      </a>
    </div>
  );
}

export { LOGO_URL };
