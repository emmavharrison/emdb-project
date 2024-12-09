import { useAuthenticator } from "@aws-amplify/ui-react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  if (authStatus === "configuring") {
    return <div>Loading...</div>;
  }

  if (authStatus !== "authenticated") {
    return <Navigate to="/" replace />;
  }

  return children;
};