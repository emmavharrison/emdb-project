import { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { CreateCollectionsPopup } from "@/app/components/collections/CreateCollectionsPopup";
import { fetchAllCollectionsForCollectionsPage } from "@/app/helpers/fetchAllCollectionsForCollectionsPage";
import { Collection } from "@/app/types/movie-frontend-types";

export const CollectionsPage = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    fetchAllCollectionsForCollectionsPage({user, setCollections, setIsLoading});
  }, [user]);

  if (isLoading) {
    return <p>Loading Collections...</p>
  }

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
              Collection: {collection.collectionName || collection.collectionId}
            </div>
          ))}
        </div>
      ) : (
        <p>No collections found.</p>
      )}
    </div>
  );
};
