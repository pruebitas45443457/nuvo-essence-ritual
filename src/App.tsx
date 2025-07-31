import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AboutUsPage from "./pages/AboutUsPage";
import NotFound from "./pages/NotFound";
import LoadingScreen from "./components/LoadingScreen";
import { AnimatePresence, motion } from "framer-motion";

const queryClient = new QueryClient();

const App = () => {
  // Estado para controlar la carga y la visibilidad de la aplicación
  const [isLoading, setIsLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Aseguramos que la pantalla de carga se muestre primero
    document.body.style.overflow = 'hidden';
    
    // Precargar imágenes importantes para evitar parpadeos después de la pantalla de carga
    const preloadImages = [
      "/logo.png",
      "/logocarga.png",
      "/src/assets/hero-perfume.jpg",
      "/src/assets/essence-abstract.jpg",
    ];

    const imagePromises = preloadImages.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    // Esperar a que se carguen todas las imágenes importantes
    Promise.all(imagePromises)
      .catch((err) => console.error("Error precargando imágenes:", err))
      .finally(() => {
        // Marcar la aplicación como lista después de un tiempo mínimo
        // Mantenemos la pantalla de carga por al menos 3 segundos para asegurar una buena experiencia
        setTimeout(() => {
          // No hacemos nada aquí, dejamos que LoadingScreen controle cuando termina
        }, 3000);
      });
  }, []);

  const handleLoadingComplete = () => {
    // Cuando la animación de carga termina, permitimos que se muestre el contenido
    setContentVisible(true);
    
    // Luego de un breve retraso para la transición, quitamos la pantalla de carga
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = '';
    }, 800);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        {/* Siempre mostramos la pantalla de carga primero */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <LoadingScreen onLoadingComplete={handleLoadingComplete} />
          )}
        </AnimatePresence>

        {/* Contenido de la aplicación - solo visible después de la animación de carga */}
        <AnimatePresence>
          {contentVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/nosotros" element={<AboutUsPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </motion.div>
          )}
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
