"use client";

import { useEffect, useRef, useState } from "react";

/* Видео-плеер: poster, lazy autoplay по IntersectionObserver, muted/loop/playsinline */
export default function CinemaVideo({
  mp4,
  webm,
  poster,
  className = "",
  ratio = "aspect-[9/16]",
  eager = false,
  heightFit = false,
}: {
  mp4: string;
  webm?: string;
  poster: string;
  className?: string;
  ratio?: string;
  eager?: boolean;
  heightFit?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(eager);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setLoad(true);
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={`${heightFit ? `${ratio} h-full w-auto` : `${ratio} w-full`} object-cover ${className}`}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={eager}
      preload={eager ? "auto" : "none"}
    >
      {load && webm && <source src={webm} type="video/webm" />}
      {load && <source src={mp4} type="video/mp4" />}
    </video>
  );
}
