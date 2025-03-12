import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button } from "../ui/button";
import { signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router";

export const LoginButton = () => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    navigate("/signin");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  const guestSession = authStatus !== "authenticated";

  return !guestSession ? (
    <Button onClick={handleSignOut}>Sign Out</Button>
  ) : (
    <Button onClick={handleSignIn}>Sign In</Button>
  );
};
