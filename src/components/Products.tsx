import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import collectionImage from "@/assets/perfume-collection.jpg";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronUp, Search, Plus, Star } from "lucide-react";
import gsap from "@/lib/gsap-config";

const Products = () => {
  const [activeCollection, setActiveCollection] = useState<number | null>(null);
  const [hoverEffect, setHoverEffect] = useState<number | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const collections = [
    {
      name: "Esencia Minimalista",
      description: "Fragancias puras y directas que hablan desde la sutileza, con notas cuidadosamente seleccionadas para crear una experiencia elegante y atemporal.",
      notes: ["Bergamota", "Cedro", "Almizcle Blanco", "Jengibre", "Vainilla"],
      category: "Unisex",
      intensity: "Sutil",
      price: "€85",
      imageUrl: "bg-[url('/src/assets/perfume-collection.jpg')]",
      featured: true
    },
    {
      name: "Ritual Íntimo",
      description: "Para momentos de conexión personal y presencia. Esta colección fue diseñada para acompañar tus momentos más especiales de reflexión y plenitud.",
      notes: ["Rosa Damascena", "Sándalo", "Vainilla", "Ambar", "Incienso"],
      category: "Femenino",
      intensity: "Moderada",
      price: "€110",
      imageUrl: "bg-[url('/src/assets/perfume-collection.jpg')]",
      featured: false
    },
    {
      name: "Elegancia Atemporal",
      description: "Sofisticación que trasciende tendencias y épocas. Fragancias con carácter que permanecen en la memoria y se convierten en parte de tu identidad.",
      notes: ["Vetiver", "Bergamota", "Cuero", "Pimienta Negra", "Mirra"],
      category: "Masculino",
      intensity: "Intensa",
      price: "€95",
      imageUrl: "bg-[url('/src/assets/perfume-collection.jpg')]",
      featured: true
    }
  ];

  const classifications = [
    {
      type: "Por Intensidad",
      categories: ["Sutil", "Moderada", "Intensa"]
    },
    {
      type: "Por Momento",
      categories: ["Día", "Noche", "Ocasión Especial"]
    },
    {
      type: "Por Personalidad",
      categories: ["Minimalista", "Sofisticado", "Auténtico"]
    }
  ];

  // Text animation with GSAP
  useEffect(() => {
    if (!headingRef.current) return;
    
    const textContent = headingRef.current.textContent || "";
    headingRef.current.innerHTML = "";
    
    // Split text into individual spans for animation
    [...textContent].forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.opacity = "0";
      span.style.display = "inline-block";
      span.style.transform = "translateY(20px)";
      headingRef.current?.appendChild(span);
    });

    // Set up scroll-triggered animations
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate heading
    timeline.to(headingRef.current.children, {
      opacity: 1,
      y: 0,
      stagger: 0.03,
      duration: 0.6,
      ease: "power3.out"
    });

    // Animate hero image
    if (heroRef.current) {
      timeline.fromTo(
        heroRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );
    }

    // Animate collection cards
    if (collectionsRef.current) {
      timeline.fromTo(
        collectionsRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
    }
  }, []);

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    hover: { y: -10, scale: 1.03, transition: { duration: 0.3 } }
  };

  const detailsVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1, 
      transition: { 
        duration: 0.5
      } 
    }
  };

  // Filter products based on selected category
  const filteredCollections = selectedCategory === "Todos" 
    ? collections 
    : collections.filter(item => item.category === selectedCategory || item.intensity === selectedCategory);

  return (
    <section 
      id="productos" 
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-background to-subtle relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with animated underline */}
        <div className="text-center mb-24 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-primary"></div>
          <h2 
            ref={headingRef}
            className="font-primary text-5xl md:text-6xl font-bold text-primary mt-8 mb-8"
          >
            Nuestros Productos
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-secondary text-xl md:text-2xl font-light text-muted-foreground max-w-3xl mx-auto"
          >
            Cada fragancia es una obra sensorial creada para acompañar tu ritual más íntimo
          </motion.p>
        </div>

        {/* Hero Image with Parallax */}
        <motion.div 
          ref={heroRef}
          className="mb-24 overflow-hidden rounded-xl shadow-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative h-[500px] group">
            <motion.div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${collectionImage})` }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.2 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center max-w-2xl px-4"
              >
                <h3 className="font-primary text-4xl md:text-5xl font-bold mb-6">Colección NUVÓ</h3>
                <p className="font-secondary text-xl font-light mb-8">Esencias que hablan sin palabras</p>
                
                <div className="flex flex-wrap justify-center gap-6 mb-8">
                  <Badge variant="outline" className="bg-white/10 backdrop-blur-sm px-4 py-2 text-white border-white/20">
                    Edición Exclusiva
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 backdrop-blur-sm px-4 py-2 text-white border-white/20">
                    Ingredientes Naturales
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 backdrop-blur-sm px-4 py-2 text-white border-white/20">
                    Producción Limitada
                  </Badge>
                </div>
                
                <Button 
                  variant="default" 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 hover:text-primary/90 font-secondary group"
                >
                  <span>Explorar Colección</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Product Filter */}
        <div className="mb-12">
          <motion.div 
            className="bg-background/80 backdrop-blur-md border border-border/40 rounded-lg p-4 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setFilterOpen(!filterOpen)}>
              <div className="flex items-center">
                <Search className="mr-3 h-5 w-5 text-primary" />
                <h4 className="font-primary text-xl font-medium text-foreground">Filtrar Productos</h4>
              </div>
              <Button variant="ghost" size="sm">
                {filterOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
            </div>

            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    <Button 
                      variant={selectedCategory === "Todos" ? "default" : "outline"} 
                      onClick={() => setSelectedCategory("Todos")}
                      className="font-secondary text-sm"
                    >
                      Todos
                    </Button>
                    <Button 
                      variant={selectedCategory === "Femenino" ? "default" : "outline"}
                      onClick={() => setSelectedCategory("Femenino")}
                      className="font-secondary text-sm"
                    >
                      Femenino
                    </Button>
                    <Button 
                      variant={selectedCategory === "Masculino" ? "default" : "outline"}
                      onClick={() => setSelectedCategory("Masculino")}
                      className="font-secondary text-sm"
                    >
                      Masculino
                    </Button>
                    <Button 
                      variant={selectedCategory === "Unisex" ? "default" : "outline"}
                      onClick={() => setSelectedCategory("Unisex")}
                      className="font-secondary text-sm"
                    >
                      Unisex
                    </Button>
                    <Button 
                      variant={selectedCategory === "Sutil" ? "default" : "outline"}
                      onClick={() => setSelectedCategory("Sutil")}
                      className="font-secondary text-sm"
                    >
                      Sutil
                    </Button>
                    <Button 
                      variant={selectedCategory === "Moderada" ? "default" : "outline"}
                      onClick={() => setSelectedCategory("Moderada")}
                      className="font-secondary text-sm"
                    >
                      Moderada
                    </Button>
                    <Button 
                      variant={selectedCategory === "Intensa" ? "default" : "outline"}
                      onClick={() => setSelectedCategory("Intensa")}
                      className="font-secondary text-sm"
                    >
                      Intensa
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Product Collections */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <h3 className="font-primary text-3xl font-semibold text-primary">
              Nuestras Colecciones
            </h3>
            <Button variant="outline" className="font-secondary group flex items-center">
              <span>Ver Catálogo</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8" ref={collectionsRef}>
            {filteredCollections.map((product, index) => (
              <motion.div 
                key={index}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                variants={cardVariants}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1 }}
                className="group"
                onMouseEnter={() => setHoverEffect(index)}
                onMouseLeave={() => setHoverEffect(null)}
              >
                <Card className="bg-background/60 backdrop-blur-sm border-border/40 overflow-hidden h-full shadow-lg transition-all duration-500 hover:shadow-xl">
                  <div className={`h-48 ${product.imageUrl} bg-cover bg-center relative`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                    {product.featured && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary text-white">
                          <Star className="mr-1 h-3 w-3" />
                          Destacado
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="outline" className="bg-black/30 backdrop-blur-sm text-white">
                        {product.price}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="font-primary text-xl font-semibold text-primary">
                        {product.name}
                      </CardTitle>
                      <Badge variant="secondary" className="font-secondary text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="w-fit font-secondary text-xs">
                      {product.intensity}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="font-secondary text-sm text-foreground mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-secondary text-sm font-medium text-primary mb-2 flex items-center">
                        <span>Notas principales</span>
                        <div className="flex-grow h-[1px] bg-primary/10 ml-2"></div>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {product.notes.map((note, noteIndex) => (
                          <Badge 
                            key={noteIndex} 
                            variant="outline" 
                            className={`font-secondary text-xs transition-colors duration-300 ${
                              hoverEffect === index ? 'bg-primary/10 border-primary/30' : ''
                            }`}
                          >
                            {note}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="default" 
                        className="w-3/4 font-secondary"
                        onClick={() => setActiveCollection(activeCollection === index ? null : index)}
                      >
                        {activeCollection === index ? 'Cerrar' : 'Detalles'}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-1/4 flex items-center justify-center"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <AnimatePresence>
                      {activeCollection === index && (
                        <motion.div
                          variants={detailsVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="mt-4 pt-4 border-t border-border/40"
                        >
                          <div className="space-y-3">
                            <div>
                              <h5 className="text-xs font-medium text-primary mb-1">Composición</h5>
                              <p className="text-xs text-muted-foreground">100% ingredientes de alta calidad, seleccionados por nuestros maestros perfumistas.</p>
                            </div>
                            <div>
                              <h5 className="text-xs font-medium text-primary mb-1">Durabilidad</h5>
                              <p className="text-xs text-muted-foreground">8-10 horas en la piel, dependiendo de factores personales.</p>
                            </div>
                            <div>
                              <h5 className="text-xs font-medium text-primary mb-1">Presentación</h5>
                              <p className="text-xs text-muted-foreground">Frasco de cristal artesanal de 50ml y 100ml con estuche premium.</p>
                            </div>
                            <Button variant="link" className="text-xs p-0 h-auto font-secondary text-primary">
                              Ver ficha completa
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Classifications with floating animations */}
        <div className="mb-24">
          <div className="relative mb-16">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-primary"></div>
            <h3 className="font-primary text-4xl font-semibold text-center text-primary mt-6 mb-12">
              Clasificación de Perfumes
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {classifications.map((classification, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-background/60 backdrop-blur-sm border-border/40 overflow-hidden h-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="text-xl text-primary">{index + 1}</span>
                      </div>
                      <h4 className="font-primary text-xl font-semibold text-primary">
                        {classification.type}
                      </h4>
                    </div>
                    
                    <div className="space-y-3">
                      {classification.categories.map((category, catIndex) => (
                        <motion.div 
                          key={catIndex} 
                          className="font-secondary text-sm text-foreground p-3 bg-subtle/80 backdrop-blur-sm rounded-md"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                            {category}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call-to-Action Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 backdrop-blur-md text-foreground max-w-3xl mx-auto overflow-hidden border-primary/20">
            <div className="absolute top-0 left-0 w-full h-full pattern-dots pattern-primary pattern-bg-transparent pattern-opacity-10 pattern-size-2"></div>
            <CardContent className="p-12 relative z-10">
              <h3 className="font-primary text-3xl font-semibold mb-6">
                ¿Tienes una fragancia especial?
              </h3>
              <p className="font-secondary text-lg font-light mb-8 max-w-2xl mx-auto">
                Nos encantaría conocer tu esencia única y considerarla para nuestra colección.
                Cada perfume cuenta una historia, ¿cuál es la tuya?
              </p>
              <Button 
                variant="default" 
                size="lg" 
                className="font-secondary group"
              >
                <span>Proponer Fragancia</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;