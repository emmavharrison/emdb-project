import { fetchSearchMovies } from "@/app/api/searchMovies";
import { ResultsCard } from "@/app/components/search/ResultsCard";
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
        return <div>Loading...</div>
    }

  return (
    <>
      <div>Welcome!</div>
      
          {/* <ResultsCard /> */}
               {data.Search.map((item) => (
        <div key={item.imdbID} className="movie-item">
          <h3>{item.Title}</h3>
          <img src={item.Poster} alt={`${item.Title} poster`} />
          <p>Year: {item.Year}</p>
        </div>
      ))}
        <div>results</div>
          <div>you searched for {searchedMovie}</div>
          <div>there were {data?.totalResults} results</div>
    </>
  );
};
