'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ban, Droplets, Clock, Smile, CheckCircle, Coffee, Feather, ChevronRight, Plus } from 'lucide-react';

const SECTIONS = [
  {
    id: 'sachet',
    title: "ВЗРОСЛЫМ",
    subtitle: "Раствор в саше (15+)",
    color: "bg-brand-purple",
    textColor: "text-white",
    image: "https://fluditec.ru/upload/iblock/8ff/rwocjm0r8ubsmw3i049kb6enlogr8fyn.png",
    benefits: [
      { text: "Без сахара", sub: "Безопасно", icon: <Ban /> },
      { text: "На ходу", sub: "Не нужно запивать", icon: <Coffee /> },
      { text: "Карамель", sub: "Приятный вкус", icon: <Smile /> },
      { text: "1 Саше", sub: "3 раза в день", icon: <Clock /> },
    ]
  },
  {
    id: 'kids',
    title: "ДЕТЯМ",
    subtitle: "Сироп 20 мг/мл (2+)",
    color: "bg-brand-yellow",
    textColor: "text-gray-900",
    image: "https://fluditec.ru/upload/iblock/bf8/h1bbu3me2vdhiypuggnhfkkcg1y7x2d5.png",
    benefits: [
      { text: "Банан", sub: "Любимый вкус", icon: "🍌", isEmoji: true },
      { text: "С 2 лет", sub: "Разрешено малышам", icon: <Feather /> },
      { text: "5 мл", sub: "Удобная доза", icon: <Droplets /> },
      { text: "Без спирта", sub: "Бережный состав", icon: <CheckCircle /> },
    ]
  },
  {
    id: 'syrup',
    title: "СИРОП",
    subtitle: "Для взрослых (15+)",
    color: "bg-brand-teal",
    textColor: "text-white",
    image: "https://fluditec.ru/upload/iblock/67f/3a7gvo4xrcspbetfa0p6n6v6oywkyv1d.png",
    benefits: [
      { text: "Карамель", sub: "Классический вкус", icon: "🍮", isEmoji: true },
      { text: "15 мл", sub: "Мерный стаканчик", icon: <Droplets /> },
      { text: "Мягко", sub: "Действие", icon: <Feather /> },
      { text: "3 раза", sub: "В день", icon: <Clock /> },
    ]
  }
];

export const Advantages = () => {
  const [activeId, setActiveId] = useState<string>('kids');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleToggle = (id: string) => {
    setActiveId(id);
    
    // На мобильных устройствах скроллим к началу открытого элемента, 
    // чтобы контент был перед глазами
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  return (
    // Добавил pb-40, чтобы на мобилке контент не прятался за плашкой противопоказаний
    <section className="py-24 pb-40 bg-white overflow-hidden" id="advantages">
      <div className="container mx-auto px-6">
        
        {/* Заголовок */}
        <div className="mb-16 text-center">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block"
             >
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-4">
                    Форма <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-teal">под тебя</span>
                </h2>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                    Выберите подходящий формат и узнайте о его преимуществах
                </p>
             </motion.div>
        </div>

        {/* ИНТЕРАКТИВНЫЙ АККОРДЕОН */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[650px]">
          {SECTIONS.map((section) => {
            const isActive = activeId === section.id;
            
            return (
              <motion.div
                key={section.id}
                ref={(el) => { if (el) sectionRefs.current[section.id] = el; }} // Исправил присвоение ref: не возвращаем ничего
                layout
                onClick={() => handleToggle(section.id)}
                // Мобилка: h-24 для свернутых, h-auto для активного. Десктоп: flex логика.
                className={`
                    relative rounded-[2rem] lg:rounded-[3rem] overflow-hidden cursor-pointer 
                    transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] 
                    ${section.color} 
                    ${isActive 
                        ? 'lg:flex-[3] flex-auto min-h-[600px] lg:min-h-0 shadow-2xl z-10' 
                        : 'lg:flex-[0.5] flex-none h-24 lg:h-auto hover:lg:flex-[0.8] opacity-95 hover:opacity-100'
                    }
                `}
              >
                {/* Декоративный фон */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white_0%,transparent_60%)] pointer-events-none" />

                <div className="absolute inset-0 flex flex-col p-6 md:p-8">
                    
                    {/* Хедер карточки */}
                    <div className="flex justify-between items-center lg:items-start z-20 h-full lg:h-auto">
                        <div className={`transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'translate-y-0 lg:opacity-0 lg:-translate-y-4'}`}>
                            <h3 className={`text-2xl md:text-4xl font-black uppercase ${section.textColor} leading-none mb-1`}>{section.title}</h3>
                            <p className={`text-sm md:text-lg font-bold opacity-80 ${section.textColor} truncate pr-4`}>{section.subtitle}</p>
                        </div>
                        
                        {/* Вертикальный заголовок (только десктоп, когда свернуто) */}
                        {!isActive && (
                            <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
                                <span 
                                    className={`text-5xl font-black uppercase whitespace-nowrap ${section.textColor} tracking-widest opacity-40`}
                                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                                >
                                    {section.title}
                                </span>
                            </div>
                        )}
                        
                        {/* Иконка-индикатор (Плюс/Стрелка) */}
                        <div className={`shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md transition-transform duration-300 ${section.textColor} ${isActive ? 'rotate-90 scale-90' : 'rotate-0 scale-100'}`}>
                            {isActive ? <ChevronRight size={20} /> : <Plus size={20} />}
                        </div>
                    </div>

                    {/* КОНТЕНТ (Только когда активно) */}
                    <AnimatePresence mode='popLayout'>
                        {isActive && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="flex-1 flex flex-col lg:flex-row items-center justify-between mt-6 lg:mt-0 relative z-10 pt-4 lg:pt-0"
                            >
                                {/* Летающий продукт */}
                                <motion.div 
                                    initial={{ scale: 0.8, y: 50, rotate: -10 }}
                                    animate={{ scale: 1, y: 0, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                                    className="w-64 md:w-80 lg:w-[28rem] shrink-0 drop-shadow-2xl z-10 mb-8 lg:mb-0 lg:-ml-12"
                                >
                                    <img 
                                        src={section.image} 
                                        alt={section.title} 
                                        className="w-full object-contain max-h-[350px] md:max-h-[450px] lg:max-h-[600px]" 
                                    />
                                </motion.div>

                                {/* Сетка преимуществ */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg pb-4 lg:pb-0">
                                    {section.benefits.map((benefit, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + idx * 0.1 }}
                                            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-colors flex items-center gap-4 lg:flex-col lg:items-start lg:justify-between lg:min-h-[140px]"
                                        >
                                            <div className={`text-3xl lg:text-4xl lg:mb-auto ${section.textColor}`}>
                                                {benefit.isEmoji ? benefit.icon : React.cloneElement(benefit.icon as any, { size: 28, strokeWidth: 1.5 })}
                                            </div>
                                            <div>
                                                <p className={`text-base lg:text-lg font-bold leading-tight mb-0.5 ${section.textColor}`}>{benefit.text}</p>
                                                <p className={`text-xs font-medium opacity-70 uppercase tracking-wide ${section.textColor}`}>{benefit.sub}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};