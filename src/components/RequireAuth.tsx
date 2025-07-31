import { ReactNode } from "react";
import { useAuth } from "@/lib/AuthContext";

interface RequireAuthProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Componente que renderiza su contenido solo cuando el usuario está autenticado.
 * Si el usuario no está autenticado, muestra el contenido de fallback (si se proporciona).
 */
const RequireAuth = ({ children, fallback }: RequireAuthProps) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
};

export default RequireAuth;
