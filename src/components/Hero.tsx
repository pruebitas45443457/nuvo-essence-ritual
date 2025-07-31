import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-perfume.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="font-primary text-6xl md:text-8xl font-bold mb-6 tracking-wide">
          NUVÓ
        </h1>
        <p className="font-secondary text-xl md:text-2xl font-light mb-8 leading-relaxed max-w-2xl mx-auto">
          Resignificar el perfume como una experiencia íntima, artística y atemporal
        </p>
        <p className="font-secondary text-lg md:text-xl font-extralight mb-12 opacity-90 max-w-3xl mx-auto">
          No buscamos impresionar. Buscamos conmover. Porque hay aromas que se sienten incluso después de irse.
        </p>
        <Button 
          variant="outline" 
          size="lg"
          className="font-secondary text-white border-white hover:bg-white hover:text-primary transition-all duration-300"
        >
          Descubrir Esencias
        </Button>
      </div>
    </section>
  );
};

export default Hero;