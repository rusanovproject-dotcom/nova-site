"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { Reveal, MonoLabel } from "./primitives";
import CinemaVideo from "./CinemaVideo";
import Compare from "./Compare";
import { ShineBorder } from "./ui/shine-border";
import { ShimmerButton } from "./ui/shimmer-button";
import {
  painOverture,
  blindTest,
  productStaysYours,
  fullCycle,
  cases,
  process,
  safety,
  offer,
  about,
  finalCta,
  footer,
} from "@/lib/content";

/* ─────────────────────────────────────────────────────────────
   АССЕТ-РЕЗОЛВЕР
   Часть ключей в content.ts — стенд-ины: реальные кадры от Насти
   придут позже. Здесь маппинг "ключ из контента" → реальный файл.
   Любой неизвестный ключ падает на безопасный fallback, чтобы
   НИКОГДА не было битой картинки/пустого экрана.
   ───────────────────────────────────────────────────────────── */
const FALLBACK = "editorial-blue";

// Реальные файлы в public/img (без .webp)
const REAL = new Set([
  "about", "animation", "beauty-orange", "beauty", "campaign", "campaign2",
  "character1", "crown", "editorial-blue", "hero", "new-02", "new-03",
  "new-04", "new-06", "new-08", "new-beauty-holo", "new-marble-product-still",
  "new-zinc-supplement", "product", "studio", "sunflower",
]);

// TODO(Настя): заменить стенд-ины на реальные кадры, когда придут.
const STANDIN: Record<string, string> = {
  // Слепой тест — сильные реалистичные кадры (попарно студия/NOVA)
  "blind-test-01": "new-03",                  // TODO: реальная пара кадров
  "blind-test-02": "new-marble-product-still", // TODO
  "blind-test-03": "editorial-blue",          // TODO
  "blind-test-04": "campaign",                // TODO
  // До/после из одной фотографии товара
  "product-original-photo": "beauty",         // TODO: исходное фото клиента
  "product-campaign-result": "beauty-orange", // TODO: готовый рекламный кадр
  // Макро-пруфы фактуры
  "macro-skin": "new-03",        // TODO: макро кожи
  "macro-metal": "new-02",       // TODO: макро металла/блеска
  "macro-fabric": "character1",  // TODO: макро ткани/нитей
  "macro-cream": "new-beauty-holo", // TODO: макро крема/текстуры
};

function resolve(key: string): string {
  const real = STANDIN[key] ?? key;
  return REAL.has(real) ? real : FALLBACK;
}

const img = (n: string) => `/img/${resolve(n)}.webp`;
const vid = (n: string) => `/video/${n}.mp4`;
const pos = (n: string) => `/poster/${n}.jpg`;

/* ============ Разделитель fade-to-black ============ */
function ActBreak() {
  return (
    <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
  );
}

