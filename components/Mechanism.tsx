'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Activity, Wind, Droplets, Zap, ChevronRight, MousePointerClick } from 'lucide-react';

// --- ДАННЫЕ ---
// Тексты обновлены по вашему требованию. Subtitle убран, так как новый заголовок самодостаточен.
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

// --- КОМПОНЕНТЫ ВИЗУАЛИЗАЦИИ ---

// 1. Маркеры локализации
const LocalizationMarkers = () => (
  <>
    {/* Верхние пути */}
    <motion.div
       initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
       className="absolute top-[30%] left-[50%] -translate-x-1/2 z-20"
    >
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-yellow opacity-75" />
      <span className="relative inline-flex rounded-full h-8 w-8 bg-brand-yellow border-4 border-white shadow-lg" />
      <div className="absolute left-10 top-1 bg-white/95 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md whitespace-nowrap text-brand-purple">Верхние пути</div>
    </motion.div>

    {/* Нижние пути */}
    <motion.div
       initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ delay: 0.2 }}
       className="absolute top-[72%] left-[50%] -translate-x-1/2 z-20"
    >
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-40" />
      <span className="relative inline-flex rounded-full h-12 w-12 bg-brand-teal border-4 border-white shadow-lg" />
      <div className="absolute right-14 top-2 bg-white/95 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md whitespace-nowrap text-brand-purple">Нижние пути</div>
    </motion.div>
  </>
);


// 2. Анимация разжижения
interface SingleLiquefyPointProps {
  top: string;
  left: string;
  delay: number;
}

const ACTION_POINTS = [
  { id: 'p1', top: '30%', left: '50%', delay: 0 },    
  { id: 'p2', top: '50%', left: '50%', delay: 0.1 },  
  { id: 'p3', top: '68%', left: '38%', delay: 0.2 },  
  { id: 'p4', top: '72%', left: '62%', delay: 0.3 },  
];

const SingleLiquefyPoint = ({ top, left, delay }: SingleLiquefyPointProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="absolute -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center z-10"
    style={{ top, left }}
  >
    <motion.div
      animate={{ scale: [1, 0.6, 0], opacity: [1, 0.8, 0] }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      className="absolute w-10 h-10 bg-amber-400/90 rounded-full blur-[3px] shadow-sm"
    />
    {[...Array(8)].map((_, i) => (
       <motion.div
         key={i}
         className="absolute bg-blue-500 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)]"
         initial={{ width: 0, height: 0, x: 0, y: 0 }}
         animate={{
            width: Math.random() * 6 + 3,
            height: Math.random() * 6 + 3,
            x: (Math.random() - 0.5) * 70,
            y: (Math.random() - 0.5) * 70,
            opacity: [1, 1, 0]
         }}
         transition={{ duration: 1.8, repeat: Infinity, delay: Math.random() * 0.5 }}
       />
    ))}
  </motion.div>
)

const DistributedLiquefyEffect = () => (
  <>
    {ACTION_POINTS.map(point => (
      <SingleLiquefyPoint key={point.id} {...point} />
    ))}
  </>
);


// 3. Анимация выведения
const EvacuationEffect = () => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="absolute top-[25%] left-[48%] -translate-x-1/2 w-24 h-[300px] overflow-hidden z-10"
  >
    <div className="absolute inset-0 bg-gradient-to-t from-teal-100/30 to-transparent blur-md" />
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-teal-400/80 rounded-full blur-[1px] shadow-sm"
        style={{ width: Math.random() * 6 + 4, height: Math.random() * 6 + 4, left: Math.random() * 100 + '%' }}
        initial={{ top: '100%', opacity: 0 }}
        animate={{ top: '-20%', opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
      />
    ))}
  </motion.div>
);


// 4. Анимация защиты
const ShieldEffect = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
    className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20"
  >
    <div className="relative flex items-center justify-center">
      <motion.div
         animate={{ rotate: [0, 5, -5, 0] }}
         transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
          <ShieldCheck size={100} className="text-emerald-500 drop-shadow-2xl relative z-10" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute inset-0 bg-emerald-400/50 rounded-full -z-10 blur-2xl"
      />
       <motion.div
        animate={{ scale: [1.2, 2], opacity: [0.3, 0] }}
        transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
        className="absolute inset-0 bg-teal-300/30 rounded-full -z-20 blur-3xl"
      />
    </div>
     <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="text-center mt-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold text-emerald-700 shadow-md"
     >
        Защита восстановлена
     </motion.p>
  </motion.div>
);


