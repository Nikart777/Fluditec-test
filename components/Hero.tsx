'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShoppingCart, Info } from 'lucide-react';

// --- CONSTANTS (Inlined to fix import issues) ---
const BRAND_COLORS = {
  purple: '#594BDB',
  yellow: '#FEEE31',
  teal: '#00adae',
  dark: '#1a1a1a',
  gray: '#f4f4f4'
};

const HERO_PRODUCTS = [
  {
    id: 'adults-sachet',
    title: 'ФЛЮДИТЕК',
    subtitle: 'РАСТВОР в сашÉ',
    age: '15+',
    color: BRAND_COLORS.purple,
    textColor: 'text-white',
    description: 'Облегчает кашель и заложенность носа, разжижает мокроту.',
    instructionLink: '/upload/instruction_adult_sachet.pdf',
    image: 'https://fluditec.ru/upload/iblock/12f/66q29fongvlm2kac38kgzc95i0s59mow.png', // Саше
    variant: 'purple'
  },
  {
    id: 'kids-syrup',
    title: 'ФЛЮДИТЕК',
    subtitle: 'Сироп для детей',
    age: '2+',
    color: BRAND_COLORS.yellow,
    textColor: 'text-gray-900',
    description: 'Приятный банановый вкус. Лечит кашель бережно.',
    instructionLink: '/upload/instruction_kids.pdf',
    image: 'https://fluditec.ru/upload/iblock/89b/qo6qv8w7t96q0nvqnuhavvai7adt16sc.png', // Сироп детский
    variant: 'yellow'
  },
  {
    id: 'adults-syrup',
    title: 'ФЛЮДИТЕК',
    subtitle: 'Сироп',
    age: '15+',
    color: BRAND_COLORS.teal,
    textColor: 'text-white',
    description: 'Действует на всем протяжении дыхательных путей.',
    instructionLink: '/upload/instruction_adult_syrup.pdf',
    image: 'https://fluditec.ru/upload/iblock/cc9/c3v3t1w09rsbf6egwl8gkd64wef0utcf.png', // Сироп взрослый
    variant: 'teal'
  }
];

