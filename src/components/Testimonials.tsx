import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, Quote, User, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Testimonials = () => {
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: ""
  });
  const { toast } = useToast();

  const testimonials = [
    {
      name: "Marina S.",
      comment: "NUVÓ cambió completamente mi relación con los perfumes. Encontré una esencia que realmente me representa, no solo me gusta.",
      rating: 5,
      fragrance: "Esencia Minimalista"
    },
    {
      name: "Alejandro R.",
      comment: "La cata fue una experiencia increíble. Nunca pensé que un perfume pudiera evocar tantos recuerdos y emociones.",
      rating: 5,
      fragrance: "Elegancia Atemporal"
    },
    {
      name: "Sofia L.",
      comment: "La sutileza de estas fragancias es única. Es exactamente lo que buscaba: elegancia sin ostentación.",
      rating: 5,
      fragrance: "Ritual Íntimo"
    }
  ];

  const handleSubmitTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.comment) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa tu nombre y comentario.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "¡Gracias por tu testimonio!",
      description: "Tu opinión será revisada y publicada pronto.",
    });

    setNewTestimonial({
      name: "",
      email: "",
      rating: 5,
      comment: ""
    });
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? "text-yellow-400 fill-yellow-400" 
                : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={interactive && onRate ? () => onRate(star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="testimonios" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-primary text-4xl md:text-5xl font-bold text-primary mb-6">
            Testimonios
          </h2>
          <p className="font-secondary text-lg md:text-xl font-light text-muted-foreground max-w-3xl mx-auto">
            Las experiencias de quienes han encontrado su esencia única con NUVÓ
          </p>
        </div>

        {/* Existing Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-subtle border-border hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="w-6 h-6 text-accent mr-3" />
                  <div className="flex-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                <p className="font-secondary text-sm text-foreground mb-4 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-muted-foreground mr-2" />
                      <span className="font-secondary text-sm font-medium text-primary">
                        {testimonial.name}
                      </span>
                    </div>
                    <span className="font-secondary text-xs text-muted-foreground">
                      {testimonial.fragrance}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Testimonial Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-subtle border-border">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-primary text-2xl font-semibold text-primary mb-2">
                  Comparte tu Experiencia
                </h3>
                <p className="font-secondary text-sm text-muted-foreground">
                  Tu opinión nos ayuda a seguir creando experiencias únicas
                </p>
              </div>

              <form onSubmit={handleSubmitTestimonial} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="font-secondary text-sm font-medium text-primary">
                      Nombre *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tu nombre"
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                      className="mt-1 font-secondary"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-secondary text-sm font-medium text-primary">
                      Email (opcional)
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={newTestimonial.email}
                      onChange={(e) => setNewTestimonial({...newTestimonial, email: e.target.value})}
                      className="mt-1 font-secondary"
                    />
                  </div>
                </div>

                <div>
                  <Label className="font-secondary text-sm font-medium text-primary mb-2 block">
                    Calificación
                  </Label>
                  {renderStars(
                    newTestimonial.rating, 
                    true, 
                    (rating) => setNewTestimonial({...newTestimonial, rating})
                  )}
                </div>

                <div>
                  <Label htmlFor="comment" className="font-secondary text-sm font-medium text-primary">
                    Tu experiencia *
                  </Label>
                  <Textarea
                    id="comment"
                    placeholder="Cuéntanos sobre tu experiencia con NUVÓ..."
                    value={newTestimonial.comment}
                    onChange={(e) => setNewTestimonial({...newTestimonial, comment: e.target.value})}
                    className="mt-1 font-secondary min-h-[120px]"
                    required
                  />
                </div>

                <Button type="submit" className="w-full font-secondary">
                  Enviar Testimonio
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Note */}
        <div className="text-center mt-8">
          <p className="font-secondary text-xs text-muted-foreground">
            * Los testimonios son revisados antes de ser publicados para mantener la calidad de la experiencia
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
