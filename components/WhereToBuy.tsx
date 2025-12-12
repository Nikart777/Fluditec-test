'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Globe, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

// ДАННЫЕ ИЗ ОРИГИНАЛЬНОГО САЙТА
const ONLINE_PHARMACIES = [
  { 
    name: "Аптека.ру", 
    link: "https://apteka.ru/product/flyuditek-750-mg10-ml-15-sht-sashe-rastvor-dlya-priema-vnutr-10-ml-62834423e104180fb40574ed/", 
    img: "https://fluditec.ru/upload/resize_cache/iblock/861/250_70_1/ahnuc6g12scs2krf841q514xr1hib0h3.png"
  },
  { 
    name: "СБЕР ЕАПТЕКА", 
    link: "https://www.eapteka.ru/search/?q=%D1%84%D0%BB%D1%8E%D0%B4%D0%B8%D1%82%D0%B5%D0%BA", 
    img: "https://fluditec.ru/upload/iblock/d65/gro7urjbr98mozon0dhdacwisqc7wgdx.jpg"
  },
  { 
    name: "Польза.ру", 
    link: "https://polza.ru/catalog/?q=%D1%84%D0%BB%D1%8E%D0%B4%D0%B8%D1%82%D0%B5%D0%BA", 
    img: "https://fluditec.ru/upload/iblock/67b/94q1sjjru8peum76um7jpqjm6qqobd7p.jpg"
  },
  { 
    name: "OZON", 
    link: "https://www.ozon.ru/category/preparaty-ot-kashlya-34524/?category_was_predicted=true&deny_category_prediction=true&from_global=true&text=%D1%84%D0%BB%D1%8E%D0%B4%D0%B8%D1%82%D0%B5%D0%BA", 
    img: "https://fluditec.ru/upload/iblock/5df/bqtxi113bl01do9egogchjwceluamz46.png"
  },
  { 
    name: "Яндекс Маркет", 
    link: "https://market.yandex.ru/catalog--sredstva-ot-grippa-i-prostudy/25024950/list?text=%D1%84%D0%BB%D1%8E%D0%B4%D0%B8%D1%82%D0%B5%D0%BA&hid=15756357&rs=eJxVUDFLHFEY3Kee7m3jooXnHtEnJmjpnai5xDsWO7v8g3fr7p53sN4e--4UTYoFhYAopAgopnC7BGwkpNPgWlxjYSNiICn2NwiJbfYbCcRmGOabN983r_ix9w3byqjdH5cDXaaY785S5PnvKUb-eYrKIXF-Szw8XSR9GzhSTjFRKynGd6TEjNB8RXoYkj-pgJ9QQriA5GXkfINT0pS_J14tvCYlQuYx8j3i8TYUnxRllHLMB3LyPbxduaC0CLuek6J8JSe_wc0WbTT3oX8BdtHoE_R7eK5JN3eJx7NQEmycIozmoTvEq0fEFYX6RseUU0XrpAL9EQ8Iqzu4HM5wEj-JFjHujLPo-xnJH9DUAf9VvmLqy1JxZmWuNL90z7SCpqpMZznGmd5jjNstS8i63xKNpt1pi41Guy7s1pqQbbdpNzyuTCtaHk94ro_36f1G1nFrVsdri-KTIeX9NyxgOIHhGF5mjEE7eNy1anmeG2zC8gKWZ3ifMYb_WXCIX6u5gYRtAbahnMY1XTcmbEt2LE_YVuB3pOuJwJUtvykb666QrhXYdf7z5u307z-Ozv4CkrrL8w%2C%2C&connected-retail=goodsCentricSearch&glfilter=7893318%3A16003018", 
    img: "https://fluditec.ru/upload/iblock/5fd/whoclvvwue5fno759z5tjukwr3gji12z.jpg"
  },
  { 
    name: "Планета Здоровья", 
    link: "https://planetazdorovo.ru/catalog/lekarstva-i-bad/prostuda-i-gripp/kashel/flyuditek-rastvor-dlya-priema-vn-17447011/", 
    img: "https://fluditec.ru/upload/resize_cache/iblock/4f4/250_70_1/qpyq4ccvqmeftqop5ci8rc74oqz5e0wy.png"
  },
  { 
    name: "Столички", 
    link: "https://new.stolichki.ru/search?name=%D1%84%D0%BB%D1%8E%D0%B4%D0%B8%D1%82%D0%B5%D0%BA", 
    img: "https://fluditec.ru/upload/iblock/55b/c33n7ew9t5oyw62l4m86379ivzwd93mw.jpg"
  },
  { 
    name: "Здравсити", 
    link: "https://zdravcity.ru/p_fljuditek-rastvor-dlja-priema-vnutr-sashe-750mg-10ml-10ml-15sht-0192331.html", 
    img: "https://fluditec.ru/upload/resize_cache/iblock/94d/250_70_1/24t4cyuiiuiqgva35qtrrrbhfprbfmwp.png"
  },
  { 
    name: "Ригла", 
    link: "https://www.rigla.ru/product/5007107", 
    img: "https://fluditec.ru/upload/resize_cache/iblock/788/250_70_1/95c9t0lqdhdvvas2y2hfofu9fz3p4ify.jpg"
  },
  { 
    name: "Ютека", 
    link: "https://uteka.ru/product/flyuditek-380582/", 
    img: "https://fluditec.ru/upload/resize_cache/iblock/279/250_70_1/6opi2gnp0o524sm83k0ci27q4judfus6.jpg"
  },
  { 
    name: "АСНА", 
    link: "https://www.asna.ru/search/?query=%D1%84%D0%BB%D1%8E%D0%B4%D0%B8%D1%82%D0%B5%D0%BA", 
    img: "https://fluditec.ru/upload/iblock/9e7/u90uziu5oojbfx961uvdmjidd0hq2a2f.jpg"
  }
];

