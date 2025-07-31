import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { updateUserProfile } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Phone, Mail, Save, Loader2 } from "lucide-react";

const UserProfile = () => {
  const { currentUser, userData, refreshUserData } = useAuth();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (currentUser && userData) {
      setProfileData({
        name: userData.name || "",
        email: currentUser.email || "",
        phone: userData.phone || ""
      });
    }
  }, [currentUser, userData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;
    
    setLoading(true);
    try {
      await updateUserProfile(currentUser, {
        name: profileData.name,
        phone: profileData.phone,
        email: profileData.email
      });
      
      // Refresh user data in context
      await refreshUserData();
      
      toast({
        title: "Perfil actualizado",
        description: "Tu información ha sido actualizada correctamente.",
      });
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      toast({
        title: "Error",
        description: "No pudimos actualizar tu perfil. Por favor intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser || !userData) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="font-primary text-2xl">Mi Perfil</CardTitle>
        <CardDescription>Actualiza tu información personal</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="font-secondary">
              Nombre completo
            </Label>
            <div className="relative">
              <Input
                id="name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="pl-10"
                required
              />
              <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email" className="font-secondary">
              Correo electrónico
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="pl-10"
                disabled
              />
              <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              El correo electrónico no se puede cambiar.
            </p>
          </div>
          
          <div>
            <Label htmlFor="phone" className="font-secondary">
              Teléfono
            </Label>
            <div className="relative">
              <Input
                id="phone"
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="pl-10"
              />
              <Phone className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Guardar Cambios
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
