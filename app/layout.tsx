import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ContraindicationBanner } from "@/components/ContraindicationBanner";

// Загружаем шрифт Inter
const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Флюдитек - Официальный сайт",
  description: "Препарат от кашля в форме сиропа и раствора. Имеются противопоказания.",
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