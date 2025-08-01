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
      {/* Anillo giratorio dorado */}
      <motion.div
        className="absolute w-full h-full rounded-full border-2 border-primary/60"
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          rotate: { duration: 8, ease: "linear", repeat: Infinity },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          filter: "drop-shadow(0 0 10px rgba(194, 165, 157, 0.5))",
        }}
      />
      
      {/* Segundo anillo giratorio interior */}
      <motion.div
        className="absolute w-[90%] h-[90%] rounded-full border border-ivory-white/40"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
        style={{
          filter: "drop-shadow(0 0 8px rgba(250, 249, 246, 0.3))",
        }}
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
          className="w-36 h-36 object-contain"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
          }}
          transition={{ 
            duration: 0.6,
          }}
          style={{
            filter: "drop-shadow(0 0 20px rgba(194, 165, 157, 0.8)) drop-shadow(0 0 40px rgba(250, 249, 246, 0.4))",
          }}
        />
      </motion.div>
      
      {/* Efecto de luz principal dorada */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(194, 165, 157, 0.4) 0%, rgba(194, 165, 157, 0.1) 50%, transparent 70%)",
          zIndex: -1,
        }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Segundo efecto de luz */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(250, 249, 246, 0.2) 0%, transparent 60%)",
          zIndex: -1,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Partículas de esencia orbitando */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(194, 165, 157, 0.9) 0%, rgba(231, 220, 209, 0.6) 100%)",
            filter: "blur(1px)",
          }}
          initial={{ x: particle.x * 0.5, y: particle.y * 0.5, opacity: 0 }}
          animate={{
            x: [particle.x * 0.8, particle.x, particle.x * 0.9],
            y: [particle.y * 0.8, particle.y, particle.y * 0.9],
            opacity: [0.5, 0.9, 0.5],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Destellos dorados perfumísticos */}
      {Array.from({ length: 16 }).map((_, index) => {
        const size = Math.random() * 3 + 2;
        const angle = Math.random() * Math.PI * 2;
        const radius = 25 + Math.random() * 35;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={`sparkle-${index}`}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: "radial-gradient(circle, rgba(250, 249, 246, 0.9) 0%, rgba(194, 165, 157, 0.7) 100%)",
              filter: "blur(0.5px)",
            }}
            initial={{ 
              x: x * 1.5, 
              y: y * 1.5, 
              opacity: 0 
            }}
            animate={{
              x: [x, x * 0.9, x * 1.1],
              y: [y, y * 1.1, y * 0.9],
              opacity: [0, 0.9, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 4,
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
