import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="absolute inset-0 -z-10">
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/70 via-forest-deep/50 to-background" />
      </div>
      <div className="mx-auto max-w-5xl px-5 text-center text-cream md:px-8">
        {eyebrow && <span className="eyebrow !text-cream/80">{eyebrow}</span>}
        <h1 className="mt-4 text-4xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-base text-cream/85 md:text-lg">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    </section>
  );
}
