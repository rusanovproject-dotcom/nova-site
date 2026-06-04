"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal, TextGenerate, MonoLabel } from "./primitives";
import CinemaVideo from "./CinemaVideo";
import Compare from "./Compare";
import { BorderBeam } from "./ui/border-beam";
import { ShineBorder } from "./ui/shine-border";
import { ShimmerButton } from "./ui/shimmer-button";
import {
  overture,
  cases,
  seriesIntro,
  gallery,
  colorDirection,
  manifesto,
  author,
  process,
  forWhom,
  offer,
  finalCta,
  footer,
} from "@/lib/content";

const img = (n: string) => `/img/${n}.webp`;
const vid = (n: string) => `/video/${n}.mp4`;
const pos = (n: string) => `/poster/${n}.jpg`;

/* ============ Разделитель fade-to-black ============ */
function ActBreak() {
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />;
}

/* ============ СЦЕНА 02 — УВЕРТЮРА ============ */
export function Overture() {
  return (
    <section className="relative flex min-h-[70svh] items-center justify-center bg-coal px-6 py-28 md:px-12 grain">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[55%] w-[70%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,162,75,0.10), transparent 72%)",
        }}
      />
      <Reveal className="relative z-10 max-w-3xl text-center">
        <MonoLabel className="!text-gold">ЧТО ТАКОЕ NOVA</MonoLabel>
        <p className="mt-7 font-display text-2xl leading-snug text-offwhite md:text-4xl md:leading-[1.25]">
          {overture.lead}
        </p>
      </Reveal>
    </section>
  );
}

