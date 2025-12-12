'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShoppingCart } from 'lucide-react';
import { HERO_PRODUCTS } from '@/lib/constants';

// 2. ОПТИМИЗАЦИЯ: Главный экран
// - ИСПРАВЛЕНИЕ: Порядок элементов на мобильном (Текст -> Картинка)

export const Hero = () => {
  const [activeTab, setActiveTab] = useState<'adults-sachet' | 'adults-syrup' | 'kids-syrup'>('adults-sachet');
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const activeProduct = HERO_PRODUCTS.find(p => p.id === activeTab) || HERO_PRODUCTS[0];

  // --- CANVAS EFFECT ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: any[] = [];
    let animationFrameId: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    class AirParticle {
      x: number; y: number; size: number; speedY: number; angle: number; color: string; alpha: number;
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height + height;
        this.size = Math.random() * 4 + 1; 
        this.speedY = Math.random() * 2 + 0.8; 
        this.angle = Math.random() * 360;
        this.alpha = Math.random() * 0.4 + 0.1;
        const rand = Math.random();
        if (rand > 0.9) this.color = '254, 238, 49'; 
        else if (rand > 0.8) this.color = '0, 173, 174'; 
        else this.color = '255, 255, 255'; 
      }
      update() {
        this.angle += 0.01;
        this.x += Math.sin(this.angle) * 0.8; 
        this.y -= this.speedY;
        if (this.y < -50) { this.y = height + 50; this.x = Math.random() * width; }
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
        gradient.addColorStop(0, `rgba(${this.color}, ${this.alpha})`);
        gradient.addColorStop(1, `rgba(${this.color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = width < 768 ? 50 : 120; 
      for (let i = 0; i < count; i++) particles.push(new AirParticle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => { p.update(); p.draw(); });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted || !activeProduct) return null;

  return (
    <section className="relative min-h-[100dvh] pt-28 pb-12 overflow-hidden bg-brand-purple flex items-center justify-center">
      
      {/* Background Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-purple via-[#4a3db8] to-brand-purple opacity-90" />
        <canvas ref={canvasRef} className="block w-full h-full opacity-60 mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-8 items-center relative z-20 h-full">
        
        {/* --- ЛЕВАЯ ЧАСТЬ: Текст и Табы --- */}
        {/* ИСПРАВЛЕНИЕ: Убрали классы order-2 lg:order-1. Теперь этот блок идет первым в DOM и визуально тоже первым на мобильном. */}
        <div className="lg:col-span-6 space-y-8 text-center lg:text-left pt-8 lg:pt-0">
          
          {/* ТАБЫ */}
          <div className="inline-flex flex-wrap justify-center lg:justify-start gap-2 bg-white/10 p-1.5 rounded-3xl backdrop-blur-md border border-white/10 mb-4">
            <button 
              onClick={() => setActiveTab('adults-sachet')}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${activeTab === 'adults-sachet' ? 'bg-brand-purple text-white shadow-lg ring-1 ring-white/20' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
            >
              ВЗРОСЛЫМ (САШЕ)
            </button>
             <button 
              onClick={() => setActiveTab('adults-syrup')}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${activeTab === 'adults-syrup' ? 'bg-brand-teal text-white shadow-lg' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
            >
              ВЗРОСЛЫМ (СИРОП)
            </button>
            <button 
              onClick={() => setActiveTab('kids-syrup')}
              className={`px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${activeTab === 'kids-syrup' ? 'bg-brand-yellow text-gray-900 shadow-lg' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
            >
              ДЕТЯМ
            </button>
          </div>

          <div className="relative z-10">
             <motion.h1 
               key={activeTab} 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.0] tracking-tight mb-4 drop-shadow-2xl"
             >
               КОМПЛЕКСНОЕ <br/> ЛЕЧЕНИЕ <br/>
               <span className={`text-transparent bg-clip-text bg-gradient-to-r ${activeTab === 'kids-syrup' ? 'from-brand-yellow to-orange-300' : 'from-brand-teal to-blue-300'}`}>
                 КАШЛЯ И НОСА
               </span>
            </motion.h1>
          </div>
            
          <p className="text-lg md:text-xl text-purple-100 font-medium mt-4 max-w-lg mx-auto lg:mx-0 leading-relaxed">
             Флюдитек не просто разжижает мокроту, но и восстанавливает слизистую носа и бронхов. 
             <span className="block mt-2 opacity-80 font-normal text-base">
                 {activeProduct.description}
             </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
            <motion.a 
              href="#where-to-buy"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg shadow-[0_10px_40px_-10px_rgba(254,238,49,0.5)] transition-all bg-brand-yellow text-gray-900"
            >
              <ShoppingCart size={20} /> 
              Где купить
            </motion.a>
            
            <a 
              href={activeProduct.instructionLink}
              target="_blank"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-all"
            >
              Инструкция
            </a>
          </div>
        </div>

        {/* --- ПРАВАЯ ЧАСТЬ: Продукт --- */}
        {/* ИСПРАВЛЕНИЕ: Картинка идет второй в потоке. */}
        <div className="lg:col-span-6 relative h-[50vh] lg:h-[70vh] flex items-center justify-center">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="relative w-full h-full flex items-center justify-center"
                >
                    {/* Glow Effect */}
                    <div className={`absolute w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-full blur-[60px] md:blur-[100px] opacity-40 ${activeProduct.color === '#FEEE31' ? 'bg-brand-yellow' : activeProduct.color === '#00adae' ? 'bg-brand-teal' : 'bg-brand-purple'}`} />

                    <img 
                        src={activeProduct.image} 
                        alt={activeProduct.title}
                        className="relative z-20 w-auto h-[70%] md:h-[75%] object-contain drop-shadow-2xl"
                    />

                    {/* Floating Badge */}
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute top-[5%] right-[5%] md:top-[10%] md:right-[10%] w-16 h-16 md:w-24 md:h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-xl z-30 animate-bounce-slow"
                    >
                         <span className={`text-xl md:text-3xl font-black ${activeProduct.textColor === 'text-white' ? 'text-brand-purple' : 'text-gray-900'}`}>
                            {activeProduct.age}
                         </span>
                         <span className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase">Возраст</span>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 pointer-events-none z-20 animate-pulse">
        <ChevronDown size={24} />
      </div>
    </section>
  );
};