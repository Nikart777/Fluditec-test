'use client';

import React from 'react';
import { Ban, Smile, Coffee, Droplets, ShieldCheck, Zap } from 'lucide-react';

// 5. РЕФАКТОРИНГ: Блок преимуществ
// Вместо слайдера — статичная сетка (Grid).
// Добавлен блок про действие в носоглотке (как часть преимуществ)

const FEATURES = [
    {
        title: "Приятный вкус",
        desc: "Банан для детей, карамель для взрослых. Лечение без слез.",
        icon: <Smile className="text-brand-yellow" size={32} />,
        bg: "bg-brand-yellow/10"
    },
    {
        title: "Без сахара",
        desc: "Сироп для взрослых и Саше не содержат сахара.",
        icon: <Ban className="text-red-500" size={32} />,
        bg: "bg-red-50"
    },
    {
        title: "Удобная форма",
        desc: "Саше удобно брать с собой на работу или в дорогу.",
        icon: <Coffee className="text-brand-purple" size={32} />,
        bg: "bg-brand-purple/10"
    },
    {
        title: "Двойное действие",
        desc: "Лечит не только кашель, но и облегчает насморк (синергия).",
        icon: <Zap className="text-blue-500" size={32} />,
        bg: "bg-blue-50"
    },
    {
        title: "Восстановление",
        desc: "Регенерирует слизистую оболочку дыхательных путей.",
        icon: <ShieldCheck className="text-green-500" size={32} />,
        bg: "bg-green-50"
    },
    {
        title: "Иммунитет",
        desc: "Способствует выработке иммуноглобулина IgA.",
        icon: <Droplets className="text-teal-500" size={32} />,
        bg: "bg-teal-50"
    }
];

export const Advantages = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight">
                ПОЧЕМУ <span className="text-brand-purple">ФЛЮДИТЕК?</span>
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                    <div className={`w-16 h-16 rounded-2xl ${feat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        {feat.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feat.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                        {feat.desc}
                    </p>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};