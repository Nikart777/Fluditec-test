'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Stethoscope, HelpCircle, FileText } from 'lucide-react';
import Link from 'next/link';
import { NAV_LINKS } from '@/lib/constants'; 

interface NavLinkItem {
  id: number;
  title: string;
  href: string;
}

const ICONS: Record<string, React.ReactNode> = {
  'Для врачей': <Stethoscope size={20} />,
  'Частые вопросы': <HelpCircle size={20} />,
  'Формы': <FileText size={20} />,
};

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    // Проверяем скролл сразу при загрузке, чтобы не было мигания если страница обновлена не в топе
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Цвета в зависимости от состояния скролла
  const textColorClass = scrolled ? 'text-gray-600 hover:text-brand-purple' : 'text-white/90 hover:text-white';
  const logoColorClass = scrolled ? 'text-brand-purple' : 'text-white';
  const buttonBgClass = scrolled ? 'bg-brand-purple text-white' : 'bg-white text-brand-purple';
  const burgerColorClass = scrolled ? 'text-brand-purple' : 'text-white';

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center">
               <span className={`text-2xl font-black tracking-tighter transition-colors duration-300 ${logoColorClass}`}>
                 ФЛЮДИТЕК
               </span>
               <div className="w-2 h-2 rounded-full bg-brand-yellow ml-1 mt-3 animate-pulse"></div>
            </div>
          </Link>

          {/* Десктоп Меню */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link: NavLinkItem) => (
              <Link 
                key={link.id} 
                href={link.href} 
                className={`font-medium transition-colors duration-300 flex items-center gap-2 ${textColorClass}`}
              >
                {link.title}
              </Link>
            ))}
            <Link 
              href="/#buy" 
              className={`px-6 py-2 rounded-full font-bold transition-all hover:scale-105 shadow-lg ${buttonBgClass}`}
            >
              Где купить
            </Link>
          </div>

          {/* Мобильный бургер */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={`p-2 transition-colors ${burgerColorClass}`}>
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Мобильное меню (всегда на белом фоне) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-40 bg-white lg:hidden pt-24 px-6"
          >
            <div className="flex flex-col space-y-6">
              {NAV_LINKS.map((link: NavLinkItem) => (
                <Link 
                  key={link.id} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold text-gray-800 flex items-center gap-4 border-b border-gray-100 pb-4"
                >
                  <span className="text-brand-purple">{ICONS[link.title]}</span>
                  {link.title}
                </Link>
              ))}
              <div className="flex flex-col gap-4 pt-4">
                 <Link href="/adults" className="w-full py-4 bg-brand-purple text-white text-center rounded-xl font-bold shadow-lg">
                    Для взрослых
                 </Link>
                 <Link href="/parents" className="w-full py-4 bg-brand-yellow text-gray-900 text-center rounded-xl font-bold shadow-lg">
                    Для родителей
                 </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};