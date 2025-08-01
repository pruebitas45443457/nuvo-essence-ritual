import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo: React.FC = () => {
  const particles = Array.from({ length: 8 }).map((_, i) => {
    const angle = (Math.PI * 2 * i) / 8;
    const radius = 45;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    return { x, y, delay: i * 0.1 };
  });

  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      {/* Anillo exterior dorado brillante */}
      <motion.div
        className="absolute w-full h-full rounded-full border-3"
        style={{
          borderColor: "rgba(194, 165, 157, 0.8)",
          filter: "drop-shadow(0 0 15px rgba(194, 165, 157, 0.6))",
        }}
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          rotate: { duration: 8, ease: "linear", repeat: Infinity },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      {/* Anillo interior marfil */}
      <motion.div
        className="absolute w-[85%] h-[85%] rounded-full border-2"
        style={{
          borderColor: "rgba(250, 249, 246, 0.9)",
          filter: "drop-shadow(0 0 10px rgba(250, 249, 246, 0.5))",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
      />
      
      {/* LOGO - Ahora visible con contraste perfecto */}
      <motion.div
        className="relative z-10"
        animate={{ 
          scale: [1, 1.02, 1],
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
          className="w-32 h-32 object-contain"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
          }}
          transition={{ 
            duration: 0.5,
          }}
          style={{
            filter: "drop-shadow(0 0 25px rgba(28, 28, 28, 0.9)) drop-shadow(0 0 50px rgba(194, 165, 157, 0.4))",
          }}
        />
      </motion.div>
      
      {/* Efecto de luz dorada de fondo */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(194, 165, 157, 0.3) 0%, rgba(194, 165, 157, 0.1) 40%, transparent 70%)",
          zIndex: -1,
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Luz marfil suave */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(250, 249, 246, 0.2) 0%, transparent 60%)",
          zIndex: -1,
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Partículas de esencia doradas */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(194, 165, 157, 0.9) 0%, rgba(231, 220, 209, 0.7) 100%)",
            filter: "blur(0.5px)",
          }}
          initial={{ x: particle.x * 0.4, y: particle.y * 0.4, opacity: 0 }}
          animate={{
            x: [particle.x * 0.7, particle.x, particle.x * 0.8],
            y: [particle.y * 0.7, particle.y, particle.y * 0.8],
            opacity: [0.4, 0.9, 0.4],
            scale: [0.7, 1.3, 0.7],
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Destellos perfumísticos */}
      {Array.from({ length: 12 }).map((_, index) => {
        const size = Math.random() * 3 + 2;
        const angle = Math.random() * Math.PI * 2;
        const radius = 20 + Math.random() * 25;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={`sparkle-${index}`}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: "radial-gradient(circle, rgba(250, 249, 246, 0.9) 0%, rgba(194, 165, 157, 0.6) 100%)",
              filter: "blur(0.3px)",
            }}
            initial={{ 
              x: x * 1.3, 
              y: y * 1.3, 
              opacity: 0 
            }}
            animate={{
              x: [x, x * 0.8, x * 1.1],
              y: [y, y * 1.2, y * 0.8],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 1.5 + Math.random() * 2,
              delay: Math.random() * 3,
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