/* ============ СЦЕНЫ 03–05 — КЛИЕНТСКИЕ КЕЙСЫ ============ */
function CaseBlock({ data, index }: { data: (typeof cases)[number]; index: number }) {
  const videoMap: Record<string, { mp4: string; webm?: string; poster: string; ratio: string }> = {
    bracelet: { mp4: vid("bracelet"), poster: pos("bracelet"), ratio: "aspect-[9/16]" },
    marble: { mp4: vid("marble-1"), poster: pos("marble-1"), ratio: "aspect-[9/16]" },
    animation: { mp4: vid("animation"), poster: pos("animation"), ratio: "aspect-square" },
    peonies: {
      mp4: vid("botanical-peonies"),
      webm: "/video/botanical-peonies.webm",
      poster: pos("botanical-peonies"),
      ratio: "aspect-[1080/1446]",
    },
  };
  const v = videoMap[data.video];
  const flip = index % 2 === 1;

  return (
    <section
      id={`case-${data.id}`}
      className="relative bg-coal-warm px-6 py-24 md:px-12 md:py-32"
    >
      {/* золотой бэклайт секции */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 h-[60%] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(201,162,75,0.10),transparent_70%)]" />
      <div
        className={`relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16 ${
          flip ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Видео — ограничено по высоте, центрировано, чтобы блок дышал */}
        <Reveal className="flex justify-center">
          <div className="relative mx-auto h-[64svh] max-h-[640px] overflow-hidden rounded-sm border border-gold/15 grade shadow-2xl shadow-black/50">
            <CinemaVideo
              mp4={v.mp4}
              webm={v.webm}
              poster={v.poster}
              ratio={v.ratio}
              heightFit
              className="h-full"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
            <span className="mono-label absolute bottom-3 left-3 z-10 !text-[0.52rem] !text-offwhite/70">
              ● REC · {data.id}
            </span>
          </div>
        </Reveal>

        {/* Текст */}
        <Reveal delay={0.15} className="max-w-xl">
          <MonoLabel className="!text-gold">{data.label}</MonoLabel>
          <h3 className="mt-5 font-display text-3xl leading-tight text-offwhite md:text-4xl">
            {data.title}
          </h3>
          <p className="mt-5 text-offwhite/70 leading-relaxed">{data.lead}</p>

          <p className="mt-6 font-display text-lg italic text-gold-bright/90">
            {data.voice}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Cases() {
  return (
    <>
      {cases.map((c, i) => (
        <CaseBlock key={c.id} data={c} index={i} />
      ))}
    </>
  );
}

/* ============ СЦЕНА 06 — ВХОД В СЕРИЮ (fade-to-black) ============ */
export function SeriesIntro() {
  return (
    <section className="relative flex min-h-[80svh] items-center justify-center bg-coal px-6 grain">
      {/* Дышащее золотое свечение-пауза перед авторской серией */}
      <div
        className="animate-gold-breath pointer-events-none absolute left-1/2 top-1/2 z-0 h-[55%] w-[80%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,162,75,0.16), transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-2xl text-center">
        <Reveal>
          <MonoLabel className="!text-gold">{seriesIntro.label}</MonoLabel>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="mt-6 font-display text-5xl tracking-tight text-offwhite md:text-7xl lg:text-8xl">
            {seriesIntro.title}
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="hairline mx-auto my-8 w-40" />
          <p className="mx-auto max-w-lg text-offwhite/65 leading-relaxed">
            {seriesIntro.lead}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ BOTANICAL MYTH — живой кадр (видео-центр серии) ============ */
export function BotanicalReel() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-coal px-6 py-20 grain">
      {/* мягкое золотое свечение за кадром */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[80%] w-[70%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,162,75,0.14), transparent 72%)",
        }}
      />
      <Reveal className="relative z-10">
        <div className="relative mx-auto w-[min(78vw,420px)]">
          <div className="relative overflow-hidden rounded-[2px] grade">
            <CinemaVideo
              mp4="/video/botanical-peonies.mp4"
              webm="/video/botanical-peonies.webm"
              poster="/poster/botanical-peonies.jpg"
              ratio="aspect-[1080/1446]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal/55 via-transparent to-coal/15" />
            <BorderBeam size={70} duration={9} borderWidth={1} />
          </div>
          {/* золотые уголки видоискателя */}
          <span className="pointer-events-none absolute -top-3 -left-3 h-7 w-7 border-t border-l border-gold/45" />
          <span className="pointer-events-none absolute -top-3 -right-3 h-7 w-7 border-t border-r border-gold/45" />
          <span className="pointer-events-none absolute -bottom-3 -left-3 h-7 w-7 border-b border-l border-gold/45" />
          <span className="pointer-events-none absolute -bottom-3 -right-3 h-7 w-7 border-b border-r border-gold/45" />
        </div>
        <p className="mx-auto mt-8 max-w-md text-center text-sm leading-relaxed text-offwhite/55">
          Образ оживает — не кадр, а сцена. Любой образ можно превратить
          в движущийся портрет бренда.
        </p>
        <MonoLabel className="mt-4 block text-center !text-gold !text-[0.6rem]">
          ЖИВОЙ КАДР · ВИДЕО
        </MonoLabel>
      </Reveal>
    </section>
  );
}

/* ============ СЦЕНА 07 — ГАЛЕРЕЯ-ЯКОРЬ (sticky stack) ============ */
function GalleryFrame({
  item,
  i,
}: {
  item: (typeof gallery.items)[number];
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.16, 1, 1.16]);
  const op = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  // Мягкая "диафрагма" — раскрытие/закрытие кадра как в кино, дольше и плавнее
  const clip = useTransform(
    scrollYProgress,
    [0, 0.34, 0.7, 1],
    [
      "inset(38% 38% 38% 38%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(20% 20% 20% 20%)",
    ]
  );
  // Тонкое золотое сияние по краю кадра в момент полного раскрытия
  const ringOp = useTransform(scrollYProgress, [0.2, 0.4, 0.7, 0.85], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative h-[100svh] w-full overflow-hidden">
      <motion.div style={{ scale, clipPath: clip }} className="absolute inset-0 grade">
        <Image
          src={img(item.src)}
          alt={`BOTANICAL MYTH — ${item.caption}`}
          fill
          sizes="100vw"
          className="object-cover"
          priority={i === 0}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal/70 via-transparent to-coal/30" />
      </motion.div>

      {/* Кинематографичный видоискатель — золотые уголки кадра */}
      <motion.div
        style={{ opacity: ringOp }}
        className="pointer-events-none absolute inset-6 z-[8] md:inset-12"
      >
        <span className="absolute top-0 left-0 h-7 w-7 border-t border-l border-gold/50" />
        <span className="absolute top-0 right-0 h-7 w-7 border-t border-r border-gold/50" />
        <span className="absolute bottom-0 left-0 h-7 w-7 border-b border-l border-gold/50" />
        <span className="absolute bottom-0 right-0 h-7 w-7 border-b border-r border-gold/50" />
      </motion.div>

      <motion.div
        style={{ opacity: op }}
        className="absolute bottom-12 left-6 z-10 md:left-12"
      >
        <MonoLabel className="!text-gold !text-base !tracking-[0.4em]">
          {item.caption}
        </MonoLabel>
      </motion.div>
      <span className="mono-label absolute top-8 right-6 z-10 !text-[0.55rem]">
        0{i + 1} / 04
      </span>
    </div>
  );
}

export function Gallery() {
  return (
    <section className="relative bg-coal">
      <div className="sticky top-0 z-10 flex justify-center pt-8">
        <MonoLabel className="!text-[0.6rem]">{gallery.microTitle}</MonoLabel>
      </div>
      {gallery.items.map((item, i) => (
        <GalleryFrame key={item.src} item={item} i={i} />
      ))}
    </section>
  );
}

/* ============ СЦЕНА 08 — РЕЖИССУРА ЦВЕТА ============ */
export function ColorDirection() {
  return (
    <section className="relative bg-coal-warm px-6 py-24 md:px-12 md:py-32">
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(181,88,46,0.12),transparent_60%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <Reveal className="max-w-md">
          <MonoLabel className="!text-gold">{colorDirection.label}</MonoLabel>
          <h2 className="mt-5 font-display text-4xl leading-tight text-offwhite md:text-5xl">
            {colorDirection.title}
          </h2>
          <p className="mt-5 text-offwhite/65 leading-relaxed">
            {colorDirection.micro}
          </p>
          <div className="hairline my-7 w-32" />
          <p className="font-display text-lg italic text-gold-bright/80">
            {colorDirection.microCta}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <Compare
            before={img(colorDirection.before)}
            after={img(colorDirection.after)}
            beforeLabel={colorDirection.beforeLabel}
            afterLabel={colorDirection.afterLabel}
            alt="Режиссура цвета"
          />
          <p className="mono-label mt-3 text-center !text-[0.58rem]">
            ПОТЯНИ, ЧТОБЫ ПЕРЕКЛЮЧИТЬ СВЕТ
          </p>
          {/* Балансирующий кадр справа */}
          <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-sm border border-white/5 grade">
            <Image
              src={img(colorDirection.accent)}
              alt="Кадр в обработке — NOVA"
              fill
              sizes="(max-width:768px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ СЦЕНА 09 — МАНИФЕСТ ============ */
export function Manifesto() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden bg-coal px-6 md:px-12">
      <Image
        src={img("editorial-blue")}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-25 grade"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-coal via-coal/90 to-coal/40" />
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <h2 className="font-display text-4xl leading-[1.08] text-offwhite md:text-6xl">
          <TextGenerate text={manifesto.title[0]} />
          <br />
          <span className="italic text-gold-bright">
            <TextGenerate text={manifesto.title[1]} delay={0.4} />
          </span>
        </h2>
        <Reveal delay={0.3}>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-offwhite/70">
            {manifesto.body}
          </p>
          <p className="mt-8 font-display text-2xl text-gold md:text-3xl">
            {manifesto.credo}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ СЦЕНА 10 — ОБ АВТОРЕ (split parallax) ============ */
export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative grid bg-coal-warm md:grid-cols-2"
    >
      <div className="flex items-center px-6 py-24 md:px-12 md:py-40">
        <Reveal className="max-w-lg">
          <MonoLabel className="!text-gold">{author.label}</MonoLabel>
          <h2 className="mt-5 font-display text-5xl leading-[0.95] text-offwhite md:text-6xl">
            {author.name[0]}
            <br />
            <span className="italic">{author.name[1]}</span>
          </h2>
          <p className="mt-8 text-offwhite/70 leading-relaxed">{author.body}</p>
          <div className="mt-7 border-l border-gold/30 pl-5">
            <p className="text-sm leading-relaxed text-offwhite/55">
              {author.credential}
            </p>
          </div>
        </Reveal>
      </div>
      <div className="relative min-h-[60svh] overflow-hidden md:min-h-full">
        <motion.div style={{ y }} className="absolute inset-[-8%] grade">
          <Image
            src={img("hero")}
            alt="Анастасия Нехаева — портрет"
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-coal-warm/50 via-transparent to-transparent" />
      </div>
    </section>
  );
}

/* ============ СЦЕНА 11 — ПРОЦЕСС ============ */
export function Process() {
  return (
    <section className="relative overflow-hidden bg-coal px-6 py-24 md:px-12 md:py-32">
      <Image
        src={img("studio")}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15 grade"
      />
      <div className="absolute inset-0 bg-coal/60" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal>
          <MonoLabel className="!text-gold">{process.slate}</MonoLabel>
          <h2 className="mt-4 font-display text-4xl text-offwhite md:text-5xl">
            Как устроена работа
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px md:grid-cols-4">
          {process.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="relative h-full border-t border-gold/25 pt-6 pr-4">
                <span className="font-display text-5xl text-gold/30">{s.n}</span>
                <h3 className="mt-3 font-display text-xl text-offwhite">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-offwhite/55">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ СЦЕНА 12 — ДЛЯ КОГО ============ */
export function ForWhom() {
  return (
    <section className="bg-coal-warm px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h2 className="font-display text-4xl text-offwhite md:text-5xl">
            {forWhom.title}
          </h2>
        </Reveal>
        <div className="mt-12 space-y-px">
          {forWhom.items.map((it, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex gap-6 border-t border-gold/15 py-7">
                <span className="font-mono text-sm text-gold/60">
                  0{i + 1}
                </span>
                <p className="text-lg leading-relaxed text-offwhite/75">{it}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mono-label mt-10 !text-gold/70">{forWhom.segments}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ СЦЕНА 13 — УСЛУГИ ============ */
export function Offer() {
  return (
    <section className="bg-coal px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mx-auto max-w-2xl text-center font-display text-xl italic text-offwhite/60 md:text-2xl">
            {offer.anchor}
          </p>
        </Reveal>

        {/* мини-концепт выделенный */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl rounded-sm border border-gold/30 bg-gradient-to-br from-gold/[0.06] to-transparent p-8 text-center">
            <h3 className="font-display text-2xl text-offwhite md:text-3xl">
              {offer.highlight.title}
            </h3>
            <p className="mt-4 text-offwhite/65">{offer.highlight.text}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {offer.tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-sm border p-8 ${
                  t.featured
                    ? "border-gold/60 bg-gradient-to-b from-gold/[0.08] to-transparent"
                    : "border-white/8 bg-white/[0.015]"
                }`}
              >
                {/* Magic UI ShineBorder — живая золотая обводка на рекомендованном тарифе */}
                {t.featured && (
                  <ShineBorder
                    borderWidth={1.5}
                    duration={10}
                    shineColor={["#c9a24b", "#e8c77a", "#b5582e"]}
                  />
                )}
                {t.featured && (
                  <MonoLabel className="!text-gold mb-3 !text-[0.58rem]">
                    РЕКОМЕНДУЮ
                  </MonoLabel>
                )}
                <h3 className="font-display text-2xl text-offwhite">{t.name}</h3>
                <p
                  className={`mt-3 font-display text-3xl ${
                    t.featured ? "text-gold-bright" : "text-gold"
                  }`}
                >
                  {t.price}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-offwhite/55">
                  {t.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ СЦЕНА 14 — ФИНАЛЬНЫЙ CTA (кольцо) ============ */
export function FinalCta() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden px-6 grain vignette md:px-12">
      <Image
        src={img("new-04")}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center grade"
        priority={false}
      />
      <div className="absolute inset-0 bg-coal/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-coal/60" />
      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <Reveal>
          <h2 className="font-display text-4xl leading-[1.08] text-offwhite md:text-6xl">
            {finalCta.title[0]}
            <br />
            <span className="italic text-gold-bright">{finalCta.title[1]}</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-offwhite/70">
            {finalCta.lead}
          </p>
          <a
            href={footer.telegram}
            target="_blank"
            rel="noopener"
            aria-label={finalCta.button}
            className="mt-10 inline-block"
          >
            <ShimmerButton
              className="group gap-3 px-9 py-4 text-base font-medium"
              shimmerDuration="2.6s"
            >
              {finalCta.button}
              <span className="transition group-hover:translate-x-1">→</span>
            </ShimmerButton>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ FOOTER ============ */
export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-coal px-6 py-14 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <span className="font-display text-3xl text-offwhite">{footer.brand}</span>
          <p className="mono-label mt-2 !text-[0.58rem]">{footer.tagline}</p>
        </div>
        <a
          href={footer.telegram}
          target="_blank"
          rel="noopener"
          className="mono-label transition hover:text-gold-bright"
        >
          @nova_nehaeva ↗
        </a>
      </div>
      <p className="mono-label mt-10 !text-[0.55rem] !text-offwhite/30">
        {footer.copyright}
      </p>
    </footer>
  );
}

export { ActBreak };
