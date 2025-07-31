import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Products from "@/components/Products";
import Tasting from "@/components/Tasting";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Appointment from "@/components/Appointment";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <div id="inicio">
          <Hero />
        </div>
        <AboutUs />
        <Products />
        <Tasting />
        <Testimonials />
        <Contact />
        <Appointment />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
