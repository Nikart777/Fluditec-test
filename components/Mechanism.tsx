'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Activity, Wind, Droplets, ChevronRight, MousePointerClick } from 'lucide-react';

const FEATURES = [
  {
    id: 1,
    title: "Действует в верхних и нижних дыхательных путях",
    description: "Комплексный подход: работает от носа до бронхов, не оставляя инфекции шансов.",
    icon: <Activity size={24} />,
    color: "from-indigo-500 to-purple-600",
    shadow: "shadow-purple-500/30",
    bg: "bg-indigo-50"
  },
  {
    id: 2,
    title: "Разжижает и выводит густую мокроту",
    description: "Переводит сухой кашель во влажный, облегчая откашливание с первых дней.",
    icon: <Wind size={24} />,
    color: "from-yellow-400 to-orange-500",
    shadow: "shadow-yellow-500/30",
    bg: "bg-yellow-50"
  },
  {
    id: 3,
    title: "Уменьшает количество мокроты",
    description: "Регулирует работу клеток: мокроты становится ровно столько, сколько нужно для защиты.",
    icon: <Droplets size={24} />,
    color: "from-teal-400 to-emerald-500",
    shadow: "shadow-teal-500/30",
    bg: "bg-teal-50"
  },
  {
    id: 4,
    title: "Повышает защитные функции слизистой дыхательных путей",
    description: "Повышает местный иммунитет, помогая организму бороться с вирусами самостоятельно.",
    icon: <ShieldCheck size={24} />,
    color: "from-red-400 to-pink-500",
    shadow: "shadow-red-500/30",
    bg: "bg-red-50"
  }
];

// --- ЭФФЕКТЫ ---

// 1. Маркеры локализации
const LocalizationMarkers = () => (
  <>
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-[30%] left-[50%] -translate-x-1/2 z-20">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75" />
      <span className="relative inline-flex rounded-full h-8 w-8 bg-brand-yellow border-4 border-white shadow-lg" />
      <div className="absolute left-10 top-1 bg-white/95 px-2 py-1 rounded text-[10px] font-bold shadow-sm whitespace-nowrap text-brand-purple">Верхние пути</div>
    </motion.div>
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="absolute top-[72%] left-[50%] -translate-x-1/2 z-20">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-40" />
      <span className="relative inline-flex rounded-full h-12 w-12 bg-brand-teal border-4 border-white shadow-lg" />
      <div className="absolute right-14 top-2 bg-white/95 px-2 py-1 rounded text-[10px] font-bold shadow-sm whitespace-nowrap text-brand-purple">Нижние пути</div>
    </motion.div>
  </>
);

// 2. Анимация разжижения (ИСПРАВЛЕНА: более заметные частицы)
const DistributedLiquefyEffect = () => {
    // Точки, где происходит "магия" (легкие, горло)
    const points = [
        { top: '35%', left: '50%' },
        { top: '55%', left: '45%' },
        { top: '55%', left: '55%' },
        { top: '70%', left: '40%' },
        { top: '70%', left: '60%' },
    ];

    return (
        <>
            {points.map((pos, i) => (
                 <div key={i} className="absolute w-16 h-16 flex items-center justify-center pointer-events-none" style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -50%)' }}>
                    {/* Центральное свечение */}
                    <motion.div
                        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute w-8 h-8 bg-yellow-400/30 rounded-full blur-md"
                    />
                    {/* Разлетающиеся частицы */}
                    {[...Array(4)].map((_, j) => (
                        <motion.div
                            key={j}
                            className="absolute w-2 h-2 bg-blue-400 rounded-full"
                            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                            animate={{ 
                                x: (Math.random() - 0.5) * 60, 
                                y: (Math.random() - 0.5) * 60, 
                                opacity: 0, 
                                scale: 0 
                            }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                delay: Math.random() * 0.5,
                                ease: "easeOut" 
                            }}
                        />
                    ))}
                 </div>
            ))}
        </>
    );
};

// 3. Выведение
const EvacuationEffect = () => (
  <motion.div className="absolute top-[25%] left-[48%] -translate-x-1/2 w-32 h-[350px] overflow-hidden z-10 pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-t from-teal-100/40 to-transparent blur-md" />
    {[...Array(12)].map((_, i) => (
      <motion.div key={i} className="absolute bg-teal-500 rounded-full opacity-60"
        style={{ width: Math.random() * 4 + 3, height: Math.random() * 4 + 3, left: Math.random() * 80 + 10 + '%' }}
        initial={{ top: '100%', opacity: 0 }} animate={{ top: '-10%', opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.15, ease: 'linear' }}
      />
    ))}
  </motion.div>
);

// 4. Защита
const ShieldEffect = () => (
  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
      <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 3 }}>
          <ShieldCheck size={100} className="text-emerald-500 drop-shadow-2xl" />
      </motion.div>
      <motion.div 
         className="absolute inset-0 bg-emerald-400/10 rounded-full blur-3xl z-[-1]"
         animate={{ opacity: [0.2, 0.4, 0.2] }}
         transition={{ duration: 2, repeat: Infinity }}
      />
  </div>
);

