import { fetchSearchMovies } from "@/app/api/searchMovies";
import { ResultsCards } from "@/app/components/search/ResultsCards";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useParams } from "react-router";

export const Results = () => {
  // const { user } = useAuthenticator((context) => [context.user]);
  const { searchedMovie } = useParams();

  if (!searchedMovie) {
    return <div>No results... or maybe there is an error</div>;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["searchMovie", searchedMovie],
    queryFn: async () => {
      const data = await fetchSearchMovies(searchedMovie);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  console.log("data in results", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Results</div>
      <div>You searched for... {searchedMovie}</div>
      <div>There were {data?.totalResults} results</div>
      <ResultsCards data={data} />
    </>
  );
};
