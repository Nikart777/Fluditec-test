import React from 'react';

export const ContraindicationBanner = () => (
  <div className="fixed bottom-0 left-0 w-full bg-white border-t-4 border-red-600 z-[100] p-4 shadow-2xl">
    <div className="container mx-auto text-center">
      <p className="text-gray-900 font-bold text-lg md:text-xl uppercase tracking-widest opacity-90">
        Имеются противопоказания. Перед применением ознакомьтесь с инструкцией.
      </p>
    </div>
  </div>
);