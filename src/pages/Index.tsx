import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Products from "@/components/Products";
import Tasting from "@/components/Tasting";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Appointment from "@/components/Appointment";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  // Al cargar la página principal, añadir una clase al body para animaciones globales
  useEffect(() => {
    document.body.classList.add('page-loaded');
    
    return () => {
      document.body.classList.remove('page-loaded');
    };
  }, []);
  
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <div id="inicio">
            <Hero />
          </div>
          <Products />
          <Tasting />
        <Testimonials />
        <Contact />
        <Appointment />
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
};

export default Index;
