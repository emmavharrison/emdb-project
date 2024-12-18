import { useQuery } from "@tanstack/react-query";
import { fetchSearchMovies } from "../api/searchMovies";

export const useSearchMovies = (searchedMovie: string) => {
  console.log("searched movie in hook", searchedMovie);
  return useQuery({
    queryKey: ["searchMovie", searchedMovie],
    queryFn: async () => {
      const data = await fetchSearchMovies(searchedMovie);
      return data;
    },
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });
};
