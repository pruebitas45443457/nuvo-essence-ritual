import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-perfume.jpg";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";

interface ParallaxProps {
  children: React.ReactNode;
  offset?: number;
}

const ParallaxText = ({ children, offset = 50 }: ParallaxProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2 }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.8"
      )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.8"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );

    // Subtle parallax effect on scroll - reduced movement to prevent white background showing
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 5; // Reduced from 20 to 5
      const y = (clientY / window.innerHeight - 0.5) * 5; // Reduced from 20 to 5
      
      gsap.to(containerRef.current.querySelector('.bg-image'), {
        duration: 2,
        x: x,
        y: y,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      id="inicio"
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Background Image with Parallax Effect - Fixed positioning to prevent white background showing */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-image scale-105"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          opacity,
          scale,
          willChange: 'transform'
        }}
      >
        {/* Enhanced overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-carbon-black/70 via-carbon-black/60 to-carbon-black/50"></div>
        <div className="absolute inset-0 bg-carbon-black/20"></div>
      </motion.div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-rose-gold/30"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{ 
              y: [null, Math.random() * 200 - 100 + "vh"], 
              x: [null, Math.random() * 200 - 100 + "vw"] 
            }}
            transition={{ 
              duration: Math.random() * 120 + 80, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-ivory-white max-w-5xl mx-auto px-4">
        <ParallaxText offset={-20}>
          <motion.h1 
            ref={titleRef}
            className="font-primary text-7xl md:text-9xl font-bold mb-8 tracking-wider"
            style={{ textShadow: "0 0 40px rgba(0,0,0,0.5)" }}
          >
            NUVÓ
          </motion.h1>
        </ParallaxText>
        
        <ParallaxText offset={-15}>
          <motion.p 
            ref={subtitleRef}
            className="font-secondary text-xl md:text-3xl font-light mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            Perfumes de 
            <span className="text-primary"> alta calidad </span> 
            con un 
            <span className="text-rose-gold"> toque personal</span>
          </motion.p>
        </ParallaxText>
        
        <ParallaxText offset={-10}>
          <motion.p 
            ref={textRef}
            className="font-secondary text-lg md:text-xl font-extralight mb-14 opacity-85 max-w-3xl mx-auto"
          >
            Descubre tu aroma único
          </motion.p>
        </ParallaxText>
        
        <motion.div ref={buttonRef}>
          <Button 
            variant="outline" 
            size="lg"
            className="font-secondary text-carbon-black bg-ivory-white/90 border-ivory-white hover:bg-transparent hover:text-ivory-white border-2 backdrop-blur-sm transition-all duration-500 hover:scale-105 group overflow-hidden relative shadow-lg"
          >
            <span className="relative z-10 font-medium">Descubrir Esencias</span>
          </Button>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-ivory-white/80"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs font-secondary tracking-widest">DESLIZA</span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;