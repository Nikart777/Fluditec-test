'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, AlertCircle, CheckCircle2 } from 'lucide-react';

// 3. НОВЫЙ БЛОК: Навигатор (Какой кашель мы лечим?)
// Простая инфографика: Проблема -> Решение

const SYMPTOMS = [
    "Заложенность в груди",
    "Трудно откашляться",
    "Густая вязкая мокрота",
    "Насморк при простуде"
];

export const Navigator = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                ПОДОЙДЕТ ЛИ МНЕ <span className="text-brand-purple">ФЛЮДИТЕК?</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
                Определите тип кашля, чтобы выбрать правильное лечение
            </p>
        </div>

        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
                
                {/* Блок Проблемы (Симптомы) */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-400" />
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                            <AlertCircle size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">ЕСЛИ У ВАС:</h3>
                    </div>
                    
                    <ul className="space-y-4">
                        {SYMPTOMS.map((siamptom, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-gray-600 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                {siamptom}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Стрелка (на десктопе горизонтальная, на мобилке вертикальная) */}
                <div className="flex items-center justify-center text-brand-purple">
                    <ArrowDown className="md:-rotate-90 md:w-12 md:h-12 w-8 h-8 animate-pulse" />
                </div>

                {/* Блок Решения */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1 bg-brand-purple p-8 rounded-3xl shadow-xl shadow-brand-purple/20 relative overflow-hidden text-white"
                >
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                    
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                            <CheckCircle2 size={20} />
                        </div>
                        <h3 className="text-xl font-bold">ФЛЮДИТЕК ПОМОЖЕТ:</h3>
                    </div>
                    
                    <ul className="space-y-4 relative z-10">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="shrink-0 mt-1 text-brand-yellow" size={18} />
                            <span>Разжижить и вывести мокроту</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="shrink-0 mt-1 text-brand-yellow" size={18} />
                            <span>Перевести кашель в продуктивный</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="shrink-0 mt-1 text-brand-yellow" size={18} />
                            <span>Снять воспаление в носу и ушах</span>
                        </li>
                    </ul>
                </motion.div>

            </div>
        </div>

      </div>
    </section>
  );
};