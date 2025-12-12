'use client';

import React from 'react';

// Увеличили размер плашки и шрифта для соответствия требованиям (5-10% площади рекламы).
// Текст теперь фирменного фиолетового цвета (brand-purple).

export const ContraindicationBanner = () => (
  <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-[100] py-6 shadow-[0_-5px_30px_rgba(0,0,0,0.1)]">
    <div className="container mx-auto text-center px-4">
      <p className="text-brand-purple font-bold text-sm md:text-xl uppercase tracking-wider leading-snug">
        Имеются противопоказания. Перед применением ознакомьтесь с инструкцией.
      </p>
    </div>
  </div>
);