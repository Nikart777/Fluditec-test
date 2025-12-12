import { Hero } from "@/components/Hero";
import { Navigator } from "@/components/Navigator";
import { Mechanism } from "@/components/Mechanism";
import { Dosage } from "@/components/Dosage";
import { Advantages } from "@/components/Advantages";
import { Comparison } from "@/components/Comparison";
import { WhereToBuy } from "@/components/WhereToBuy";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ"; // Импортируем FAQ
import { ShoppingCart } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />
      <Navigator />
      <Mechanism />
      <Dosage />
      <Advantages />
      <Comparison />
      <WhereToBuy />
      <FAQ />        {/* Добавили блок FAQ перед футером */}
      <Footer />

      {/* STICKY BUY BUTTON (Только мобилка) */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-gray-200 z-40 md:hidden flex justify-between items-center shadow-[0_-5px_20px_rgba(0,0,0,0.1)] pb- safe-area-inset-bottom">
         <div className="text-sm">
            <span className="block font-bold text-gray-900">Флюдитек</span>
            <span className="text-brand-purple font-medium">от 450 ₽</span>
         </div>
         <a href="#where-to-buy" className="bg-brand-yellow text-gray-900 px-6 py-2.5 rounded-full font-bold flex items-center gap-2 shadow-md hover:bg-yellow-400 transition-colors">
            Купить <ShoppingCart size={16} />
         </a>
      </div>
    </>
  );
}