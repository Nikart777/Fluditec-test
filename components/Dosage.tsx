'use client';

import React from 'react';
import { Baby, User, Clock, Briefcase, Check, Sparkles } from 'lucide-react';

const PRODUCTS = [
    {
        id: 'sachet',
        title: "Раствор в саше",
        age: "Взрослые (15+)",
        icon: <Briefcase size={24} className="text-white" />,
        color: "bg-brand-purple",
        textColor: "text-white",
        // Новая картинка Саше
        img: "https://fluditec.ru/upload/iblock/8ff/rwocjm0r8ubsmw3i049kb6enlogr8fyn.png",
        features: [
            "Не требует запивания",
            "Без сахара",
            "Приятный карамельный запах 🍮"
        ],
        dosageScheme: [
            { label: "Прием", value: "1 саше", freq: "3 раза в день" }
        ]
    },
    {
        id: 'adult-syrup',
        title: "Сироп 5%",
        age: "Взрослые (15+)",
        icon: <User size={24} className="text-white" />,
        color: "bg-brand-teal",
        textColor: "text-white",
        // Картинка (используем ту, что вы прислали для сиропа, хотя она похожа на детскую, оставим цветовую дифференциацию фона)
        img: "https://fluditec.ru/upload/iblock/67f/3a7gvo4xrcspbetfa0p6n6v6oywkyv1d.png",
        features: [
            "Приятный карамельный запах 🍮",
            "Действует на всем протяжении дыхательных путей"
        ],
        dosageScheme: [
            { label: "Прием", value: "15 мл", freq: "3 раза в день" }
        ]
    },
    {
        id: 'kids-syrup',
        title: "Сироп 2%",
        age: "Дети (2-15 лет)",
        icon: <Baby size={24} />,
        color: "bg-brand-yellow",
        textColor: "text-gray-900",
        // Новая картинка Детский
        img: "https://fluditec.ru/upload/iblock/bf8/h1bbu3me2vdhiypuggnhfkkcg1y7x2d5.png",
        features: [
            "Приятный банановый запах 🍌",
            "Бережное лечение кашля"
        ],
        dosageScheme: [
            { label: "2-5 лет", value: "5 мл", freq: "2 раза в день" },
            { label: "5+ лет", value: "5 мл", freq: "3 раза в день" }
        ]
    }
];

export const Dosage = () => {
  return (
    <section className="py-24 bg-white" id="products">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight">
                Линейка <span className="text-brand-purple">Препаратов</span>
            </h2>
            <p className="text-xl text-gray-500 mt-4">
                Выберите подходящую форму выпуска
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
            {PRODUCTS.map((product) => (
                <div key={product.id} className="rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full bg-white group">
                    
                    {/* Верхняя часть (Цветная + Картинка) */}
                    <div className={`${product.color} p-8 relative h-[320px] flex flex-col items-start`}>
                        {/* Иконка и возраст */}
                        <div className="relative z-10 flex items-center gap-3 mb-4">
                            <div className={`p-2.5 rounded-xl bg-white/20 backdrop-blur-sm shadow-sm ${product.textColor}`}>
                                {product.icon}
                            </div>
                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md ${product.textColor}`}>
                                {product.age}
                            </span>
                        </div>
                        
                        <h3 className={`relative z-10 text-3xl font-black uppercase leading-none ${product.textColor} max-w-[80%]`}>
                            {product.title}
                        </h3>

                        {/* Изображение продукта */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-full h-full flex items-center justify-center pointer-events-none">
                            <img 
                                src={product.img} 
                                alt={product.title} 
                                className="w-[85%] h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2"
                            />
                        </div>
                    </div>

                    {/* Нижняя часть (Преимущества + Дозировка) */}
                    <div className="p-8 flex-1 flex flex-col relative z-20 bg-white -mt-6 rounded-t-[2rem]">
                        
                        {/* Список преимуществ */}
                        <div className="mb-8 space-y-3">
                            {product.features.map((feat, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 text-green-600">
                                        <Check size={12} strokeWidth={4} />
                                    </div>
                                    <span className="text-gray-700 font-medium leading-tight">{feat}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-6 border-t border-gray-100">
                             <h4 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Clock size={14} /> Схема приема
                            </h4>
                            <div className="space-y-3">
                                {product.dosageScheme.map((row, rIdx) => (
                                    <div key={rIdx} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                                        <span className="font-bold text-gray-900 text-sm">{row.label}</span>
                                        <div className="text-right">
                                            <div className="font-black text-lg text-brand-purple leading-none">{row.value}</div>
                                            <div className="text-[10px] text-gray-500 font-bold uppercase mt-1">{row.freq}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};