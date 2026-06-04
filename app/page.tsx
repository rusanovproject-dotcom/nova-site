import Hero from "@/components/Hero";
import TimecodeHUD from "@/components/TimecodeHUD";
import {
  Overture,
  Cases,
  BotanicalReel,
  Gallery,
  ColorDirection,
  Manifesto,
  About,
  Process,
  ForWhom,
  Offer,
  FinalCta,
  Footer,
} from "@/components/Scenes";

export default function Home() {
  return (
    <main className="relative bg-coal">
      <TimecodeHUD />
      <Hero />
      <Overture />
      {/* Четыре концепт-проекта — демонстрация возможностей */}
      <Cases />
      <ColorDirection />
      {/* Смысловой блок + автор */}
      <Manifesto />
      <About />
      <Process />
      <ForWhom />
      <Offer />
      <FinalCta />
      {/* Закрытие — образы, которых не существовало */}
      <BotanicalReel />
      <Gallery />
      <Footer />
    </main>
  );
}
