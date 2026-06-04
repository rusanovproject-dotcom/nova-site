import Hero from "@/components/Hero";
import TimecodeHUD from "@/components/TimecodeHUD";
import {
  Overture,
  Cases,
  SeriesIntro,
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
      <Cases />
      <SeriesIntro />
      <Gallery />
      <ColorDirection />
      <Manifesto />
      <About />
      <Process />
      <ForWhom />
      <Offer />
      <FinalCta />
      <Footer />
    </main>
  );
}
