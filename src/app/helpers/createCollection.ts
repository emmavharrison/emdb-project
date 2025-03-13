import { Schema } from "amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { AuthUser } from "aws-amplify/auth";

import { v4 as uuidv4 } from 'uuid';

const client = generateClient<Schema>();

export const createCollection = async (collectionName: string, user: AuthUser) => {

  const collectionId = uuidv4();

  try {
    await client.models.Movie.create({
      userId: user?.userId,
      sk: `COLLECTION#${collectionId}`,
      collectionId: `ID-${collectionId}`,
      collectionName,
    });

    return collectionId
  } catch (error) {
    console.error("Could not create collection", error);
  }
};
