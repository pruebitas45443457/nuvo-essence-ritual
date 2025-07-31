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
    // Registrar el tiempo de inicio para asegurar un tiempo mínimo de carga
    const startTime = Date.now();
    const minDisplayTime = 3000; // Tiempo mínimo de 3 segundos
    
    // Simular progreso de carga
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        // Aumentar la carga más lentamente al principio, más rápido al final
        const incrementFactor = prev < 50 ? 5 : 10;
        const newProgress = prev + Math.random() * incrementFactor;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Mostrar texto final cuando la carga está completa
          setShowFinalText(true);
          
          // Calcular cuánto tiempo ha pasado y asegurar el tiempo mínimo
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
          
          // Esperar el tiempo restante antes de completar la carga
          setTimeout(() => {
            onLoadingComplete();
          }, remainingTime + 1000); // Añadimos 1 segundo adicional para la animación final
          
          return 100;
        }
        return newProgress;
      });
    }, 300);

    // Cambiar el texto cada 1.5 segundos
    const textInterval = setInterval(() => {
      setTextIndex((prev) => {
        // Solo mostrar los textos de carga, no el final aún
        return (prev + 1) % loadingTexts.length;
      });
    }, 1500);

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
      initial={{ opacity: 1 }} // Comenzamos visible
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      data-loading-screen="true"
    >
      {/* Fondo con gradiente avanzado */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-elegant to-background" />
      
      {/* Efecto de partículas flotantes */}
      {Array.from({ length: 30 }).map((_, index) => {
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 3 + 3;
        const delay = Math.random() * 5;
        const startPosition = Math.random() * 100;
        
        return (
          <motion.div
            key={index}
            className="absolute rounded-full bg-primary/40 pointer-events-none"
            style={{
              width: size,
              height: size,
              bottom: `-5%`,
              left: `${startPosition}%`,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, `-${80 + Math.random() * 40}vh`],
              x: [0, -20 + Math.random() * 40],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0.5],
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
