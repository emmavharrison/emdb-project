import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../../amplify/data/resource"
import { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { CreateCollectionsPopup } from "@/app/components/collections/CreateCollectionsPopup";

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
      <CreateCollectionsPopup />
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