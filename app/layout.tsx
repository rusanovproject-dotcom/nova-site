import type { Metadata } from "next";
import { Fraunces, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const jetMono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "NOVA — Анастасия Нехаева · Визуальные миры для брендов",
  description:
    "У каждого бренда есть история. Я нахожу её — и снимаю. Визуал уровня глянцевой кампании: концепция, сценарий, режиссура, продакшн, монтаж.",
  openGraph: {
    title: "NOVA — Анастасия Нехаева",
    description: "Визуальные миры для брендов. Полный цикл — от идеи до ролика.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${fraunces.variable} ${geist.variable} ${jetMono.variable}`}
    >
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