export const Mechanism = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="relative py-24 bg-white overflow-hidden" id="mechanism-section">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* --- ЛЕВАЯ ЧАСТЬ: ИНТЕРАКТИВНАЯ СХЕМА --- */}
          <div className="sticky top-24 z-30">
            <motion.div
              layoutId="display-container"
              className="relative h-[650px] w-full flex justify-center items-center bg-blue-50/50 rounded-[3rem] overflow-hidden border border-blue-100/80 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)]"
            >
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f61a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f61a_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />

              <div className="relative z-10 h-full w-full flex items-center justify-center p-8 overflow-hidden">
                  <img
                      src="https://fluditec.ru/media/img/caughImg.png"
                      alt="Механизм действия"
                      className="h-full object-contain max-w-full drop-shadow-lg opacity-80 mix-blend-multiply"
                  />

                  <AnimatePresence mode='wait'>
                    {activeStep === 1 && <LocalizationMarkers key="step1" />}
                    {activeStep === 2 && <DistributedLiquefyEffect key="step2" />}
                    {activeStep === 3 && <EvacuationEffect key="step3" />}
                    {activeStep === 4 && <ShieldEffect key="step4" />}
                  </AnimatePresence>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}
                    className="absolute bottom-8 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-brand-purple/10 shadow-lg text-xs font-bold text-brand-purple flex items-center gap-3 z-30"
                  >
                     <MousePointerClick size={16} className="animate-bounce" />
                     Нажимайте на этапы справа, чтобы увидеть действие на схеме
                  </motion.div>
              </div>
            </motion.div>
          </div>

          {/* --- ПРАВАЯ ЧАСТЬ: ИНТЕРАКТИВНЫЙ СПИСОК --- */}
          <div className="pt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-purple/5 rounded-full border border-brand-purple/10 text-brand-purple text-xs font-bold uppercase tracking-wider mb-6">
                  <Zap size={14} className="fill-brand-purple" />
                  Механизм действия
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1]">
                УМНЫЙ ПОДХОД <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-indigo-600">
                  К ЛЕЧЕНИЮ
                </span>
              </h2>
            </motion.div>

            <div className="space-y-5 relative z-10">
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
                  <motion.button
                    onClick={() => setActiveStep(feature.id)}
                    whileHover={{ scale: isActive ? 1.02 : 1.01, x: isActive ? 0 : 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                        w-full text-left flex flex-col md:flex-row items-start gap-6 p-6 rounded-[2rem] transition-all duration-300 relative overflow-hidden group outline-none
                        ${isActive
                            ? 'bg-white border-brand-purple/30 shadow-[0_10px_40px_-10px_rgba(139,92,246,0.3)] scale-[1.02]'
                            : 'bg-white/50 border-transparent hover:bg-white border hover:border-gray-100 hover:shadow-xl'
                        }
                        border-2
                    `}
                  >
                      {isActive && (
                          <motion.div
                            layoutId="active-glow"
                            className="absolute inset-0 bg-gradient-to-r from-brand-purple/5 to-transparent opacity-50 -z-10"
                          />
                      )}

                      <span className={`absolute -right-2 -top-4 text-8xl font-black transition-colors select-none pointer-events-none ${isActive ? 'text-brand-purple/10' : 'text-gray-200/50 group-hover:text-gray-100'}`}>
                        0{feature.id}
                      </span>

                      <div className="relative shrink-0">
                          <div className={`hidden md:block absolute top-8 -left-[3.35rem] w-5 h-5 rounded-full border-4 border-white shadow-md transition-all duration-500 ${isActive ? 'bg-brand-purple scale-110 ring-4 ring-brand-purple/20' : 'bg-gray-300 group-hover:bg-brand-purple/50'}`} />

                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} ${feature.shadow} shadow-lg flex items-center justify-center text-white transition-all duration-500 ${isActive ? 'rotate-[10deg] scale-110 shadow-xl' : 'group-hover:rotate-3 group-hover:scale-105'}`}>
                            {feature.icon}
                          </div>
                      </div>

                      <div className="relative z-10 flex-1 pt-1">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className={`text-xl font-bold transition-colors duration-300 ${isActive ? 'text-brand-purple' : 'text-gray-900 group-hover:text-brand-purple'}`}>
                              {feature.title}
                              {/* Единичка как сноска */}
                              <sup className="text-xs ml-0.5 align-top opacity-70">1</sup>
                            </h3>
                            <ChevronRight className={`transition-all duration-300 ${isActive ? 'text-brand-purple translate-x-2 opacity-100' : 'text-gray-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0'}`} size={24} strokeWidth={3} />
                        </div>

                        {/* Subtitle удален, так как новый заголовок покрывает суть */}
                        
                        <p className={`font-medium leading-relaxed text-sm transition-colors duration-300 ${isActive ? 'text-gray-600' : 'text-gray-500'}`}>
                          {feature.description}
                        </p>
                      </div>
                  </motion.button>
                </motion.div>
              )})}
            </div>

            <p className="mt-12 text-[10px] text-gray-400 max-w-sm ml-10 font-medium">
              1. Инструкция по медицинскому применению препарата Флюдитек.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};