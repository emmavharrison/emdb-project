import { useAuthenticator } from "@aws-amplify/ui-react";

const LoggedIn = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  return <div>Welcome, {user?.username}!</div>;
};

const LoggedOut = () => <div>Logged Out Landing Page</div>;

export const LandingPage = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  console.log('auth status', authStatus)

  return (
    <>
      {authStatus === "configuring" && "Loading..."}
      {authStatus !== "authenticated" ? <LoggedOut /> : <LoggedIn />}
    </>
  );
};