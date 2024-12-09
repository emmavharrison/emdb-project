import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const SignIn = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const navigate = useNavigate();

  useEffect(() => {
    if (authStatus === "authenticated") {
      navigate("/home");
    }
  }, [authStatus, navigate]);

  return (
    <Authenticator initialState="signIn" variation="modal"></Authenticator>
  );
};
