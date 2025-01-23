import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../../amplify/data/resource"
import { useEffect, useState } from "react";
import { Movie } from "@/app/types/movie-backend-types";

// <ul>{movies.map(movie => <li key={movie.id}>{movie.id}</li>)}</ul>

// const fetchTodos = async () => {
//   const { data: items, errors } = await client.models.Todo.list();
//   setTodos(items);
// };


export const CollectionsPage = () => {
  // const [movies, setMovies] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Schema["MovieDB"]["type"][]>([]);

  useEffect(() => {
    const client = generateClient<Schema>()
    
    const fetchMovies = async () => {
      try {
        const data = await client.models.MovieDB.list();
        console.log('data', data);
        // Transform the data to ensure all fields are non-null
        const transformedMovies: Movie[] = data.data.map(movie => ({
          id: movie.id,
          createdAt: movie.createdAt,
          updatedAt: movie.updatedAt,
          userId: movie.userId || '',
          collectionId: movie.collectionId || '',
          movieId: movie.movieId || '',
          reviewId: movie.reviewId || '',
          reviewText: movie.reviewText || '',
          collectionName: movie.collectionName || '',
        }));
        setMovies(transformedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Collections page</h1>
      {movies.length > 0 ? (
        <ul>
          {movies.map(movie => <li key={movie.id}>{movie.movieId}</li>)}
        </ul>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};



/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>