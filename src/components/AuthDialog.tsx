import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { loginUser, registerUser } from "@/lib/firebase";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { User, Mail, Phone, Lock, Info, X } from "lucide-react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login" | "register";
}

const AuthDialog = ({ open, onOpenChange, defaultTab = "login" }: AuthDialogProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { currentUser } = useAuth();

  // Estado para login
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // Estado para registro
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  // Manejo de cambios en los formularios
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  // Manejo de envío de formularios
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user, error } = await loginUser(loginData.email, loginData.password);
      
      if (error) {
        throw new Error(error);
      }
      
      if (user) {
        toast({
          title: "Inicio de sesión exitoso",
          description: "Has iniciado sesión correctamente",
        });
        onOpenChange(false);
      }
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validaciones
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Error en el registro",
        description: "Las contraseñas no coinciden",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      toast({
        title: "Error en el registro",
        description: "La contraseña debe tener al menos 6 caracteres",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    try {
      const userData = {
        name: registerData.name,
        phone: registerData.phone,
      };

      const { user, error } = await registerUser(registerData.email, registerData.password, userData);
      
      if (error) {
        throw new Error(error);
      }
      
      if (user) {
        toast({
          title: "Registro exitoso",
          description: "Tu cuenta ha sido creada correctamente",
        });
        onOpenChange(false);
      }
    } catch (error: any) {
      toast({
        title: "Error en el registro",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Si el usuario ya está autenticado, cerrar el diálogo
  if (currentUser && open) {
    onOpenChange(false);
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg bg-background/95 backdrop-blur-md border-primary/10 shadow-xl">
        <div className="absolute right-4 top-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </Button>
        </div>
        
        <DialogHeader>
          <DialogTitle className="text-center font-primary text-3xl text-primary">
            {activeTab === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
          </DialogTitle>
          <DialogDescription className="text-center font-secondary text-muted-foreground">
            {activeTab === "login" 
              ? "Accede a tu cuenta para disfrutar de una experiencia personalizada"
              : "Únete a NUVÓ para descubrir tu esencia única"
            }
          </DialogDescription>
        </DialogHeader>

        <Tabs 
          defaultValue={defaultTab} 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as "login" | "register")}
          className="mt-4"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login" className="font-secondary">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register" className="font-secondary">Crear Cuenta</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-6">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="font-secondary">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      className="pl-10 font-secondary bg-background/60"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="font-secondary">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className="pl-10 font-secondary bg-background/60"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full font-secondary"
                  disabled={loading}
                >
                  {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab("register")}
                    className="text-sm text-primary hover:underline font-secondary"
                  >
                    ¿No tienes cuenta? Regístrate
                  </button>
                </div>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="mt-6">
            <form onSubmit={handleRegister}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name" className="font-secondary">
                    Nombre Completo
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-name"
                      name="name"
                      type="text"
                      placeholder="Tu nombre completo"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      className="pl-10 font-secondary bg-background/60"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="font-secondary">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      className="pl-10 font-secondary bg-background/60"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-phone" className="font-secondary">
                    Teléfono
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-phone"
                      name="phone"
                      type="tel"
                      placeholder="Tu número de teléfono"
                      value={registerData.phone}
                      onChange={handleRegisterChange}
                      className="pl-10 font-secondary bg-background/60"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="font-secondary">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      className="pl-10 font-secondary bg-background/60"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password" className="font-secondary">
                    Confirmar Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirma tu contraseña"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      className="pl-10 font-secondary bg-background/60"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-2 text-sm">
                  <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground font-secondary">
                    Al registrarte, aceptas nuestros términos y condiciones y nuestra política de privacidad.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full font-secondary"
                  disabled={loading}
                >
                  {loading ? "Creando cuenta..." : "Crear Cuenta"}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
                    className="text-sm text-primary hover:underline font-secondary"
                  >
                    ¿Ya tienes cuenta? Inicia sesión
                  </button>
                </div>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
