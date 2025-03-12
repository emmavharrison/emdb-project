import { Schema } from "amplify/data/resource";
import { Collection } from "../types/movie-frontend-types";
import { AuthUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";

const client = generateClient<Schema>()

type FetchAllCollectionsProps<T> = {
    user: AuthUser,
    setCollections: (collections: T) => void,
    mapFunction?: (collections: Schema["Movie"]["type"][]) => T
}

const defaultMapCollections = (
  collections: Schema["Movie"]["type"][]
): Collection[] => {
  return collections
    .filter(
      (collection) => collection.collectionId && collection.collectionName
    )
    .map((collection) => ({
      collectionId: collection.collectionId!,
      collectionName: collection.collectionName!,
    }));
};

export const fetchAllCollectionsForDropdown = async <T>({
  user, 
  setCollections, 
  mapFunction = defaultMapCollections as unknown as (collections: Schema["Movie"]["type"][]) => T
}: FetchAllCollectionsProps<T>) => {
  try {
    const { data: rawCollections } = await client.models.Movie.list({
      userId: user?.userId,
      sk: { beginsWith: "COLLECTION#" },
    });
    
    // Deduplicate collections by collectionId
    const uniqueCollections = Array.from(
      new Map(
        rawCollections.map(collection => [collection.collectionId, collection])
      ).values()
    );
    
    // Apply the mapping function to the deduplicated collections
    setCollections(mapFunction(uniqueCollections));
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
};
