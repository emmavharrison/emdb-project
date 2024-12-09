import { useAuthenticator } from "@aws-amplify/ui-react";

export const LandingPage = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  console.log("auth status", authStatus);

  return <div>Landing Page</div>;
};
