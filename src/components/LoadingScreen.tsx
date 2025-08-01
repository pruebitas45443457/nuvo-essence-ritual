import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [showFinalText, setShowFinalText] = useState(false);
  
  const loadingTexts = [
    "Creando experiencias sensoriales...",
    "Preparando fragancias exclusivas...",
    "Diseñando momentos únicos...",
    "Refinando cada esencia...",
  ];
  
  const finalText = "NUVÓ Essence Ritual";

  useEffect(() => {
    // TIEMPO DE CARGA MUY REDUCIDO
    const startTime = Date.now();
    const minDisplayTime = 1500; // Solo 1.5 segundos
    
    // Progreso mucho más rápido
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const incrementFactor = prev < 60 ? 15 : 25; // Más rápido
        const newProgress = prev + Math.random() * incrementFactor;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setShowFinalText(true);
          
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
          
          setTimeout(() => {
            onLoadingComplete();
          }, remainingTime + 300); // Solo 300ms adicional
          
          return 100;
        }
        return newProgress;
      });
    }, 150); // Más frecuente

    // Cambio de texto más rápido
    const textInterval = setInterval(() => {
      setTextIndex((prev) => {
        return (prev + 1) % loadingTexts.length;
      });
    }, 800); // Más rápido

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onLoadingComplete, loadingTexts.length]);

  useEffect(() => {
    document.body.classList.add('loading-active');
    
    return () => {
      document.body.classList.remove('loading-active');
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      data-loading-screen="true"
    >
      {/* FONDO PERFUMÍSTICO ELEGANTE - DEGRADADO DORADO */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-gold via-cool-nude to-ivory-white" />
      
      {/* Efecto de niebla perfumística dorada */}
      <div className="absolute inset-0 opacity-40">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${150 + i * 80}px`,
              height: `${80 + i * 40}px`,
              left: `${15 + i * 12}%`,
              top: `${5 + i * 15}%`,
              background: `radial-gradient(ellipse, rgba(194, 165, 157, 0.3) 0%, rgba(231, 220, 209, 0.2) 50%, transparent 80%)`,
              filter: "blur(30px)",
            }}
            animate={{
              x: [0, 40, -30, 0],
              y: [0, -25, 35, 0],
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Partículas doradas flotantes */}
      {Array.from({ length: 30 }).map((_, index) => {
        const size = Math.random() * 5 + 3;
        const duration = Math.random() * 3 + 3;
        const delay = Math.random() * 2;
        const startPosition = Math.random() * 100;
        
        return (
          <motion.div
            key={index}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size,
              height: size,
              bottom: `-8%`,
              left: `${startPosition}%`,
              background: `radial-gradient(circle, rgba(194, 165, 157, 0.8) 0%, rgba(250, 249, 246, 0.6) 50%, transparent 100%)`,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, `-${85 + Math.random() * 25}vh`],
              x: [0, -25 + Math.random() * 50],
              opacity: [0, 0.8, 0],
              scale: [0.3, 1.2, 0.2],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "easeOut",
            }}
          />
        );
      })}

      <div className="relative z-10 w-full max-w-md px-4 flex flex-col items-center">
        {/* Logo animado */}
        <motion.div 
          className="mb-16"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 120, 
            delay: 0.1 
          }}
        >
          <AnimatedLogo />
        </motion.div>

        {/* Texto de carga */}
        <motion.div
          className="text-center mb-8 h-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {showFinalText ? (
              <motion.p
                key="final"
                className="font-primary text-2xl text-carbon-black font-bold"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                style={{ 
                  textShadow: "0 2px 10px rgba(255,255,255,0.8)"
                }}
              >
                {finalText}
              </motion.p>
            ) : (
              <motion.p
                key={textIndex}
                className="font-secondary text-lg text-carbon-black font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                style={{ 
                  textShadow: "0 1px 5px rgba(255,255,255,0.6)"
                }}
              >
                {loadingTexts[textIndex]}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Barra de progreso dorada */}
        <motion.div
          className="relative w-full max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="w-full bg-carbon-black/20 h-2 rounded-full overflow-hidden backdrop-blur-sm"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <motion.div
              className="relative h-full bg-gradient-to-r from-rose-gold via-rose-gold to-cool-nude rounded-full"
              style={{ width: `${loadingProgress}%` }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{
                  left: ["-100%", "200%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear",
                }}
                style={{ width: "50%" }}
              />
            </motion.div>
          </motion.div>
          
          <motion.p
            className="absolute -right-8 -top-6 text-sm font-bold text-carbon-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: loadingProgress > 5 ? 1 : 0 }}
            style={{ 
              textShadow: "0 1px 3px rgba(255,255,255,0.8)"
            }}
          >
            {Math.round(loadingProgress)}%
          </motion.p>
        </motion.div>
        
        {/* Anillos concéntricos dorados */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2"
              style={{
                width: `${250 + i * 80}px`,
                height: `${250 + i * 80}px`,
                borderColor: `rgba(194, 165, 157, ${0.3 - i * 0.1})`,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;