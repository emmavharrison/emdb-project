import { generateClient } from "aws-amplify/api";
import { Collection } from "../types/movie-frontend-types";
import { Schema } from "amplify/data/resource";
import { AuthUser } from "aws-amplify/auth";

const client = generateClient<Schema>();

type FetchAllCollectionsForCollectionsPageProps = {
  user: AuthUser;
  setCollections: (collections: Collection[]) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const fetchAllCollectionsForCollectionsPage = async ({
  user,
  setCollections,
  setIsLoading,
}: FetchAllCollectionsForCollectionsPageProps) => {
  try {
    const { data: rawCollections } = await client.models.Movie.list({
      userId: user?.userId,
      sk: { beginsWith: "COLLECTION#" },
    });

    // deduplicate collections by collectionId
    const uniqueRawCollections = Array.from(
      new Map(
        rawCollections.map((collection) => [
          collection.collectionId,
          collection,
        ])
      ).values()
    );

    // map to Collection type
    const mappedCollections: Collection[] = uniqueRawCollections
      .filter(collection => collection.collectionId && collection.collectionName)
      .map(collection => ({
        collectionId: collection.collectionId!,
        collectionName: collection.collectionName!
      }));

    console.log("Unique collections", mappedCollections);
    setCollections(mappedCollections);
  } catch (error) {
    console.error("Error fetching collections:", error);
  } finally {
    setIsLoading(false);
  }
};
