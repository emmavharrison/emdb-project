import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button } from "../ui/button";
import { signOut } from "aws-amplify/auth";

export const LoginButton = () => {
  const { signOut: signIn } = useAuthenticator();

  const handleSignOut = async () => {
    await signOut();
  };

  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  const loggedIn = authStatus === "authenticated";

  //   return <Button onClick={signIn}>{loggedIn ? "Sign out" : "Sign In"}</Button>;

  return loggedIn ? (
    <Button onClick={handleSignOut}>Sign Out</Button>
  ) : (
    <Button onClick={signIn}>Sign In</Button>
  );
};
