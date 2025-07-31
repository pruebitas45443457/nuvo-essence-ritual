import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, Package, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/AuthContext";
import UserAppointments from "./UserAppointments";
import RequireAuth from "./RequireAuth";

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
  const [loading, setLoading] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const { toast } = useToast();
  const { currentUser, userData } = useAuth();

  // Pre-llenar el formulario con los datos del usuario si está autenticado
  useEffect(() => {
    if (currentUser && userData) {
      setAppointmentData(prev => ({
        ...prev,
        name: userData.name || "",
        email: currentUser.email || "",
        phone: userData.phone || ""
      }));
    }
  }, [currentUser, userData]);

  // Simplificando, solo ofrecemos dos tipos de sesiones directamente
  const services = [
    { value: "sesion-30min", label: "Sesión de 30 minutos", duracion: "30min" },
    { value: "sesion-60min", label: "Sesión de 60 minutos", duracion: "60min" }
  ];

  const timeSlots = [
    "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];
  
  // Función para comprobar disponibilidad cuando se selecciona una fecha
  const checkAvailabilityForDate = async (date: string) => {
    if (!date) return;
    
    setCheckingAvailability(true);
    try {
      const { db } = await import('@/lib/firebase');
      const { collection, query, where, getDocs } = await import('firebase/firestore');
      
      const q = query(
        collection(db, 'appointments'),
        where('date', '==', date),
        where('status', 'in', ['pending', 'confirmed'])
      );
      
      const querySnapshot = await getDocs(q);
      const bookedSlots = new Set();
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        bookedSlots.add(data.time);
      });
      
      // Filtrar los horarios disponibles
      const available = timeSlots.filter(time => !bookedSlots.has(time));
      setAvailableTimeSlots(available);
      
      // Resetear el horario si el seleccionado ya no está disponible
      if (appointmentData.time && bookedSlots.has(appointmentData.time)) {
        setAppointmentData(prev => ({ ...prev, time: "" }));
        toast({
          title: "Horario no disponible",
          description: "El horario que tenías seleccionado ya no está disponible.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error("Error al verificar disponibilidad:", error);
      toast({
        title: "Error",
        description: "No pudimos verificar la disponibilidad. Por favor intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setCheckingAvailability(false);
    }
  };
  
  // Verificar disponibilidad cuando cambia la fecha
  useEffect(() => {
    if (appointmentData.date) {
      checkAvailabilityForDate(appointmentData.date);
    }
  }, [appointmentData.date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (!appointmentData.name || !appointmentData.email || !appointmentData.date || !appointmentData.time || !appointmentData.service) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }
    
    const selectedService = services.find(s => s.value === appointmentData.service);
    if (selectedService) {
      // Obtener información de la duración seleccionada
      const duracionTexto = selectedService.duracion === "30min" ? "30 minutos" : "60 minutos";
      console.log(`Procesando reserva para servicio: ${selectedService.label} - ${duracionTexto}`);
    }

    try {
      // Importar servicios de Firestore
      const { saveAppointment, checkAppointmentAvailability } = await import("@/lib/firestore");
      
      // Verificar disponibilidad primero
      setCheckingAvailability(true);
      const { available } = await checkAppointmentAvailability(
        appointmentData.date,
        appointmentData.time
      );
      
      if (!available) {
        toast({
          title: "Horario no disponible",
          description: "La fecha y hora seleccionadas ya no están disponibles. Por favor elige otro horario.",
          variant: "destructive"
        });
        setLoading(false);
        setCheckingAvailability(false);
        return;
      }
      
      setCheckingAvailability(false);
      
      // Crear objeto con datos de la cita
      const appointmentToSave = {
        ...appointmentData,
        userId: currentUser?.uid || null,
        status: "pending" as const // pending, confirmed, cancelled
      };
      
      // Obtener la información del servicio seleccionado
      const selectedService = services.find(s => s.value === appointmentData.service);
        
      // Guardar en Firestore
      await saveAppointment({
        ...appointmentToSave,
        duracion: selectedService?.duracion || "",
      });
      
      toast({
        title: "¡Turno reservado!",
        description: `Tu cita ha sido reservada con éxito. Te enviaremos un email de confirmación con todos los detalles.`,
        variant: "default"
      });

      // Reset form fields except user data
      setAppointmentData({
        name: currentUser && userData ? userData.name || "" : "",
        email: currentUser ? currentUser.email || "" : "",
        phone: currentUser && userData ? userData.phone || "" : "",
        date: "",
        time: "",
        service: "",
        participants: "1",
        notes: ""
      });
    } catch (error: any) {
      console.error("Error al guardar la cita:", error);
      toast({
        title: "Error",
        description: error.message || "No pudimos procesar tu reserva. Por favor intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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
                  Sesiones Disponibles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex justify-between items-center bg-background/50 p-4 rounded-md mb-3">
                      <div>
                        <h4 className="font-secondary text-sm font-medium text-primary">
                          {service.label}
                        </h4>
                        <p className="font-secondary text-xs text-muted-foreground mt-1">
                          Experiencia personalizada
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-primary mr-1" />
                        <span className="font-secondary text-sm font-medium text-primary">
                          {service.duracion === "30min" ? "30 min" : "60 min"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-primary/10 rounded-md">
                  <p className="font-secondary text-sm text-center text-muted-foreground">
                    Todas nuestras sesiones son gratuitas, sin costo alguno
                  </p>
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
                  <li>• Tolerancia máxima de 15 minutos</li>
                  <li>• Reserva gratuita sin costo</li>
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
                      <Label htmlFor="appointment-name" className="font-secondary text-sm font-medium text-primary">
                        Nombre Completo *
                      </Label>
                      <Input
                        id="appointment-name"
                        type="text"
                        placeholder="Tu nombre completo"
                        value={appointmentData.name}
                        onChange={(e) => setAppointmentData({...appointmentData, name: e.target.value})}
                        className="mt-1 font-secondary"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="appointment-email" className="font-secondary text-sm font-medium text-primary">
                        Email *
                      </Label>
                      <Input
                        id="appointment-email"
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
                    <Label htmlFor="appointment-phone" className="font-secondary text-sm font-medium text-primary">
                      Teléfono (opcional)
                    </Label>
                    <Input
                      id="appointment-phone"
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
                      Tipo de Sesión *
                    </Label>
                    <Select 
                      value={appointmentData.service} 
                      onValueChange={(value) => setAppointmentData({...appointmentData, service: value})}
                    >
                      <SelectTrigger className="mt-1 font-secondary">
                        <SelectValue placeholder="Selecciona una sesión" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            <div className="flex justify-between items-center w-full">
                              <span>{service.label}</span>
                              <Clock className="ml-2 w-4 h-4 text-muted-foreground" />
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedService && (
                      <div className="font-secondary text-sm mt-1 space-y-1">
                        <p className="text-muted-foreground">
                          Duración: <span className="font-medium text-primary">
                            {selectedService.duracion === "30min" ? "30 minutos" : "60 minutos"}
                          </span>
                        </p>
                        <p className="text-muted-foreground">
                          Servicio gratuito, sin costo asociado
                        </p>
                      </div>
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
                        disabled={!appointmentData.date || checkingAvailability || availableTimeSlots.length === 0}
                      >
                        <SelectTrigger className="mt-1 font-secondary">
                          <SelectValue placeholder={
                            checkingAvailability 
                              ? "Verificando disponibilidad..." 
                              : !appointmentData.date 
                                ? "Selecciona una fecha primero" 
                                : availableTimeSlots.length === 0 
                                  ? "No hay horarios disponibles" 
                                  : "Selecciona un horario"
                          } />
                        </SelectTrigger>
                        <SelectContent>
                          {checkingAvailability ? (
                            <div className="p-2 text-center text-sm text-muted-foreground">
                              Verificando disponibilidad...
                            </div>
                          ) : availableTimeSlots.length === 0 && appointmentData.date ? (
                            <div className="p-2 text-center text-sm text-muted-foreground">
                              No hay horarios disponibles en esta fecha
                            </div>
                          ) : (
                            availableTimeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      {appointmentData.date && availableTimeSlots.length === 0 && !checkingAvailability && (
                        <p className="text-xs text-destructive mt-1">
                          Lo sentimos, todos los horarios están ocupados para esta fecha.
                        </p>
                      )}
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

                  {/* Política de tolerancia */}
                  {appointmentData.time && (
                    <div className="bg-primary/10 p-3 rounded-md mb-4">
                      <p className="font-secondary text-sm text-primary flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          <strong>Importante:</strong> Existe una tolerancia máxima de 15 minutos. Pasado ese tiempo se 
                          considerará como ausencia y perderás tu reserva.
                        </span>
                      </p>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full font-secondary text-lg py-6" 
                    disabled={loading || checkingAvailability || (appointmentData.date && availableTimeSlots.length === 0)}
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin mr-2">
                          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </span>
                        Procesando Reserva...
                      </>
                    ) : checkingAvailability ? (
                      <>
                        <span className="animate-spin mr-2">
                          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </span>
                        Verificando disponibilidad...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5 mr-2" />
                        Confirmar Reserva
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* User Appointments (only for logged in users) */}
        <RequireAuth>
          <UserAppointments />
        </RequireAuth>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="bg-subtle border-border max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary mr-2" />
                <h3 className="font-primary text-lg font-semibold text-primary">Información Importante</h3>
              </div>
              <p className="font-secondary text-sm text-muted-foreground leading-relaxed">
                Te recomendamos llegar 10 minutos antes de tu cita. La tolerancia máxima de espera es de 15 minutos. 
                Pasado ese tiempo, se considerará como una ausencia y perderás tu reserva. Nuestro espacio está 
                diseñado para ofrecerte una experiencia olfativa pura, por lo que te pedimos evitar usar perfumes el día de tu visita.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Appointment;