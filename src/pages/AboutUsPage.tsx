import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pt-32 pb-20"
        >
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-primary text-center mb-16">
              Quiénes Somos
            </h1>
            <AboutUs isFullPage={true} />
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
