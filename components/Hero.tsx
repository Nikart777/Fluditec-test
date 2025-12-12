'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from 'framer-motion';
import { User, Baby, Download, ChevronDown, Wind, Sparkles, FileText, Droplets } from 'lucide-react';
import { HERO_PRODUCTS } from '@/lib/constants';

interface ProductItem {
  id: string;
  title: string;
  subtitle: string;
  age: string;
  color: string;
  textColor: string;
  description: string;
  instructionLink: string;
  image: string; 
  variant: string;
}

export const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D Logic
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  
  // Увеличиваем амплитуду движения для "свободного" объекта
  const rotateX = useTransform(springY, [0, 1], [10, -10]); 
  const rotateY = useTransform(springX, [0, 1], [-10, 10]); 

  // --- CANVAS: AIRFLOW & RELIEF EFFECT ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: AirParticle[] = [];
    let animationFrameId: number;

    const mouse = { x: -1000, y: -1000, radius: 200 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    class AirParticle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      speedY: number;
      angle: number;
      color: string;
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height + height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 4 + 1; 
        this.density = (Math.random() * 30) + 1;
        this.speedY = Math.random() * 2 + 0.8; 
        this.angle = Math.random() * 360;
        this.alpha = Math.random() * 0.4 + 0.1;

        const rand = Math.random();
        if (rand > 0.9) this.color = '254, 238, 49'; // Yellow
        else if (rand > 0.8) this.color = '0, 173, 174'; // Teal
        else this.color = '255, 255, 255'; // White
      }

      update() {
        this.angle += 0.01;
        this.x += Math.sin(this.angle) * 0.8; 
        this.y -= this.speedY;

        if (this.y < -50) {
          this.y = height + 50;
          this.x = Math.random() * width;
        }

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;
            
            this.x -= directionX;
            this.y -= directionY;
        }
      }

      draw() {
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
      for (let i = 0; i < count; i++) {
        particles.push(new AirParticle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    
    const onMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }
    
    window.addEventListener('mousemove', onMouseMove);

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      x.set(mouseX / width);
      y.set(mouseY / height);
    }
  };

  const activeProduct = (HERO_PRODUCTS[activeSlide] || HERO_PRODUCTS[0]) as ProductItem;

  if (!mounted) return null;

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleContainerMouseMove}
      className="relative min-h-[100dvh] pt-24 pb-12 overflow-hidden bg-brand-purple flex items-center justify-center perspective-1000"
    >
      
      {/* 2. ФОН: CANVAS AIRFLOW */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-purple via-[#4a3db8] to-brand-purple opacity-90" />
        <canvas ref={canvasRef} className="block w-full h-full opacity-60 mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#1a1a1a_100%)] opacity-30" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-8 items-center relative z-20 h-full">
        
        {/* ЛЕВАЯ ЧАСТЬ */}
        <div className="lg:col-span-5 space-y-8 text-center lg:text-left order-2 lg:order-1 pt-12 lg:pt-0">
          <div className="relative z-10">
             <motion.div 
                animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-14 -left-10 text-brand-yellow/30 hidden lg:block"
             >
                <Wind size={80} strokeWidth={1} />
             </motion.div>

             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.9] tracking-tight mb-4 drop-shadow-2xl"
             >
              НЕ <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">ОТВЛЕКАЙСЯ</span> <br/>
              <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-brand-yellow">
                    НА КАШЕЛЬ!
                  </span>
                  <motion.svg 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.6, duration: 1.2 }}
                    viewBox="0 0 200 20" 
                    className="absolute -bottom-4 left-0 w-full h-6 text-white/20 -z-10"
                  >
                    <path d="M10 10 Q 100 20 190 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </motion.svg>
              </span>
            </motion.h1>
          </div>
            
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className="text-lg md:text-xl text-purple-100 font-light mt-6 max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
              <span className="font-bold text-white">Флюдитек</span> — тройное действие против кашля и мокроты. Верните свободное дыхание.
          </motion.p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-8">
            {/* Кнопка 1: Саше (Index 0) */}
            <motion.button 
              onClick={() => setActiveSlide(0)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 border border-white/10 ${activeSlide === 0 ? 'bg-white text-brand-purple' : 'bg-white/5 text-white hover:bg-white/20'}`}
            >
              <FileText size={18} /> 
              Взрослым (Саше)
            </motion.button>
            
            {/* Кнопка 2: Сироп взрослый (Index 2) */}
            <motion.button 
              onClick={() => setActiveSlide(2)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 border border-white/10 ${activeSlide === 2 ? 'bg-brand-teal text-white' : 'bg-white/5 text-white hover:bg-white/20'}`}
            >
              <Droplets size={18} /> 
              Взрослым (Сироп)
            </motion.button>

             {/* Кнопка 3: Дети (Index 1) */}
             <motion.button 
              onClick={() => setActiveSlide(1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 border border-white/10 ${activeSlide === 1 ? 'bg-brand-yellow text-gray-900' : 'bg-white/5 text-white hover:bg-white/20'}`}
            >
              <Baby size={18} /> 
              Для детей
            </motion.button>
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ: FREE FLOATING PRODUCT */}
        <div className="lg:col-span-7 relative h-[60vh] lg:h-[80vh] flex items-center justify-center order-1 lg:order-2 perspective-1000">
            
            <AnimatePresence mode='wait'>
                <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    animate={{ 
                        opacity: 1, 
                        scale: 1, 
                        rotate: 0,
                    }}
                    exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    transition={{ 
                        type: "spring", stiffness: 100, damping: 20
                    }}
                    style={{ 
                        rotateX: rotateX, 
                        rotateY: rotateY,
                        transformStyle: "preserve-3d" 
                    }}
                    className="relative w-full h-full flex items-center justify-center"
                >
                    {/* 1. ГИГАНТСКОЕ СВЕЧЕНИЕ */}
                    <div 
                        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-40 transition-colors duration-700 animate-pulse"
                        style={{ backgroundColor: activeProduct.color, transform: "translateZ(-100px)" }}
                    />

                    {/* 2. ПРЕПАРАТ */}
                    <motion.div 
                        className="relative z-20 w-auto h-[60%] lg:h-[75%] max-h-[700px] flex justify-center items-center drop-shadow-2xl filter"
                        style={{ transform: "translateZ(50px)" }}
                        animate={{ y: [-15, 15, -15] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <img 
                            src={activeProduct.image} 
                            alt={activeProduct.title}
                            className="h-full w-full object-contain"
                        />
                    </motion.div>

                    {/* 3. ПЛАВАЮЩИЕ ИНФО-ЧИПЫ */}
                    
                    {/* Чип: Возраст */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-[10%] right-[5%] lg:right-[15%] flex flex-col items-center justify-center w-24 h-24 lg:w-32 lg:h-32 rounded-full backdrop-blur-xl border border-white/20 shadow-2xl z-30"
                        style={{ backgroundColor: 'rgba(255,255,255,0.1)', transform: "translateZ(80px)" }}
                    >
                        <span className={`text-3xl lg:text-4xl font-black ${activeProduct.textColor === 'text-white' ? 'text-white' : 'text-brand-yellow'}`} style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                            {activeProduct.age}
                        </span>
                        <span className="text-xs text-white/80 uppercase tracking-widest mt-1">Возраст</span>
                    </motion.div>

                    {/* Чип: Описание продукта */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="absolute bottom-[10%] left-[5%] lg:left-[10%] p-6 rounded-3xl backdrop-blur-xl border border-white/10 bg-white/5 shadow-2xl max-w-[280px] z-30"
                        style={{ transform: "translateZ(60px)" }}
                    >
                        <h3 className="text-xl font-bold text-white mb-1">{activeProduct.subtitle}</h3>
                        <div className="h-1 w-12 rounded-full mb-3" style={{ backgroundColor: activeProduct.color }} />
                        <p className="text-sm text-gray-200 leading-relaxed">
                            {activeProduct.description}
                        </p>
                    </motion.div>

                    {/* Чип: Скачать инструкцию */}
                    <motion.a 
                        href={activeProduct.instructionLink}
                        target="_blank"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ delay: 0.4 }}
                        className="absolute bottom-[20%] right-[10%] lg:right-[20%] w-16 h-16 lg:w-20 lg:h-20 rounded-full backdrop-blur-xl border border-white/30 bg-white/10 flex items-center justify-center cursor-pointer shadow-lg hover:bg-white hover:text-brand-purple text-white transition-all z-30 group"
                        style={{ transform: "translateZ(70px)" }}
                    >
                        <Download size={28} className="group-hover:animate-bounce" />
                        <span className="absolute -bottom-8 text-xs font-bold text-white/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Инструкция</span>
                    </motion.a>

                </motion.div>
            </AnimatePresence>
            
            {/* Навигация (точки) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {HERO_PRODUCTS.map((item: ProductItem, index: number) => (
                    <button 
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeSlide ? 'scale-150 ring-2 ring-offset-2 ring-transparent' : 'opacity-50 hover:opacity-100'}`}
                        style={{ backgroundColor: index === activeSlide ? item.color : '#ffffff' }}
                    />
                ))}
            </div>

        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 pointer-events-none z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Листайте вниз</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
};