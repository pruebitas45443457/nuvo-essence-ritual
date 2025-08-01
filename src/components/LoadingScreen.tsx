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
    // Tiempo de carga reducido y más fluido
    const startTime = Date.now();
    const minDisplayTime = 2000; // Reducido a 2 segundos
    
    // Progreso de carga más rápido y fluido
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        // Progreso más suave y rápido
        const incrementFactor = prev < 70 ? 8 : 15;
        const newProgress = prev + Math.random() * incrementFactor;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Mostrar texto final cuando la carga está completa
          setShowFinalText(true);
          
          // Calcular cuánto tiempo ha pasado y asegurar el tiempo mínimo
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
          
          // Tiempo de espera reducido
          setTimeout(() => {
            onLoadingComplete();
          }, remainingTime + 500); // Reducido de 1000 a 500ms
          
          return 100;
        }
        return newProgress;
      });
    }, 200); // Reducido de 300 a 200ms para más fluidez

    // Cambiar el texto más rápido
    const textInterval = setInterval(() => {
      setTextIndex((prev) => {
        return (prev + 1) % loadingTexts.length;
      });
    }, 1200); // Reducido de 1500 a 1200ms

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onLoadingComplete, loadingTexts.length]);

  // Efecto para añadir una clase al body
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
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      data-loading-screen="true"
    >
      {/* Fondo perfumístico elegante */}
      <div className="absolute inset-0 bg-gradient-to-br from-elegant via-carbon-black to-primary/20" />
      
      {/* Efecto de niebla perfumística */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-primary/20 via-ivory-white/10 to-transparent"
            style={{
              width: `${200 + i * 100}px`,
              height: `${100 + i * 50}px`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
              filter: "blur(40px)",
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Partículas de esencia perfumística */}
      {Array.from({ length: 25 }).map((_, index) => {
        const size = Math.random() * 6 + 3;
        const duration = Math.random() * 4 + 4;
        const delay = Math.random() * 3;
        const startPosition = Math.random() * 100;
        
        return (
          <motion.div
            key={index}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: size,
              height: size,
              bottom: `-10%`,
              left: `${startPosition}%`,
              background: `radial-gradient(circle, rgba(194, 165, 157, 0.6) 0%, rgba(231, 220, 209, 0.3) 50%, transparent 100%)`,
              filter: "blur(2px)",
            }}
            animate={{
              y: [0, `-${90 + Math.random() * 30}vh`],
              x: [0, -30 + Math.random() * 60],
              opacity: [0, 0.7, 0],
              scale: [0.3, 1, 0.2],
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
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            delay: 0.2 
          }}
        >
          <AnimatedLogo />
        </motion.div>

        {/* Texto de carga con cambio suave */}
        <motion.div
          className="text-center mb-8 h-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {showFinalText ? (
              <motion.p
                key="final"
                className="font-primary text-2xl text-primary font-semibold"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {finalText}
              </motion.p>
            ) : (
              <motion.p
                key={textIndex}
                className="font-primary text-lg text-white/90"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {loadingTexts[textIndex]}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Barra de progreso estilizada */}
        <motion.div
          className="relative w-full max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* Línea base */}
          <motion.div
            className="w-full bg-white/10 h-1 rounded-full overflow-hidden"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {/* Barra de progreso con brillo */}
            <motion.div
              className="relative h-full bg-gradient-to-r from-primary/70 via-primary to-primary/70 rounded-full"
              style={{ width: `${loadingProgress}%` }}
            >
              {/* Efecto de brillo que se mueve */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{
                  left: ["-100%", "200%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear",
                }}
                style={{ width: "50%" }}
              />
            </motion.div>
          </motion.div>
          
          {/* Porcentaje */}
          <motion.p
            className="absolute -right-8 -top-6 text-xs font-medium text-primary/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: loadingProgress > 5 ? 1 : 0 }}
          >
            {Math.round(loadingProgress)}%
          </motion.p>
        </motion.div>
        
        {/* Efecto de anillos concéntricos */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-primary/20"
              style={{
                width: `${300 + i * 100}px`,
                height: `${300 + i * 100}px`,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.3,
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