/* мягкое золотое свечение фоном */
function GoldGlow({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 ${className}`}
      style={{
        background:
          "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,162,75,0.10), transparent 72%)",
      }}
    />
  );
}

/* ════════════════════════════════════════════════════════════
   БЛОК 2 — УВЕРТЮРА «Знакомая боль»
   ════════════════════════════════════════════════════════════ */
export function PainOverture() {
  return (
    <section
      id="pain"
      className="relative overflow-hidden bg-coal px-6 py-28 md:px-12 md:py-36 grain"
    >
      <GoldGlow className="h-[60%] w-[80%]" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <Reveal className="text-center">
          <MonoLabel className="!text-gold">ЗНАКОМАЯ БОЛЬ</MonoLabel>
          <h2 className="mt-5 font-display text-4xl text-offwhite md:text-5xl">
            {painOverture.title}
          </h2>
        </Reveal>

        <div className="mt-14 space-y-px">
          {painOverture.pains.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.12}>
              <div className="flex items-baseline gap-5 border-t border-gold/15 py-7 md:gap-8 md:py-9">
                <span className="font-mono text-sm text-gold/50">{p.id}</span>
                <p className="font-display text-2xl leading-snug text-offwhite/90 md:text-[2rem] md:leading-tight">
                  {p.quote}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="hairline mx-auto my-12 w-32" />
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-offwhite/70 md:text-xl md:leading-relaxed">
            {painOverture.close}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   БЛОК 3 — «Найди, где AI» (слепой тест)
   ════════════════════════════════════════════════════════════ */
function BlindFrame({
  item,
  i,
}: {
  item: (typeof blindTest.items)[number];
  i: number;
}) {
  const [revealed, setRevealed] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setRevealed((v) => !v)}
      className="group relative block aspect-[3/4] w-full overflow-hidden rounded-sm border border-white/8 grade focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
      aria-label="Показать ответ — где здесь AI"
    >
      <Image
        src={img(item.src)}
        alt={`Кадр ${i + 1} — где здесь AI?`}
        fill
        sizes="(max-width:768px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal/70 via-transparent to-transparent" />

      {/* подсказка до раскрытия */}
      <span
        className={`mono-label absolute bottom-3 left-3 z-10 !text-[0.55rem] transition-opacity duration-300 ${
          revealed ? "opacity-0" : "opacity-100"
        }`}
      >
        ТАП — ОТВЕТ
      </span>

      {/* ответ */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center bg-coal/72 backdrop-blur-[2px] transition-opacity duration-400 ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      >
        <span
          className={`font-display text-2xl md:text-3xl ${
            item.isAi ? "text-gold-bright" : "text-offwhite"
          }`}
        >
          {item.isAi ? "Это — NOVA" : "Студия"}
        </span>
      </div>
    </button>
  );
}

export function BlindTest() {
  return (
    <section
      id="blind-test"
      className="relative overflow-hidden bg-coal-warm px-6 py-24 md:px-12 md:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-0 h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(201,162,75,0.09),transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <MonoLabel className="!text-gold">СЛЕПОЙ ТЕСТ</MonoLabel>
          <h2 className="mt-5 font-display text-4xl leading-tight text-offwhite md:text-6xl">
            {blindTest.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-offwhite/70">
            {blindTest.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {blindTest.items.map((it, i) => (
              <BlindFrame key={it.id} item={it} i={i} />
            ))}
          </div>
        </Reveal>

        {/* антислоп */}
        <Reveal delay={0.15}>
          <div className="mt-16 grid gap-10 md:grid-cols-[auto_1fr] md:gap-16">
            <div>
              <h3 className="max-w-xs font-display text-2xl leading-snug text-offwhite md:text-3xl">
                {blindTest.antiSlop.title}
              </h3>
            </div>
            <ul className="space-y-px">
              {blindTest.antiSlop.items.map((it, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 border-t border-white/8 py-4"
                >
                  <span className="mt-1 text-gold">✕</span>
                  <span className="text-offwhite/75">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-14 flex justify-center">
            <a
              href={blindTest.ctaHref}
              target="_blank"
              rel="noopener"
              aria-label={blindTest.cta}
            >
              <ShimmerButton className="group gap-3 px-8 py-4 text-base font-medium">
                {blindTest.cta}
                <span className="transition group-hover:translate-x-1">→</span>
              </ShimmerButton>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   БЛОК 4 — «Ваш продукт остаётся вашим»
   ════════════════════════════════════════════════════════════ */
export function ProductStaysYours() {
  const ba = productStaysYours.beforeAfter;
  return (
    <section
      id="product"
      className="relative overflow-hidden bg-coal px-6 py-24 md:px-12 md:py-32 grain"
    >
      <GoldGlow className="h-[55%] w-[70%]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
          <Reveal className="max-w-xl">
            <MonoLabel className="!text-gold">ТОЧНОСТЬ ПРОДУКТА</MonoLabel>
            <h2 className="mt-5 font-display text-4xl leading-tight text-offwhite md:text-5xl">
              {productStaysYours.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-offwhite/70">
              {productStaysYours.body}
            </p>
            <div className="mt-8 rounded-sm border border-gold/20 bg-gold/[0.04] p-5">
              <p className="text-sm leading-relaxed text-offwhite/70">
                {productStaysYours.safetyNote}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            {/* TODO(Настя): before = исходное фото клиента, after = готовый кадр */}
            <Compare
              before={img(ba.before.src)}
              after={img(ba.after.src)}
              beforeLabel={ba.before.caption}
              afterLabel={ba.after.caption}
              alt="Из одной фотографии — рекламный кадр"
            />
            <p className="mono-label mt-3 text-center !text-[0.58rem]">
              {ba.label} · ПОТЯНИ
            </p>
          </Reveal>
        </div>

        {/* макро-пруфы */}
        <Reveal delay={0.1}>
          <h3 className="mt-20 max-w-2xl font-display text-2xl leading-snug text-offwhite md:text-3xl">
            {productStaysYours.macroProofs.title}
          </h3>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {productStaysYours.macroProofs.items.map((m) => (
              <div
                key={m.label}
                className="relative aspect-square overflow-hidden rounded-sm border border-white/8 grade"
              >
                {/* TODO(Настя): макро-кадр под "{m.label}" */}
                <Image
                  src={img(m.src)}
                  alt={m.label}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-coal/80 to-transparent" />
                <MonoLabel className="absolute bottom-3 left-3 !text-[0.55rem] !text-offwhite/85">
                  {m.label}
                </MonoLabel>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   БЛОК 5 — «Я работаю как режиссёр» (полный цикл)
   ════════════════════════════════════════════════════════════ */
export function FullCycle() {
  return (
    <section
      id="cycle"
      className="relative overflow-hidden bg-coal-warm px-6 py-24 md:px-12 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(181,88,46,0.10),transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal>
          <MonoLabel className="!text-gold">{fullCycle.eyebrow}</MonoLabel>
          <h2 className="mt-5 max-w-4xl font-display text-3xl leading-[1.12] text-offwhite md:text-5xl md:leading-[1.1]">
            {fullCycle.title}
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-offwhite/65">
            {fullCycle.lead}
          </p>
        </Reveal>

        <div className="mt-16 space-y-px">
          {fullCycle.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="grid gap-3 border-t border-gold/20 py-8 md:grid-cols-[6rem_1fr_2fr] md:gap-8 md:py-10">
                <span className="font-display text-5xl text-gold/30 md:text-6xl">
                  {s.n}
                </span>
                <h3 className="font-display text-2xl text-offwhite md:text-3xl">
                  {s.title}
                </h3>
                <p className="leading-relaxed text-offwhite/65">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="hairline my-12 w-40" />
          <p className="font-display text-2xl italic text-gold-bright md:text-3xl">
            {fullCycle.credo}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   БЛОК 6 — КЕЙСЫ ПО НИШАМ
   ════════════════════════════════════════════════════════════ */
type CaseData = (typeof cases)[number];

function CaseBlock({ data, index }: { data: CaseData; index: number }) {
  const videoMap: Record<
    string,
    { mp4: string; webm?: string; poster: string; ratio: string }
  > = {
    marble: { mp4: vid("marble-1"), poster: pos("marble-1"), ratio: "aspect-[9/16]" },
    animation: { mp4: vid("animation"), poster: pos("animation"), ratio: "aspect-square" },
    peonies: {
      mp4: vid("botanical-peonies"),
      webm: "/video/botanical-peonies.webm",
      poster: pos("botanical-peonies"),
      ratio: "aspect-[1080/1446]",
    },
  };
  const hasVideo = "video" in data && data.video && videoMap[data.video];
  const v = hasVideo ? videoMap[data.video] : null;
  const flip = index % 2 === 1;

  return (
    <section className="relative overflow-hidden bg-coal px-6 py-24 md:px-12 md:py-32 grain">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 h-[60%] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(201,162,75,0.09),transparent_70%)]" />
      <div
        className={`relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16 ${
          flip ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Визуал */}
        <Reveal className="flex justify-center">
          {v ? (
            <div className="relative mx-auto h-[60svh] max-h-[600px] overflow-hidden rounded-sm border border-gold/15 grade shadow-2xl shadow-black/50">
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
          ) : (
            // Кейс 04 — до/после (цветокор)
            <div className="w-full max-w-md">
              {/* TODO(Настя): реальный кейс — холодный → терракота */}
              <Compare
                before={img((data as { before: string }).before)}
                after={img((data as { after: string }).after)}
                beforeLabel={(data as { beforeLabel: string }).beforeLabel}
                afterLabel={(data as { afterLabel: string }).afterLabel}
                alt={data.title}
              />
              <p className="mono-label mt-3 text-center !text-[0.58rem]">
                ПОТЯНИ — ПЕРЕКЛЮЧИ СВЕТ
              </p>
            </div>
          )}
        </Reveal>

        {/* Текст */}
        <Reveal delay={0.12} className="max-w-xl">
          <MonoLabel className="!text-gold">{data.label}</MonoLabel>
          <p className="mono-label mt-2 block !text-[0.56rem] !text-offwhite/45">
            {data.eyebrow}
          </p>
          <h3 className="mt-5 font-display text-3xl leading-tight text-offwhite md:text-4xl">
            {data.title}
          </h3>
          <p className="mt-5 leading-relaxed text-offwhite/70">{data.lead}</p>
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
    <div id="cases">
      <Reveal className="bg-coal px-6 pt-24 text-center md:px-12 md:pt-32">
        <MonoLabel className="!text-gold">НАПРАВЛЕНИЯ И КЕЙСЫ</MonoLabel>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-tight text-offwhite md:text-5xl">
          Что я делаю для брендов как ваш.
        </h2>
      </Reveal>
      {cases.map((c, i) => (
        <CaseBlock key={c.id} data={c} index={i} />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   БЛОК 7 — ПРОЦЕСС «Как мы работаем»
   ════════════════════════════════════════════════════════════ */
export function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-coal-warm px-6 py-24 md:px-12 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal>
          <MonoLabel className="!text-gold">ПРОЦЕСС</MonoLabel>
          <h2 className="mt-5 font-display text-4xl text-offwhite md:text-5xl">
            {process.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-offwhite/65">
            {process.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px md:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="flex h-full flex-col border-t border-gold/25 pt-6 pr-4">
                <span className="font-display text-5xl text-gold/30">{s.n}</span>
                <h3 className="mt-3 font-display text-xl text-offwhite">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-offwhite/55">
                  {s.text}
                </p>
                <span className="mono-label mt-5 !text-[0.56rem] !text-gold-bright/80">
                  {s.duration}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {process.guarantees.map((g, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-sm border border-white/8 bg-white/[0.015] p-5"
              >
                <span className="mt-0.5 text-gold-bright">✓</span>
                <span className="text-offwhite/80">{g}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   БЛОК 8 — «Чисто и безопасно»
   ════════════════════════════════════════════════════════════ */
const SAFETY_ICON: Record<string, string> = {
  shield: "⛨",
  check: "✓",
  law: "§",
  ai: "◇",
};

export function Safety() {
  return (
    <section
      id="safety"
      className="relative overflow-hidden bg-coal px-6 py-24 md:px-12 md:py-32 grain"
    >
      <GoldGlow className="h-[50%] w-[65%]" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal className="max-w-2xl">
          <MonoLabel className="!text-gold">ЧИСТО И БЕЗОПАСНО</MonoLabel>
          <h2 className="mt-5 font-display text-4xl text-offwhite md:text-5xl">
            {safety.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-offwhite/70">
            {safety.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {safety.items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <div className="flex h-full gap-5 rounded-sm border border-white/8 bg-white/[0.015] p-6 md:p-7">
                <span className="font-display text-2xl text-gold/70">
                  {SAFETY_ICON[it.icon] ?? "◦"}
                </span>
                <div>
                  <h3 className="font-display text-xl text-offwhite">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-offwhite/60">
                    {it.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   БЛОК 9 — ОФФЕР И ТАРИФЫ + ЭКОНОМИКА
   ════════════════════════════════════════════════════════════ */
export function Offer() {
  return (
    <section
      id="offer"
      className="relative bg-coal-warm px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <MonoLabel className="!text-gold">ТАРИФЫ</MonoLabel>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-tight text-offwhite md:text-5xl">
            {offer.title}
          </h2>
        </Reveal>

        {/* Экономика */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 max-w-4xl rounded-sm border border-white/10 bg-coal/40 p-6 md:p-9">
            <MonoLabel className="!text-gold">{offer.economics.title}</MonoLabel>
            <div className="mt-6 grid gap-px md:grid-cols-2">
              {offer.economics.comparison.map((c) => (
                <div
                  key={c.label}
                  className={`p-6 ${
                    c.highlighted
                      ? "rounded-sm border border-gold/40 bg-gradient-to-b from-gold/[0.08] to-transparent"
                      : "border-t border-white/8 md:border-t-0 md:border-r"
                  }`}
                >
                  <p className="text-sm text-offwhite/60">{c.label}</p>
                  <p
                    className={`mt-2 font-display text-2xl md:text-3xl ${
                      c.highlighted ? "text-gold-bright" : "text-offwhite/80"
                    }`}
                  >
                    {c.price}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-offwhite/50">
                    {c.note}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm italic text-gold-bright/80">
              {offer.economics.note}
            </p>
          </div>
        </Reveal>

        {/* Тарифы */}
        <div className="mt-14 grid items-stretch gap-5 md:grid-cols-3">
          {offer.tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} className="h-full">
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-sm border p-7 md:p-8 ${
                  t.featured
                    ? "border-gold/60 bg-gradient-to-b from-gold/[0.09] to-transparent"
                    : "border-white/8 bg-white/[0.015]"
                }`}
              >
                {t.featured && (
                  <ShineBorder
                    borderWidth={1.5}
                    duration={10}
                    shineColor={["#c9a24b", "#e8c77a", "#b5582e"]}
                  />
                )}
                <div className="flex items-center justify-between">
                  <MonoLabel
                    className={`!text-[0.56rem] ${
                      t.featured ? "!text-gold-bright" : "!text-offwhite/45"
                    }`}
                  >
                    {t.eyebrow}
                  </MonoLabel>
                  {t.featured && (
                    <MonoLabel className="!text-gold !text-[0.56rem]">
                      РЕКОМЕНДУЮ
                    </MonoLabel>
                  )}
                </div>
                <h3 className="mt-4 font-display text-2xl text-offwhite">
                  {t.name}
                </h3>
                <p
                  className={`mt-2 font-display text-3xl ${
                    t.featured ? "text-gold-bright" : "text-gold"
                  }`}
                >
                  {t.price}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-offwhite/60">
                  {t.desc}
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {t.includes.map((inc, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-sm text-offwhite/70"
                    >
                      <span className="mt-0.5 text-gold/70">·</span>
                      {inc}
                    </li>
                  ))}
                </ul>
                <a
                  href={t.ctaHref}
                  target="_blank"
                  rel="noopener"
                  className="mt-7 block"
                >
                  {t.featured ? (
                    <ShimmerButton className="w-full justify-center gap-2 py-3.5 text-sm font-medium">
                      {t.cta} <span>→</span>
                    </ShimmerButton>
                  ) : (
                    <span className="block w-full rounded-full border border-gold/40 py-3.5 text-center text-sm text-offwhite transition hover:border-gold hover:text-gold-bright">
                      {t.cta} →
                    </span>
                  )}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   БЛОК 10 — ОБ АВТОРЕ
   ════════════════════════════════════════════════════════════ */
export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-coal px-6 py-28 md:px-12 md:py-36 grain"
    >
      <GoldGlow className="h-[60%] w-[75%]" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <Reveal>
          <MonoLabel className="!text-gold">{about.eyebrow}</MonoLabel>
          <h2 className="mt-4 font-display text-6xl leading-[0.95] text-offwhite md:text-8xl">
            {about.name[0]} <span className="italic">{about.name[1]}</span>
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-offwhite/70">
            {about.body}
          </p>
          <p className="mt-5 max-w-2xl font-display text-xl italic leading-relaxed text-gold-bright/85">
            {about.credential}
          </p>
          <ul className="mt-10 space-y-px">
            {about.differentiators.map((d, i) => (
              <li
                key={i}
                className="flex items-start gap-4 border-t border-white/8 py-4 text-offwhite/75"
              >
                <span className="font-mono text-xs text-gold/60">0{i + 1}</span>
                {d}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   БЛОК 11 — ФИНАЛЬНЫЙ CTA
   ════════════════════════════════════════════════════════════ */
export function FinalCta() {
  return (
    <section
      id="final-cta"
      className="relative flex min-h-[92svh] items-center overflow-hidden px-6 grain vignette md:px-12"
    >
      <Image
        src={img("new-04")}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center grade"
      />
      <div className="absolute inset-0 bg-coal/78" />
      <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-coal/60" />
      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display text-4xl leading-[1.1] text-offwhite md:text-6xl">
            {finalCta.title[0]}
            <br />
            <span className="italic text-gold-bright">{finalCta.title[1]}</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-offwhite/75">
            {finalCta.lead}
          </p>
          <p className="mx-auto mt-5 max-w-lg text-sm italic leading-relaxed text-offwhite/55">
            {finalCta.riskReversal}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={finalCta.button.href}
              target="_blank"
              rel="noopener"
              aria-label={finalCta.button.label}
            >
              <ShimmerButton className="group gap-3 px-9 py-4 text-base font-medium">
                {finalCta.button.label}
                <span className="transition group-hover:translate-x-1">→</span>
              </ShimmerButton>
            </a>
            <a
              href={finalCta.secondary.href}
              target="_blank"
              rel="noopener"
              className="mono-label border border-offwhite/25 px-6 py-4 transition hover:border-gold hover:text-gold-bright"
            >
              {finalCta.secondary.label}
            </a>
          </div>
          <p className="mx-auto mt-7 max-w-md text-xs leading-relaxed text-offwhite/45">
            {finalCta.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════════════════════════ */
export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-coal px-6 py-14 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <span className="font-display text-3xl text-offwhite">
            {footer.brand}
          </span>
          <p className="mono-label mt-2 !text-[0.58rem]">{footer.tagline}</p>
        </div>
        <nav className="flex flex-wrap gap-6">
          {footer.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener" : undefined}
              className="mono-label transition hover:text-gold-bright"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="mono-label mt-10 !text-[0.55rem] !text-offwhite/30">
        {footer.copyright}
      </p>
    </footer>
  );
}

export { ActBreak };
