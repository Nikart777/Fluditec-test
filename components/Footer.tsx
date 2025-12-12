'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    // pb-32: Большой отступ снизу, чтобы плашка противопоказаний и sticky-кнопка не перекрывали текст
    <footer className="bg-gray-100 text-[#333] pt-16 pb-32 text-sm leading-relaxed border-t border-gray-200">
      <div className="container mx-auto px-6">
        
        {/* Логотип */}
        <div className="mb-10">
            <a href="https://innotech.ru/" target="_blank" rel="noreferrer" className="inline-block opacity-80 hover:opacity-100 transition-opacity">
                {/* Логотип Иннотек (заглушка текстом или имитация, так как картинки нет) */}
                <span className="text-2xl font-black text-gray-400 tracking-tighter">INNOTECH</span>
            </a>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
            
            {/* Меню (слева, 4 колонки) */}
            <div className="lg:col-span-4 flex flex-col space-y-4 font-bold text-base text-gray-800">
                <Link href="#products" className="hover:text-brand-purple transition-colors">Для взрослых</Link>
                <Link href="#products" className="hover:text-brand-purple transition-colors">Для родителей</Link>
                <Link href="/doctors" className="hover:text-brand-purple transition-colors">Для врачей</Link>
                <Link href="#faq" className="hover:text-brand-purple transition-colors">Частые вопросы</Link>
                <Link href="#products" className="hover:text-brand-purple transition-colors">Формы препарата</Link>
            </div>

            {/* Контент (справа, 8 колонок) */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* Юридический текст */}
                <div className="text-gray-500 space-y-4 text-xs md:text-sm">
                    <p>
                        Владельцем сайта fluditec.ru является ООО «ИННОТЕК», которое полностью отвечает за его содержание. 
                        Сайт ориентирован на физических и юридических лиц из России. Номера регистрационных удостоверений:<br/>
                        ФЛЮДИТЕК сироп для детей 20 мг/ мл: П N014782/02, <br/>
                        ФЛЮДИТЕК сироп 50 мг/ мл: П N014782/01<br/>
                        ФЛЮДИТЕК раствор для приема внутрь 750 мг/ 10 мл в сашé: ЛП-№(002669)-(РГ-RU)
                    </p>
                    <p>
                        Информация, размещенная на сайте, носит справочный характер и не может считаться консультацией медицинского работника или заменить ее. 
                        Для получения более подробной информации мы рекомендуем вам обратиться к специалисту.
                    </p>
                    <p className="font-bold text-gray-700">
                        Сообщить о нежелательном явлении:
                    </p>
                </div>

                {/* Контакты (Телефон и Почта) */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                    <a href="tel:+78002501738" className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all">
                             <Phone size={18} fill="currentColor" />
                        </div>
                        <span className="font-bold text-lg text-gray-800 group-hover:text-brand-purple transition-colors">
                            +7 800 250 17 38
                        </span>
                    </a>

                    <a href="mailto:INNOTECH@INNOTECH.RU" className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-all">
                             <Mail size={18} />
                        </div>
                        <span className="font-bold text-lg text-gray-800 group-hover:text-brand-purple transition-colors uppercase">
                            INNOTECH@INNOTECH.RU
                        </span>
                    </a>
                </div>

                {/* Документы и Соцсети */}
                <div className="pt-6 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-xs font-bold text-brand-purple mb-6 uppercase tracking-wide">
                        <a href="#" className="hover:underline">Условия использования сайта</a>
                        <a href="#" className="hover:underline">Политика в отношении персональных данных</a>
                        <a href="https://innotech.ru/" target="_blank" className="hover:underline">О компании</a>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
                        <span>Мы в соц сетях:</span>
                        <a href="https://vk.com/fluditec_official" target="_blank" className="hover:opacity-80 transition-opacity">
                             {/* Заглушка для иконки VK, так как внешней картинки может не быть */}
                             <div className="w-8 h-8 bg-[#0077FF] rounded-md flex items-center justify-center text-white font-bold text-xs">
                                VK
                             </div>
                        </a>
                    </div>
                </div>

            </div>
        </div>

      </div>
    </footer>
  );
};