import { Schema } from "amplify/data/resource";
import { Collection } from "../types/movie-frontend-types";
import { AuthUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";

const client = generateClient<Schema>()

type FetchAllCollectionsProps = {
    user: AuthUser,
    setCollections: (collections: Collection[]) => void
}

const mapCollections = (
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

export const fetchAllCollections = async ({user, setCollections}: FetchAllCollectionsProps) => {
  try {
    const { data: collections } = await client.models.Movie.list({
      userId: user?.userId,
      sk: { beginsWith: "COLLECTION#" },
    });
    setCollections(mapCollections(collections));
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};
