import { fetchSearchMovies } from "@/app/api/searchMovies";
import { ResultsCards } from "@/app/components/movie-cards/search-results/ResultsCards";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import type { Schema } from '../../../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'

const client = generateClient<Schema>()

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

  const createMovie = async () => {
    await client.models.MovieDB.create({
      movieId: "123",
      collectionId: "collection-test",
      userId: "user-test",
      reviewText: "review test",
    })
  }

  console.log("data in results", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Results</div>
      <div>You searched for... {searchedMovie}</div>
      <div>There were {data?.totalResults} results</div>
      <button onClick={createMovie}>Add new movie</button>
      <ResultsCards data={data} />
    </>
  );
};
