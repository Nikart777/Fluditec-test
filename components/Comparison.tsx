'use client';

import React from 'react';
import { ShieldCheck, Activity, Zap, CheckCircle2 } from 'lucide-react';

// ДАННЫЕ ПРЕИМУЩЕСТВ
const ADVANTAGES = [
  {
    title: "Действие в носоглотке",
    desc: "Лечит не только кашель, но и насморк",
  },
  {
    title: "Восстановление слизистой",
    desc: "Регенерирует поврежденные клетки",
  },
  {
    title: "Местный иммунитет",
    desc: "Стимулирует выработку IgA для защиты",
  }
];

export const Comparison = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Заголовок */}
        <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase">
                Умное <span className="text-brand-purple">Преимущество</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
                Флюдитек работает там, где обычные средства бессильны
            </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Левая колонка: Список преимуществ (Визуал) */}
            <div className="relative rounded-[2.5rem] bg-gray-50 p-6 md:p-12 overflow-hidden flex flex-col justify-center order-2 lg:order-1">
                 {/* Абстрактные пятна фона */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-brand-purple/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-teal/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                 
                 <div className="relative z-10 space-y-4 md:space-y-6">
                    {ADVANTAGES.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow-sm border border-gray-100 transition-transform hover:scale-[1.02]">
                             <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center shrink-0 text-brand-purple">
                                 <CheckCircle2 size={24} strokeWidth={3} />
                             </div>
                             <div>
                                 <h3 className="font-bold text-gray-900 text-base md:text-lg leading-tight mb-1">{item.title}</h3>
                                 <p className="text-gray-500 text-sm">{item.desc}</p>
                             </div>
                        </div>
                    ))}
                 </div>
            </div>

            {/* Правая колонка: Описание и плашки */}
            <div className="order-1 lg:order-2">
                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-yellow/20 text-yellow-700 font-bold text-xs uppercase tracking-wider mb-6">
                    <Zap size={16} fill="currentColor" />
                    Тройной эффект
                 </div>
                 <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
                    Больше, чем просто <br/>
                    <span className="text-brand-purple">Муколитик</span>
                 </h3>
                 <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    В отличие от простых средств, Карбоцистеин (Флюдитек) активирует ферменты бокаловидных клеток. Это нормализует вязкость слизи и восстанавливает структуру слизистой оболочки дыхательных путей.
                 </p>
                 
                 <div className="grid grid-cols-2 gap-4">
                     <div className="p-6 rounded-3xl bg-brand-purple text-white shadow-xl shadow-brand-purple/20">
                         <Activity className="mb-4 opacity-80" size={32} />
                         <div className="font-black text-3xl mb-1">2 в 1</div>
                         <div className="text-sm font-medium opacity-80">Нос и Бронхи</div>
                     </div>
                     <div className="p-6 rounded-3xl bg-brand-teal text-white shadow-xl shadow-brand-teal/20">
                         <ShieldCheck className="mb-4 opacity-80" size={32} />
                         <div className="font-black text-3xl mb-1">IgA</div>
                         <div className="text-sm font-medium opacity-80">Иммунитет</div>
                     </div>
                 </div>
            </div>

        </div>

      </div>
    </section>
  );
};