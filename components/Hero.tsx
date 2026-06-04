"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { hero, nav } from "@/lib/content";
import { AuroraText } from "@/components/ui/aurora-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[100svh] w-full overflow-hidden grain vignette"
    >
      {/* Затемнённый портрет Анастасии, full-bleed */}
      <Image
        src="/img/hero.webp"
        alt="Анастасия Нехаева"
        fill
        priority
        sizes="100vw"
        className="object-cover object-top grade"
      />

      {/* Затемнение под текст */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-coal via-coal/55 to-coal/55" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-coal/85 via-coal/30 to-transparent" />

      {/* Тёплый золотой ореол снизу-слева — дышит под заголовком */}
      <div
        className="animate-gold-breath pointer-events-none absolute bottom-0 left-0 z-10 h-[70%] w-[70%]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 22% 80%, rgba(201,162,75,0.22), transparent 70%)",
        }}
      />

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex flex-col leading-none">
          <span className="font-display text-2xl tracking-tight text-offwhite">
            {nav.brand}
          </span>
          <span className="mono-label mt-1 !text-[0.55rem]">{nav.tagline}</span>
        </div>
        <a
          href={nav.telegram}
          target="_blank"
          rel="noopener"
          className="mono-label border border-offwhite/25 px-4 py-2 transition hover:border-gold hover:text-gold-bright"
        >
          {nav.cta}
        </a>
      </nav>

      {/* Текст hero */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 pb-24 md:px-12 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="max-w-4xl"
        >
          <span className="mono-label mb-5 block !text-gold">{hero.overline}</span>
          <h1 className="font-display text-[2.6rem] leading-[1.02] tracking-tight text-offwhite sm:text-6xl md:text-7xl lg:text-[5.4rem]">
            {hero.title[0]} <br className="hidden sm:block" />
            {hero.title[1]}
            <br />
            <AuroraText className="italic" speed={0.8}>
              {hero.title[2]}
            </AuroraText>
          </h1>
          <p className="mt-7 max-w-xl text-base text-offwhite/75 md:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a href="#case-01" aria-label={hero.cta}>
              <ShimmerButton className="group gap-3 text-sm font-medium">
                {hero.cta}
                <span className="transition group-hover:translate-x-1">→</span>
              </ShimmerButton>
            </a>
            <span className="mono-label hidden md:block !text-[0.6rem]">
              {hero.microline}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Скролл-индикатор */}
      <motion.div
        className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="mono-label !text-[0.55rem]">{hero.scrollHint}</span>
        <span className="text-gold">▼</span>
      </motion.div>

      {/* Director credit */}
      <span className="mono-label absolute top-24 right-6 z-20 hidden md:block !text-[0.55rem]">
        DIR. A. NEHAEVA
      </span>
    </section>
  );
}
