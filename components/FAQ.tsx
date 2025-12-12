'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: "КАКОВА ПРОДОЛЖИТЕЛЬНОСТЬ ЛЕЧЕНИЯ ФЛЮДИТЕК?",
    // Исправил опечатку в исходном HTML: <sup/> -> </sup>
    answer: <>Лечение не должно продолжаться более 8 дней без консультации с врачом<sup>1</sup></>
  },
  {
    question: "КАКИЕ ОСОБЕННОСТИ ПРИЕМА ФЛЮДИТЕК С ДРУГИМИ ПРЕПАРАТАМИ?",
    answer: <>При совместном использовании с глюкокортикостероидами отмечается синергическое действие. Флюдитек повышает эффективность антибактериальной терапии воспалительных заболеваний верхних и нижних дыхательных путей. Флюдитек усиливает бронхолитический эффект теофиллина. Не принимать Флюдитек с противокашлевыми и атропиноподобными средствами, так как они ослабляют его эффект<sup>1</sup>.</>
  },
  {
    question: "КАК ПОНЯТЬ, ЧТО ФЛЮДИТЕК РАБОТАЕТ?",
    answer: "На фоне приема препарата Флюдитек мокрота становится менее вязкой, ее легче откашливать, и по количеству ее становится меньше. То же самое происходит со слизью в носовой полости. Высмаркивать слизь становится легче, носовое дыхание улучшается."
  },
  {
    question: "В ЧЕМ ОТЛИЧИЕ ПРЕПАРАТА ФЛЮДИТЕК ОТ ЛАЗОЛВАНА?",
    answer: <>Карбоцистеин действует и в верхних, и в нижних дыхательных путях, в отличие от Амброксола, который действует только в нижних отделах<sup>1,2</sup>.</>
  },
  {
    question: "В ЧЕМ ОТЛИЧИЕ ПРЕПАРАТА ФЛЮДИТЕК ОТ АЦЦ?",
    answer: <>Карбоцистеин, в отличие от Ацетилцистеина, является не только муколитиком, но и мукорегулятором. Во время воспаления бокаловидные клетки начинают вырабатывать повышенное количество слизи (мокроты). Карбоцистеин действует на основную причину кашля — на клетки, которые вырабатывают мокроту. Карбоцистеин регулирует количество вырабатываемой мокроты, тем самым нормализует ее количество<sup>1,3</sup>.</>
  }
];

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gray-50" id="faq">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-purple/10 text-brand-purple mb-6">
             <HelpCircle size={32} />
          </div>
          <h2 className="text-4xl font-black text-gray-900 uppercase">
            Частые <span className="text-brand-purple">вопросы</span>
          </h2>
          <p className="text-gray-500 mt-4">
            Ответы на популярные вопросы о применении и действии препарата
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={false}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-brand-purple shadow-lg' : 'border-gray-200 hover:border-brand-purple/50'}`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`font-bold text-base md:text-lg pr-8 uppercase tracking-wide transition-colors ${isOpen ? 'text-brand-purple' : 'text-gray-800'}`}>
                    {item.question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-brand-purple text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2 text-base md:text-lg">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-xs text-gray-400 text-center max-w-2xl mx-auto space-y-1">
            <p>1. Инструкция по медицинскому применению препарата Флюдитек</p>
            <p>2. Инструкция по медицинскому применению препарата Амброксол</p>
            <p>3. Инструкция по медицинскому применению препарата Ацетилцистеин</p>
        </div>

      </div>
    </section>
  );
};