import { useAuthenticator } from "@aws-amplify/ui-react";

export const ProfilePage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  
    return <div>Welcome ${user?.username}!</div>;
};


