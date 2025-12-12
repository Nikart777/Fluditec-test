'use client';

import React from 'react';
import { Baby, User, Clock, Briefcase } from 'lucide-react';

// 4. ОПТИМИЗАЦИЯ: Увеличение изображений
// Картинки увеличены (w-64 md:w-80) и немного сдвинуты, чтобы были заметнее

const PRODUCTS = [
    {
        id: 'sachet',
        title: "Раствор в саше",
        age: "Взрослые (15+)",
        taste: "Карамель",
        icon: <Briefcase size={32} className="text-white" />,
        color: "bg-brand-purple",
        textColor: "text-white",
        img: "https://fluditec.ru/upload/iblock/12f/66q29fongvlm2kac38kgzc95i0s59mow.png",
        dosage: [
            { label: "Удобно", value: "1 пак.", freq: "3 раза в день" }
        ],
        badge: "Удобно брать с собой"
    },
    {
        id: 'adult-syrup',
        title: "Сироп 5%",
        age: "Взрослые (15+)",
        taste: "Карамель",
        icon: <User size={32} className="text-white" />,
        color: "bg-brand-teal",
        textColor: "text-white",
        img: "https://fluditec.ru/upload/iblock/cc9/c3v3t1w09rsbf6egwl8gkd64wef0utcf.png",
        dosage: [
            { label: "Дозировка", value: "15 мл", freq: "3 раза в день" }
        ]
    },
    {
        id: 'kids-syrup',
        title: "Сироп 2%",
        age: "Дети (2-15 лет)",
        taste: "Банан",
        icon: <Baby size={32} />,
        color: "bg-brand-yellow",
        textColor: "text-gray-900",
        img: "https://fluditec.ru/upload/iblock/89b/qo6qv8w7t96q0nvqnuhavvai7adt16sc.png",
        dosage: [
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
            {PRODUCTS.map((product) => (
                <div key={product.id} className="rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                    
                    {/* Верхняя часть (Цветная) */}
                    <div className={`${product.color} p-8 relative overflow-hidden h-80 flex flex-col justify-between`}>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start">
                                <div className={`p-3 rounded-2xl bg-white/20 backdrop-blur-sm ${product.textColor}`}>
                                    {product.icon}
                                </div>
                                <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md ${product.textColor}`}>
                                    {product.taste}
                                </span>
                            </div>
                            
                            <h3 className={`text-2xl font-black uppercase mt-6 leading-none ${product.textColor}`}>{product.title}</h3>
                            <p className={`font-medium opacity-80 mt-1 ${product.textColor}`}>{product.age}</p>
                            
                            {product.badge && (
                                <span className="inline-block mt-3 px-3 py-1 bg-white text-brand-purple text-xs font-bold rounded-full shadow-md">
                                    {product.badge}
                                </span>
                            )}
                        </div>
                        
                        {/* Картинка продукта: Увеличена с w-48 до w-64/w-80 и подправлено положение */}
                        <img 
                            src={product.img} 
                            alt={product.title} 
                            className="absolute -right-8 -bottom-4 w-64 md:w-80 drop-shadow-2xl rotate-[-5deg] transition-transform hover:rotate-0 hover:scale-105 duration-500"
                        />
                    </div>

                    {/* Нижняя часть (Таблица дозировки) */}
                    <div className="bg-white p-8 flex-1 flex flex-col">
                        <h4 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Clock size={16} /> Схема приема
                        </h4>
                        
                        <div className="space-y-4 mt-auto">
                            {product.dosage.map((row, rIdx) => (
                                <div key={rIdx} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                    <span className="font-bold text-gray-900 text-base">{row.label}</span>
                                    <div className="text-right">
                                        <div className="font-black text-xl text-brand-purple">{row.value}</div>
                                        <div className="text-[10px] text-gray-500 font-medium uppercase">{row.freq}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            ))}
        </div>

      </div>
    </section>
  );
};