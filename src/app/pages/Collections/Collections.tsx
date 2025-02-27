import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../../amplify/data/resource"
import { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";

export const CollectionsPage = () => {
  const [collections, setCollections] = useState<Schema["Movie"]["type"][]>([]);
  const [isLoading, setIsLoading] = useState(true)

  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    const client = generateClient<Schema>()
    
    const fetchCollections = async () => {
      try {
        const { data: collections } = await client.models.Movie.list({
          userId: user?.userId,
          sk: { beginsWith: 'COLLECTION#' }
        });
        console.log('collections', collections);
        setCollections(collections);
      } catch (error) {
        console.error('Error fetching collections:', error);
      } finally {
        setIsLoading(false)
      }
    };

    fetchCollections();
  }, []);

  if (isLoading) {
    return <p>Loading Collections...</p>
  }

  console.log('collections length', collections.length)
  console.log('collections before return', collections)

  // TODO: create collections card, use the Collection type from movie-backend-types when you pass in the data.

  return (
    <div>
      <h1>Collections page</h1>
      {collections.length > 0 ? (
        <div>
          {collections.map(collection => (
            <div 
              key={collection.collectionId} 
            >
              Collection: {collection.collectionId}
            </div>
          ))}
        </div>
      ) : (
        <p>No collections found.</p>
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