import React from "react";
import { useUser } from "@/contexts/UserContext";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  // Keep hook usage in case components rely on provider state
  useUser();
  return <>{children}</>;
};

export default AuthGuard;
