import { Schema } from "amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { AuthUser } from "aws-amplify/auth";

const client = generateClient<Schema>();

export const createCollection = async (collectionName: string, user: AuthUser) => {

  try {
    await client.models.Movie.create({
      userId: user?.userId,
      sk: `COLLECTION#${collectionName}`,
      collectionId: `ID-${collectionName}`,
      collectionName,
    });
  } catch (error) {
    console.error("Could not create collection", error);
  }
};
