import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ContraindicationBanner } from "@/components/ContraindicationBanner";

// Загружаем шрифт Inter
const inter = Inter({ subsets: ["latin", "cyrillic"] });

// 1. ОПТИМИЗАЦИЯ: Обновленные мета-данные согласно аудиту
export const metadata: Metadata = {
  title: "Флюдитек - сироп от кашля для детей и взрослых. Лечение влажного кашля.",
  description: "Комплексное лечение кашля и насморка для всей семьи. Узнайте схему приема и где купить Флюдитек (Карбоцистеин).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <ContraindicationBanner />
      </body>
    </html>
  );
}