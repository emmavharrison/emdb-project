import { useSearchMovies } from "@/app/api/searchMovies"
import { useQuery } from "@tanstack/react-query"

export const Results = () => {
    const {data, error, isLoading} = useSearchMovies(searchedMovie)

  if (status === 'pending') {
    return <span>Loading...</span>
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  // also status === 'success', but "else" logic works, too
  return (
    <ul>
      {data.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  )
}