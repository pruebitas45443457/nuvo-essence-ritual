import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "firebase/auth";
import { auth, getUserData, onAuthStateChange } from "@/lib/firebase";

interface AuthContextType {
  currentUser: User | null;
  userData: any | null;
  loading: boolean;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Función para refrescar los datos del usuario desde Firestore
  const refreshUserData = async () => {
    if (currentUser) {
      try {
        const result = await getUserData(currentUser.uid);
        if (result.userData) {
          setUserData(result.userData);
        }
      } catch (error) {
        console.error("Error al refrescar datos del usuario:", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Cargar datos adicionales del usuario desde Firestore
        try {
          const result = await getUserData(user.uid);
          if (result.userData) {
            setUserData(result.userData);
          }
        } catch (error) {
          console.error("Error al cargar datos del usuario:", error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    refreshUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