// МОБИЛЬНЫЙ ВИЗУАЛ
const MobileVisual = ({ id }: { id: number }) => (
    <div className="w-full h-56 relative bg-blue-50/50 rounded-xl overflow-hidden mb-4 border border-blue-100 flex items-center justify-center mt-2">
        <img src="https://fluditec.ru/media/img/caughImg.png" alt="" className="h-full object-contain opacity-40 mix-blend-multiply absolute py-4" />
        <div className="relative z-10 w-full h-full">
            {id === 1 && <LocalizationMarkers />}
            {id === 2 && <DistributedLiquefyEffect />}
            {id === 3 && <EvacuationEffect />}
            {id === 4 && <ShieldEffect />}
        </div>
    </div>
);

export const Mechanism = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="relative py-24 bg-white overflow-hidden" id="mechanism-section">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* --- ЛЕВАЯ ЧАСТЬ: ДЕСКТОП --- */}
          <div className="hidden lg:block sticky top-24 z-30">
            <motion.div
              layoutId="display-container"
              className="relative h-[650px] w-full flex justify-center items-center bg-blue-50/50 rounded-[3rem] overflow-hidden border border-blue-100/80 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)]"
            >
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
              <div className="relative z-10 h-full w-full flex items-center justify-center p-8 overflow-hidden">
                  <img src="https://fluditec.ru/media/img/caughImg.png" alt="Механизм" className="h-full object-contain max-w-full drop-shadow-lg opacity-80 mix-blend-multiply" />
                  <AnimatePresence mode='wait'>
                    {activeStep === 1 && <LocalizationMarkers key="1" />}
                    {activeStep === 2 && <DistributedLiquefyEffect key="2" />}
                    {activeStep === 3 && <EvacuationEffect key="3" />}
                    {activeStep === 4 && <ShieldEffect key="4" />}
                  </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* --- ПРАВАЯ ЧАСТЬ --- */}
          <div className="pt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1]">
                УМНЫЙ ПОДХОД <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-indigo-600">
                  К ЛЕЧЕНИЮ
                </span>
              </h2>
              {/* Подсказка для мобильных */}
              <div className="lg:hidden mt-4 flex items-center gap-2 text-brand-purple text-sm font-bold bg-brand-purple/5 p-3 rounded-lg border border-brand-purple/10">
                  <MousePointerClick className="animate-bounce" size={20} />
                  <span>Нажимайте на этапы, чтобы увидеть действие</span>
              </div>
            </motion.div>

            <div className="space-y-4 relative z-10">
              <div className="absolute left-[2.5rem] top-8 bottom-8 w-0.5 bg-gradient-to-b from-brand-purple/20 via-gray-200 to-transparent z-0 hidden md:block" />

              {FEATURES.map((feature, index) => {
                 const isActive = activeStep === feature.id;

                 return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                  className="relative z-10 perspective-1000"
                >
                  <button
                    onClick={() => setActiveStep(feature.id)}
                    className={`
                        w-full text-left flex flex-col p-6 rounded-[2rem] transition-all duration-300 relative overflow-hidden group outline-none border-2
                        ${isActive
                            ? 'bg-white border-brand-purple/30 shadow-lg scale-[1.01]'
                            : 'bg-white/50 border-transparent hover:bg-white border hover:border-gray-100 hover:shadow-xl'
                        }
                    `}
                  >
                      {/* Шапка карточки */}
                      <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-4 md:gap-6 relative z-20">
                           <div className="relative shrink-0">
                              <div className={`hidden md:block absolute top-8 -left-[3.35rem] w-5 h-5 rounded-full border-4 border-white shadow-md transition-all duration-500 ${isActive ? 'bg-brand-purple scale-110 ring-4 ring-brand-purple/20' : 'bg-gray-300 group-hover:bg-brand-purple/50'}`} />
                              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${feature.color} ${feature.shadow} shadow-lg flex items-center justify-center text-white transition-all duration-500`}>
                                {feature.icon}
                              </div>
                          </div>

                          <div className="flex-1 w-full">
                             <div className="flex items-center justify-between w-full">
                                <h3 className={`text-lg md:text-xl font-bold transition-colors duration-300 ${isActive ? 'text-brand-purple' : 'text-gray-900'}`}>
                                  {feature.title}
                                </h3>
                                {/* Стрелка для десктопа */}
                                <ChevronRight className={`hidden md:block transition-all duration-300 ${isActive ? 'text-brand-purple rotate-90' : 'text-gray-300'}`} size={24} />
                                {/* Индикатор раскрытия для мобилки */}
                                <div className={`md:hidden px-2 py-1 rounded-full text-xs font-bold transition-colors ${isActive ? 'bg-brand-purple text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    {isActive ? 'Скрыть' : 'Показать'}
                                </div>
                             </div>
                          </div>
                      </div>

                      {/* Контент */}
                      <AnimatePresence>
                        {isActive && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="w-full overflow-hidden"
                            >
                                <p className="font-medium leading-relaxed text-sm text-gray-600 md:pl-[5.5rem] mt-2 mb-4">
                                    {feature.description}
                                </p>

                                {/* Мобильный визуал внутри карточки */}
                                <div className="lg:hidden w-full">
                                    <MobileVisual id={feature.id} />
                                </div>
                            </motion.div>
                        )}
                      </AnimatePresence>
                  </button>
                </motion.div>
              )})}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};