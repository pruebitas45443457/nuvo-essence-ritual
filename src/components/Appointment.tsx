import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, Package, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Appointment = () => {
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    participants: "1",
    notes: ""
  });
  const { toast } = useToast();

  const services = [
    { value: "cata-intima", label: "Cata Íntima (45 min)", price: "$8,000" },
    { value: "cata-pareja", label: "Cata de Pareja (60 min)", price: "$12,000" },
    { value: "cata-grupal", label: "Cata Grupal (90 min)", price: "$18,000" },
    { value: "consulta-productos", label: "Consulta de Productos (30 min)", price: "$4,000" },
    { value: "compra-perfumes", label: "Compra Personalizada (60 min)", price: "$6,000" }
  ];

  const timeSlots = [
    "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!appointmentData.name || !appointmentData.email || !appointmentData.date || !appointmentData.time || !appointmentData.service) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "¡Turno reservado!",
      description: "Te enviaremos un email de confirmación con todos los detalles.",
    });

    // Reset form
    setAppointmentData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      service: "",
      participants: "1",
      notes: ""
    });
  };

  const selectedService = services.find(s => s.value === appointmentData.service);

  return (
    <section id="agenda" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-primary text-4xl md:text-5xl font-bold text-primary mb-6">
            Agenda tu Cita
          </h2>
          <p className="font-secondary text-lg md:text-xl font-light text-muted-foreground max-w-3xl mx-auto">
            Reserva tu experiencia personalizada con NUVÓ. Cada encuentro es único y diseñado especialmente para ti.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services Info */}
          <div className="lg:col-span-1">
            <Card className="bg-subtle border-border mb-6">
              <CardHeader>
                <CardTitle className="font-primary text-xl font-semibold text-primary flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Nuestros Servicios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div key={index} className="border-b border-border pb-3 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-secondary text-sm font-medium text-primary">
                            {service.label.split(' (')[0]}
                          </h4>
                          <p className="font-secondary text-xs text-muted-foreground">
                            {service.label.includes('(') ? service.label.split('(')[1] : ''}
                          </p>
                        </div>
                        <span className="font-secondary text-sm font-semibold text-primary">
                          {service.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-elegant text-elegant-foreground">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <h4 className="font-primary text-lg font-semibold">Política de Reservas</h4>
                </div>
                <ul className="font-secondary text-sm space-y-2">
                  <li>• Confirmaremos tu cita por email</li>
                  <li>• Cancelaciones hasta 24hs antes</li>
                  <li>• Ambiente libre de fragancias externas</li>
                  <li>• Experiencia completamente personalizada</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="bg-background border-border">
              <CardHeader>
                <CardTitle className="font-primary text-2xl font-semibold text-primary flex items-center">
                  <Calendar className="w-6 h-6 mr-2" />
                  Reservar Cita
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="font-secondary text-sm font-medium text-primary">
                        Nombre Completo *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Tu nombre completo"
                        value={appointmentData.name}
                        onChange={(e) => setAppointmentData({...appointmentData, name: e.target.value})}
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
                        value={appointmentData.email}
                        onChange={(e) => setAppointmentData({...appointmentData, email: e.target.value})}
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
                      value={appointmentData.phone}
                      onChange={(e) => setAppointmentData({...appointmentData, phone: e.target.value})}
                      className="mt-1 font-secondary"
                    />
                  </div>

                  {/* Service Selection */}
                  <div>
                    <Label className="font-secondary text-sm font-medium text-primary">
                      Tipo de Servicio *
                    </Label>
                    <Select 
                      value={appointmentData.service} 
                      onValueChange={(value) => setAppointmentData({...appointmentData, service: value})}
                    >
                      <SelectTrigger className="mt-1 font-secondary">
                        <SelectValue placeholder="Selecciona un servicio" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            <div className="flex justify-between items-center w-full">
                              <span>{service.label}</span>
                              <span className="ml-2 font-semibold">{service.price}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedService && (
                      <p className="font-secondary text-sm text-muted-foreground mt-1">
                        Precio: {selectedService.price}
                      </p>
                    )}
                  </div>

                  {/* Date and Time */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="date" className="font-secondary text-sm font-medium text-primary">
                        Fecha *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={appointmentData.date}
                        onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                        className="mt-1 font-secondary"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div>
                      <Label className="font-secondary text-sm font-medium text-primary">
                        Horario *
                      </Label>
                      <Select 
                        value={appointmentData.time} 
                        onValueChange={(value) => setAppointmentData({...appointmentData, time: value})}
                      >
                        <SelectTrigger className="mt-1 font-secondary">
                          <SelectValue placeholder="Hora" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="font-secondary text-sm font-medium text-primary">
                        Participantes
                      </Label>
                      <Select 
                        value={appointmentData.participants} 
                        onValueChange={(value) => setAppointmentData({...appointmentData, participants: value})}
                      >
                        <SelectTrigger className="mt-1 font-secondary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'persona' : 'personas'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <Label htmlFor="notes" className="font-secondary text-sm font-medium text-primary">
                      Notas Especiales (opcional)
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Alguna preferencia especial, alergias, o información adicional..."
                      value={appointmentData.notes}
                      onChange={(e) => setAppointmentData({...appointmentData, notes: e.target.value})}
                      className="mt-1 font-secondary"
                    />
                  </div>

                  <Button type="submit" className="w-full font-secondary text-lg py-6">
                    <Calendar className="w-5 h-5 mr-2" />
                    Confirmar Reserva
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="bg-subtle border-border max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary mr-2" />
                <h3 className="font-primary text-lg font-semibold text-primary">Información Importante</h3>
              </div>
              <p className="font-secondary text-sm text-muted-foreground leading-relaxed">
                Te recomendamos llegar 10 minutos antes de tu cita. Nuestro espacio está diseñado para ofrecerte 
                una experiencia olfativa pura, por lo que te pedimos evitar usar perfumes el día de tu visita.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Appointment;