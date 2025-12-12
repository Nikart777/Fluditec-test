'use client';

import React from 'react';
import { Check, X } from 'lucide-react';

// 6. НОВЫЙ БЛОК: Сравнительная таблица
// Визуализация преимуществ Карбоцистеина (Флюдитек) перед обычными средствами.

export const Comparison = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
                БОЛЬШЕ, ЧЕМ ПРОСТО <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-teal">МУКОЛИТИК</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
                В отличие от классических средств (Амброксол, Ацетилцистеин), Флюдитек (Карбоцистеин) действует комплексно.
            </p>
        </div>

        <div className="overflow-x-auto">
            <div className="min-w-[700px] bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                
                {/* Header */}
                <div className="grid grid-cols-3 bg-gray-50">
                    <div className="p-6 text-gray-400 font-bold text-sm uppercase tracking-wider flex items-center">
                        Критерий действия
                    </div>
                    <div className="p-6 bg-brand-purple text-white font-black text-xl text-center relative">
                        ФЛЮДИТЕК
                        <div className="absolute top-0 right-0 bg-brand-yellow text-gray-900 text-[10px] px-2 py-1 font-bold uppercase">Лидер</div>
                    </div>
                    <div className="p-6 text-gray-500 font-bold text-center flex items-center justify-center">
                        Обычные муколитики
                    </div>
                </div>

                {/* Row 1 */}
                <div className="grid grid-cols-3 border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="p-6 font-bold text-gray-900 flex items-center">
                        Действие в носоглотке
                    </div>
                    <div className="p-6 bg-brand-purple/5 flex justify-center items-center border-x border-brand-purple/10">
                        <Check className="text-green-500 w-8 h-8" strokeWidth={3} />
                    </div>
                    <div className="p-6 flex justify-center items-center opacity-30">
                        <X className="text-gray-400 w-8 h-8" />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-3 border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="p-6 font-bold text-gray-900 flex items-center">
                        Восстановление слизистой
                    </div>
                    <div className="p-6 bg-brand-purple/5 flex justify-center items-center border-x border-brand-purple/10">
                        <Check className="text-green-500 w-8 h-8" strokeWidth={3} />
                    </div>
                    <div className="p-6 flex justify-center items-center opacity-30">
                        <X className="text-gray-400 w-8 h-8" />
                    </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-3 border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="p-6 font-bold text-gray-900 flex items-center">
                        Укрепление иммунитета (IgA)
                    </div>
                    <div className="p-6 bg-brand-purple/5 flex justify-center items-center border-x border-brand-purple/10">
                         <span className="text-green-600 font-black text-lg">ДА</span>
                    </div>
                    <div className="p-6 flex justify-center items-center opacity-50 font-medium text-gray-400">
                        Нет данных
                    </div>
                </div>

            </div>
        </div>

      </div>
    </section>
  );
};