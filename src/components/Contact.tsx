import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    mailingList: false
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "¡Mensaje enviado!",
      description: "Nos pondremos en contacto contigo pronto.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      mailingList: false
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "hola@nuvo.com",
      description: "Respuesta en 24 horas"
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+54 11 1234-5678",
      description: "Lunes a Viernes 10-18hs"
    },
    {
      icon: MapPin,
      title: "Ubicación",
      content: "Buenos Aires, Argentina",
      description: "Citas con previa reserva"
    }
  ];

  return (
    <section id="contacto" className="py-20 bg-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-primary text-4xl md:text-5xl font-bold text-primary mb-6">
            Contacto
          </h2>
          <p className="font-secondary text-lg md:text-xl font-light text-muted-foreground max-w-3xl mx-auto">
            Estamos aquí para acompañarte en tu búsqueda de la esencia perfecta
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="font-primary text-2xl font-semibold text-primary mb-8">
              Información de Contacto
            </h3>
            
            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-background border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-primary text-lg font-medium text-primary mb-1">
                          {info.title}
                        </h4>
                        <p className="font-secondary text-base text-foreground mb-1">
                          {info.content}
                        </p>
                        <p className="font-secondary text-sm text-muted-foreground">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mailing List */}
            <Card className="bg-elegant text-elegant-foreground">
              <CardHeader>
                <CardTitle className="font-primary text-xl font-semibold flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Newsletter NUVÓ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-secondary text-sm font-light mb-4">
                  Suscríbete para recibir novedades exclusivas, lanzamientos y invitaciones a eventos especiales.
                </p>
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    className="font-secondary bg-elegant-foreground/10 border-elegant-foreground/20 text-elegant-foreground placeholder:text-elegant-foreground/60"
                  />
                  <Button variant="secondary" size="sm" className="font-secondary">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="font-secondary text-xs text-elegant-foreground/70 mt-2">
                  Prometemos no saturar tu bandeja de entrada. Solo lo esencial.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-background border-border">
              <CardHeader>
                <CardTitle className="font-primary text-2xl font-semibold text-primary">
                  Envíanos un Mensaje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="font-secondary text-sm font-medium text-primary">
                        Nombre *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="mt-1 font-secondary"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="font-secondary text-sm font-medium text-primary">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="mt-1 font-secondary"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="font-secondary text-sm font-medium text-primary">
                      Teléfono (opcional)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+54 11 1234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="mt-1 font-secondary"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="font-secondary text-sm font-medium text-primary">
                      Asunto
                    </Label>
                    <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                      <SelectTrigger className="mt-1 font-secondary">
                        <SelectValue placeholder="Selecciona un asunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cata">Consulta sobre Cata</SelectItem>
                        <SelectItem value="productos">Información de Productos</SelectItem>
                        <SelectItem value="agenda">Reserva de Turno</SelectItem>
                        <SelectItem value="general">Consulta General</SelectItem>
                        <SelectItem value="colaboracion">Colaboración</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="font-secondary text-sm font-medium text-primary">
                      Mensaje *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Cuéntanos cómo podemos ayudarte..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="mt-1 font-secondary min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="mailing"
                      checked={formData.mailingList}
                      onChange={(e) => setFormData({...formData, mailingList: e.target.checked})}
                      className="rounded border-border"
                    />
                    <Label htmlFor="mailing" className="font-secondary text-sm text-muted-foreground">
                      Quiero recibir novedades y ofertas especiales por email
                    </Label>
                  </div>

                  <Button type="submit" className="w-full font-secondary">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;