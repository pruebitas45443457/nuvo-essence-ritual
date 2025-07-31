import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo: React.FC = () => {
  // Partículas del logo
  const particles = Array.from({ length: 8 }).map((_, i) => {
    const angle = (Math.PI * 2 * i) / 8;
    const radius = 50;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    return { x, y, delay: i * 0.1 };
  });

  return (
    <div className="relative w-44 h-44 flex items-center justify-center">
      {/* Anillo giratorio */}
      <motion.div
        className="absolute w-full h-full rounded-full border border-primary/30"
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          rotate: { duration: 8, ease: "linear", repeat: Infinity },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      {/* Segundo anillo giratorio */}
      <motion.div
        className="absolute w-[90%] h-[90%] rounded-full border border-primary/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
      />
      
      {/* Imagen del logo */}
      <motion.div
        className="relative z-10"
        animate={{ 
          scale: [1, 1.03, 1],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <motion.img
          src="/logocarga.png"
          alt="NUVÓ"
          className="w-36 h-36 object-contain drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            filter: [
              "drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))",
              "drop-shadow(0 0 16px rgba(255, 255, 255, 0.3))",
              "drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))",
            ],
          }}
          transition={{ 
            duration: 0.6,
            filter: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
        />
      </motion.div>
      
      {/* Efecto de luz principal */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(211, 185, 156, 0.3) 0%, rgba(211, 185, 156, 0) 70%)",
          zIndex: -1,
        }}
        animate={{
          opacity: [0.6, 0.8, 0.6],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Partículas orbitando */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-primary/70 rounded-full"
          initial={{ x: particle.x * 0.5, y: particle.y * 0.5, opacity: 0 }}
          animate={{
            x: [particle.x * 0.8, particle.x, particle.x * 0.9],
            y: [particle.y * 0.8, particle.y, particle.y * 0.9],
            opacity: [0.4, 0.8, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Pequeños destellos aleatorios */}
      {Array.from({ length: 12 }).map((_, index) => {
        const size = Math.random() * 2 + 1;
        const angle = Math.random() * Math.PI * 2;
        const radius = 20 + Math.random() * 30;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={`sparkle-${index}`}
            className="absolute bg-white rounded-full"
            style={{
              width: size,
              height: size,
            }}
            initial={{ 
              x: x * 1.5, 
              y: y * 1.5, 
              opacity: 0 
            }}
            animate={{
              x: [x, x * 0.9, x * 1.1],
              y: [y, y * 1.1, y * 0.9],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default AnimatedLogo;
