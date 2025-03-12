import { Schema } from "amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { AuthUser } from "aws-amplify/auth";

const client = generateClient<Schema>()

type AddToCollectionProps = {
    collectionId: string,
    user: AuthUser,
    movieId: string,
    movieName: string,
    moviePoster: string,
    collectionName: string;
}

export const addToCollection = async ({collectionId, user, movieId, movieName, moviePoster, collectionName}: AddToCollectionProps) => {
    try {
        await client.models.Movie.create({
            userId: user?.userId,
            sk: `COLLECTION#${collectionId}`,
            movieId,
            movieName,
            moviePoster,
            collectionId,
            collectionName: `Collection${collectionId}`
        });
    } catch (error) {
        console.error('Movie model is not defined', error);
    }
}