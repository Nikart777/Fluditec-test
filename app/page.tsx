import { Hero } from "@/components/Hero";
import { Mechanism } from "@/components/Mechanism";
import { Advantages } from "@/components/Advantages"; // Импортируем новый блок

export default function Home() {
  return (
    <>
      <Hero />
      <Mechanism />
      <Advantages />
      {/* Далее по плану:
         - Video (Видео)
         - WhereToBuy (Где купить)
         - FAQ (Вопросы)
      */}
    </>
  );
}