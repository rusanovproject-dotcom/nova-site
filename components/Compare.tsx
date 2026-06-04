"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";

/* Before/After слайдер — приём Aceternity Compare.
   Перетаскивание / движение мыши открывает второй грейд. */
export default function Compare({
  before,
  after,
  beforeLabel,
  afterLabel,
  alt,
}: {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  alt: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[3/4] overflow-hidden rounded-sm select-none cursor-ew-resize grade"
      onMouseMove={(e) => dragging.current && move(e.clientX)}
      onMouseDown={(e) => {
        dragging.current = true;
        move(e.clientX);
      }}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onTouchStart={(e) => move(e.touches[0].clientX)}
    >
      {/* after (base) */}
      <Image
        src={after}
        alt={`${alt} — терракотовый грейд`}
        fill
        sizes="(max-width:768px) 100vw, 50vw"
        className="object-cover"
      />
      <span className="mono-label absolute bottom-4 right-4 z-20 !text-offwhite/90">
        {afterLabel}
      </span>

      {/* before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <div
          className="absolute inset-0"
          style={{ width: ref.current?.offsetWidth ?? "100%" }}
        >
          <Image
            src={before}
            alt={`${alt} — холодный грейд`}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <span className="mono-label absolute bottom-4 left-4 z-20 !text-offwhite/90">
          {beforeLabel}
        </span>
      </div>

      {/* handle */}
      <div
        className="absolute top-0 bottom-0 z-30 w-px bg-gold-bright"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-gold-bright bg-coal/60 backdrop-blur-sm">
          <span className="text-gold-bright text-xs">◂ ▸</span>
        </div>
      </div>
    </div>
  );
}
