// typing for the responses from the movies API is in the src/app/api folder
// below are types for the database for storing reviews and collections

export interface Movie {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    collectionId: string;
    movieId: string;
    reviewId: string;
    reviewText: string;
    collectionName: string;
}