const OFFLINE_CHAINS = [
  "Ригла", "Планета Здоровья", "Столички", "Вита", "Горздрав", "Апрель", "36.6", "Доктор Столетов"
];

// ИСПРАВЛЕНИЕ 3: Частичное отображение аптек с кнопкой "Показать все"
export const WhereToBuy = () => {
  const [activeTab, setActiveTab] = useState<'online' | 'offline'>('online');
  const [showAllOnline, setShowAllOnline] = useState(false);

  // Показываем первые 6, если не развернуто
  const displayedOnline = showAllOnline ? ONLINE_PHARMACIES : ONLINE_PHARMACIES.slice(0, 6);

  return (
    <section id="where-to-buy" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase mb-6">
            Где <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-teal">Купить</span>
          </h2>
          
          <div className="inline-flex bg-gray-100 p-1 rounded-full shadow-inner">
            <button
              onClick={() => setActiveTab('online')}
              className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full font-bold transition-all duration-300 text-sm sm:text-base ${activeTab === 'online' ? 'bg-white shadow-md text-brand-purple' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <Globe size={18} />
              Онлайн-заказ
            </button>
            <button
              onClick={() => setActiveTab('offline')}
              className={`flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full font-bold transition-all duration-300 text-sm sm:text-base ${activeTab === 'offline' ? 'bg-white shadow-md text-brand-purple' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <MapPin size={18} />
              В аптеках
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto min-h-[400px]">
          <AnimatePresence mode='wait'>
            
            {activeTab === 'online' && (
              <motion.div
                key="online"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {displayedOnline.map((pharmacy, idx) => (
                    <a 
                        key={idx} 
                        href={pharmacy.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="group flex flex-col items-center p-6 rounded-2xl border border-gray-100 bg-white hover:border-brand-purple/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-brand-purple/0 group-hover:bg-brand-purple/5 transition-colors duration-300" />
                        
                        <div className="h-16 w-full flex items-center justify-center mb-4 relative z-10">
                            <img 
                            src={pharmacy.img} 
                            alt={pharmacy.name}
                            className="max-h-full max-w-[80%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100"
                            />
                        </div>
                        
                        <div className="mt-2 flex items-center gap-2 text-brand-purple font-bold text-sm uppercase tracking-wider relative z-10 group-hover:translate-x-1 transition-transform">
                            Купить <ArrowRight size={16} />
                        </div>
                    </a>
                    ))}
                  </div>

                  {/* Кнопка "Показать все" */}
                  {ONLINE_PHARMACIES.length > 6 && (
                      <div className="mt-10 text-center">
                          <button 
                            onClick={() => setShowAllOnline(!showAllOnline)}
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 hover:text-brand-purple transition-all"
                          >
                              {showAllOnline ? (
                                  <>Свернуть <ChevronUp size={18} /></>
                              ) : (
                                  <>Показать еще ({ONLINE_PHARMACIES.length - 6}) <ChevronDown size={18} /></>
                              )}
                          </button>
                      </div>
                  )}
              </motion.div>
            )}

            {activeTab === 'offline' && (
              <motion.div
                key="offline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 rounded-3xl p-8 md:p-12 text-center"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md text-brand-purple animate-bounce-slow">
                  <MapPin size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Спрашивайте в аптеках вашего города</h3>
                <p className="text-gray-500 max-w-lg mx-auto mb-8">
                  Препарат Флюдитек представлен в большинстве крупных федеральных и региональных аптечных сетей.
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                  {OFFLINE_CHAINS.map((chain, idx) => (
                    <div key={idx} className="px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 shadow-sm hover:shadow-md hover:text-brand-purple transition-all cursor-default">
                      {chain}
                    </div>
                  ))}
                </div>
                
                <p className="mt-10 text-sm text-gray-400">
                    * Наличие товара уточняйте в справочных службах аптек
                </p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};