"use client";

import { useEffect, useState } from "react";

/* Тайм-код-HUD в углу — "director's cut". Меняется по прогрессу скролла. */
export default function TimecodeHUD() {
  const [tc, setTc] = useState("00:00:00:00");
  const [reel, setReel] = useState("01");

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      const totalFrames = Math.floor(p * 11 * 60 * 24); // 11 "scenes", 24fps
      const f = totalFrames % 24;
      const s = Math.floor(totalFrames / 24) % 60;
      const m = Math.floor(totalFrames / (24 * 60)) % 60;
      const h = Math.floor(totalFrames / (24 * 3600));
      const pad = (n: number) => String(n).padStart(2, "0");
      setTc(`${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`);
      setReel(pad(Math.min(11, Math.floor(p * 11) + 1)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 hidden md:flex flex-col items-end gap-1 mix-blend-difference">
      <span className="font-mono text-[0.62rem] tracking-[0.2em] text-offwhite/70">
        REC ● {tc}
      </span>
      <span className="font-mono text-[0.62rem] tracking-[0.3em] text-offwhite/50">
        SC {reel} / 11
      </span>
    </div>
  );
}
