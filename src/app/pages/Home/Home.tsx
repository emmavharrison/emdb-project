import { SearchBar } from "@/app/components/search/SearchBar";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Home = () => {

  return (
    <>
      <div>Welcome!</div>
      <QueryClientProvider client={queryClient}>
        <div className="justify-center flex">
        <SearchBar />
        </div>
      </QueryClientProvider>
    </>
  );
};
