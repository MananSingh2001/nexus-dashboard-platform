import React from "react";
import { useAuth } from "@/hooks/useAuth";

export const SecurityGate = ({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) => {
  const { user } = useAuth();

  if (requiredRole && !user.roles.includes(requiredRole)) {
    return <div className="text-red-500">Access Denied</div>;
  }

  return <>{children}</>;
};
