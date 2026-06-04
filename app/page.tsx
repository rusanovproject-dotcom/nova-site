import Hero from "@/components/Hero";
import TimecodeHUD from "@/components/TimecodeHUD";
import {
  PainOverture,
  BlindTest,
  ProductStaysYours,
  FullCycle,
  Cases,
  Process,
  Safety,
  Offer,
  About,
  FinalCta,
  Footer,
} from "@/components/Scenes";

export default function Home() {
  return (
    <main className="relative bg-coal">
      <TimecodeHUD />
      <Hero />
      {/* Нерв — знакомая боль */}
      <PainOverture />
      {/* Главное доказательство — слепой тест */}
      <BlindTest />
      {/* Возражение «исказит мой продукт» */}
      <ProductStaysYours />
      {/* Категорийный сдвиг — режиссёр, не нейро-оператор */}
      <FullCycle />
      {/* Кейсы по нишам */}
      <Cases />
      {/* Прозрачный процесс */}
      <Process />
      {/* Юр-рамки */}
      <Safety />
      {/* Тарифы + экономика */}
      <Offer />
      {/* Лицо и почерк */}
      <About />
      {/* Финальный трипвайр 5К */}
      <FinalCta />
      <Footer />
    </main>
  );
}
