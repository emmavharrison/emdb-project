// import { useAuthenticator } from "@aws-amplify/ui-react";
import { SearchBar } from "@/app/components/search/SearchBar";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Home = () => {
  // const { user } = useAuthenticator((context) => [context.user]);

  return (
    <>
      <div>Welcome!</div>
      <QueryClientProvider client={queryClient}>
        <SearchBar />
      </QueryClientProvider>
    </>
  );
};
