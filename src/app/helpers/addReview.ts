import { Schema } from "amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { AuthUser } from "aws-amplify/auth";

  
const client = generateClient<Schema>()

type AddReviewProps = {
    user: AuthUser,
    movieId: string,
    movieName: string,
    moviePoster: string,
    review: string,
}

 export const addReview = async ({user, movieId, movieName, moviePoster, review}: AddReviewProps) => {
    try {
      await client.models.Movie.create({
        userId: user?.userId,
        sk: `REVIEW#${movieId}`,
        movieId,
        movieName,
        moviePoster,
        reviewText: review
      });
    } catch (error) {
      console.error('Movie model is not defined', error);
    }
  }