export const Hero = () => {
  const [activeTab, setActiveTab] = useState<'adults-sachet' | 'adults-syrup' | 'kids-syrup'>('adults-sachet');
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const activeProduct = HERO_PRODUCTS.find(p => p.id === activeTab) || HERO_PRODUCTS[0];

  // --- CANVAS EFFECT (Particles) ---
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
      const count = width < 768 ? 40 : 100; // Less particles on mobile for performance
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

  // Tabs Data
  const TABS = [
      { id: 'adults-sachet', label: 'Взрослым (Саше)', mobileLabel: 'Саше 15+' },
      { id: 'adults-syrup', label: 'Взрослым (Сироп)', mobileLabel: 'Сироп 15+' },
      { id: 'kids-syrup', label: 'Детям', mobileLabel: 'Детям 2+' },
  ];

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-brand-purple flex flex-col pt-20 lg:pt-28">
      
      {/* Background Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-purple via-[#4a3db8] to-brand-purple opacity-90" />
        <canvas ref={canvasRef} className="block w-full h-full opacity-60 mix-blend-screen" />
      </div>

      <div className="container mx-auto px-4 lg:px-6 flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-4 relative z-20 h-full">
        
        {/* --- MOBILE TABS (Top, Scrollable) --- */}
        <div className="lg:hidden w-full relative shrink-0">
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 px-1 mask-linear-fade">
                {TABS.map((tab) => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 border backdrop-blur-md
                            ${activeTab === tab.id 
                                ? 'bg-white text-brand-purple border-white shadow-lg scale-105' 
                                : 'bg-white/10 text-white/80 border-white/10 hover:bg-white/20'
                            }`}
                    >
                        {tab.mobileLabel}
                    </button>
                ))}
            </div>
        </div>

        {/* --- LEFT COLUMN (Text Desktop) --- */}
        <div className="lg:col-span-6 flex flex-col justify-center lg:items-start text-center lg:text-left order-1 lg:order-1 shrink-0 lg:shrink">
          
          {/* Desktop Tabs */}
          <div className="hidden lg:inline-flex flex-wrap gap-2 bg-white/10 p-1.5 rounded-3xl backdrop-blur-md border border-white/10 mb-8 w-fit">
            {TABS.map((tab) => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 
                        ${activeTab === tab.id 
                            ? 'bg-white text-brand-purple shadow-lg' 
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                >
                    {tab.label.toUpperCase()}
                </button>
            ))}
          </div>

          <motion.div
             key={activeTab + "-title"}
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="relative z-10"
          >
             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight drop-shadow-xl uppercase">
               НЕ ОТВЛЕКАЙСЯ <br />
               <span className={`text-transparent bg-clip-text bg-gradient-to-r ${activeTab === 'kids-syrup' ? 'from-brand-yellow to-orange-300' : 'from-brand-teal to-blue-300'}`}>
                 НА КАШЕЛЬ!
               </span>
            </h1>
          </motion.div>
            
          <p className="hidden lg:block text-lg md:text-xl text-purple-100 font-medium mt-6 max-w-lg leading-relaxed">
             Флюдитек не просто разжижает мокроту, но и восстанавливает слизистую носа и бронхов. 
             <span className="block mt-2 opacity-80 font-normal text-base">
                 {activeProduct.description}
             </span>
          </p>

          <div className="hidden lg:flex gap-4 mt-10">
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

        {/* --- RIGHT COLUMN (Image - Center on Mobile) --- */}
        <div className="lg:col-span-6 relative flex-1 flex items-center justify-center order-2 lg:order-2 min-h-[30vh]">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="relative w-full h-full flex items-center justify-center"
                >
                    {/* Glow Effect */}
                    <div className={`absolute w-[240px] h-[240px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] rounded-full blur-[50px] lg:blur-[100px] opacity-50 
                        ${activeProduct.color === '#FEEE31' ? 'bg-brand-yellow' : activeProduct.color === '#00adae' ? 'bg-brand-teal' : 'bg-brand-purple'}`} 
                    />

                    <img 
                        src={activeProduct.image} 
                        alt={activeProduct.title}
                        className="relative z-20 w-auto h-[75%] max-h-[400px] lg:max-h-none lg:h-[80%] object-contain drop-shadow-2xl"
                    />

                    {/* Age Badge */}
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute bottom-[10%] right-[10%] lg:top-[10%] lg:right-[10%] lg:bottom-auto w-14 h-14 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-xl z-30 animate-bounce-slow"
                    >
                         <span className={`text-lg sm:text-xl lg:text-3xl font-black ${activeProduct.textColor === 'text-white' ? 'text-brand-purple' : 'text-gray-900'}`}>
                            {activeProduct.age}
                         </span>
                         <span className="text-[8px] lg:text-[10px] font-bold text-gray-400 uppercase">Возраст</span>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* --- MOBILE BOTTOM CONTENT (Description & CTA) --- */}
        <div className="lg:hidden mt-auto pb-8 flex flex-col gap-4 order-3 shrink-0">
             <motion.p 
                key={activeTab + "-desc"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white/80 text-sm text-center leading-relaxed px-4"
             >
                 {activeProduct.description}
             </motion.p>

             <div className="grid grid-cols-2 gap-3 px-2">
                 <a 
                    href={activeProduct.instructionLink}
                    target="_blank"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white border border-white/20 hover:bg-white/10"
                 >
                    <Info size={16} /> Инструкция
                 </a>
                 <a 
                    href="#where-to-buy"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-brand-yellow text-gray-900 shadow-lg"
                 >
                    <ShoppingCart size={16} /> Где купить
                 </a>
             </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-1 pointer-events-none z-20 animate-pulse lg:bottom-6">
        <ChevronDown size={20} className="hidden lg:block" />
      </div>
    </section>
  );
};