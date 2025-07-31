import { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight } from "lucide-react";
import gsap from "@/lib/gsap-config";

interface AboutUsProps {
  isFullPage?: boolean;
}

const AboutUs = ({ isFullPage = false }: AboutUsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const values = [
    {
      title: "SUTILEZA",
      description: "Creemos que el lujo no necesita anunciarse. NUVÓ es elegancia que se percibe, no que se impone.",
      icon: "✦" // Elegant symbol
    },
    {
      title: "RITUALIDAD",
      description: "Cada fragancia es un ritual íntimo, una experiencia que se integra a la piel y a la memoria.",
      icon: "⟐" // Elegant symbol
    },
    {
      title: "AUTENTICIDAD",
      description: "No seguimos tendencias. Creamos esencias atemporales, hechas para quienes buscan la verdad en lo simple.",
      icon: "◈" // Elegant symbol
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    // Text reveal effect
    const splitTextAnimation = () => {
      if (!titleRef.current) return;
      
      const textContent = titleRef.current.textContent || "";
      titleRef.current.innerHTML = "";
      
      // Create individual spans for each letter
      [...textContent].forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.opacity = "0";
        span.style.display = "inline-block";
        span.style.transform = "translateY(20px)";
        titleRef.current?.appendChild(span);
      });
    };

    splitTextAnimation();

    // Animation timeline
    const setupScrollAnimations = () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "center center",
          toggleActions: "play none none reverse"
        }
      });

      // Title animation
      timeline.to(titleRef.current?.children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out"
      });

      // Mission and Vision cards animation
      if (missionRef.current && visionRef.current) {
        timeline
          .fromTo(
            missionRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.4"
          )
          .fromTo(
            visionRef.current,
            { x: 50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.6"
          );
      }

      // Values animation
      if (valuesRef.current) {
        timeline.fromTo(
          valuesRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        );
      }

      // Story animation
      if (storyRef.current) {
        timeline.fromTo(
          storyRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.2"
        );
      }
    };

    // Initialize animation
    setupScrollAnimations();
  }, []);

  // Card hover effect variants
  const cardVariants = {
    initial: { scale: 1, boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" },
    hover: { 
      scale: 1.03, 
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  // Text reveal variants
  const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section 
      id="nosotros" 
      ref={sectionRef}
      className={`${isFullPage ? 'pt-0' : 'py-32'} bg-gradient-to-b from-background via-subtle to-background relative overflow-hidden`}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with animated border */}
        {!isFullPage && (
          <div className="text-center mb-24 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-primary"></div>
            <h2 
              ref={titleRef}
              className="font-primary text-5xl md:text-6xl font-bold text-primary mt-8 mb-8"
            >
              Quiénes Somos
          </h2>
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.p 
              variants={textRevealVariants}
              className="font-secondary text-xl md:text-2xl font-light text-foreground leading-relaxed mb-8"
            >
              NUVÓ crea experiencias sensoriales únicas para quienes buscan perfumes exclusivos.
            </motion.p>
            <motion.p 
              variants={textRevealVariants}
              className="font-secondary text-lg md:text-xl font-extralight text-muted-foreground leading-relaxed"
            >
              No elegimos una fragancia solo por apariencia, sino para evocar recuerdos, conectar con lo auténtico 
              y acompañar el ritual de habitar el cuerpo.
            </motion.p>
          </motion.div>
        </div>
        )}

        {/* Mission & Vision with 3D tilt effect */}
        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <motion.div 
            ref={missionRef}
            whileHover="hover"
            initial="initial"
            variants={cardVariants}
          >
            <Card className="bg-background/80 backdrop-blur-sm border-primary/10 shadow-lg overflow-hidden h-full">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
              <CardContent className="p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-primary text-2xl font-semibold text-primary">M</span>
                  </div>
                  <h3 className="font-primary text-3xl font-semibold text-primary">MISIÓN</h3>
                </div>
                <p className="font-secondary text-lg font-light text-foreground leading-relaxed">
                  Redefinir el perfume como una obra sensorial atemporal, íntima y auténtica. 
                  Crear experiencias que acompañen momentos personales, desde lo sutil y lo esencial 
                  sin artificios ni excesos.
                </p>
                <motion.div 
                  className="mt-6 flex items-center text-primary/70 group cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <span className="font-secondary text-sm mr-2">Leer más</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            ref={visionRef}
            whileHover="hover"
            initial="initial"
            variants={cardVariants}
          >
            <Card className="bg-background/80 backdrop-blur-sm border-primary/10 shadow-lg overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-1 h-full bg-primary"></div>
              <CardContent className="p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-primary text-2xl font-semibold text-primary">V</span>
                  </div>
                  <h3 className="font-primary text-3xl font-semibold text-primary">VISIÓN</h3>
                </div>
                <p className="font-secondary text-lg font-light text-foreground leading-relaxed">
                  Ser una casa de perfumes reconocida por su elegancia y su conexión emocional con quienes 
                  eligen vivir la belleza como una experiencia auténtica. Queremos que NUVÓ sea sinónimo 
                  de arte, esencia y presencia.
                </p>
                <motion.div 
                  className="mt-6 flex items-center text-primary/70 group cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <span className="font-secondary text-sm mr-2">Leer más</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Values with interactive scroll area */}
        <div className="mb-24">
          <div className="relative mb-16">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-primary"></div>
            <h3 className="font-primary text-4xl font-semibold text-center text-primary mt-6">
              Nuestros Valores
            </h3>
          </div>

          <ScrollArea className="w-full h-[400px] px-4 md:px-10">
            <div className="grid md:grid-cols-3 gap-12" ref={valuesRef}>
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="bg-background/80 backdrop-blur-sm border-primary/10 h-full transform transition-all duration-500 group-hover:shadow-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="p-10 text-center relative z-10">
                      <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-3xl text-primary">{value.icon}</span>
                        </div>
                      </div>
                      <h4 className="font-primary text-2xl font-semibold text-primary mb-4">
                        {value.title}
                      </h4>
                      <p className="font-secondary text-base font-light text-foreground leading-relaxed">
                        {value.description}
                      </p>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Brand Story with gradient text */}
        <motion.div 
          ref={storyRef}
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="max-w-3xl mx-auto">
            <p className="font-secondary text-xl font-light text-foreground leading-relaxed mb-8">
              Aplicar una esencia es también un acto de presencia. Una forma sutil de decir "estoy acá", 
              de ser fiel a lo que somos y permitir que los demás lo intuyan.
            </p>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary to-primary/80 blur-sm opacity-30"></div>
              <p className="font-primary text-2xl md:text-3xl font-medium text-primary relative">
                Elegancia que perdura en el tiempo
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;