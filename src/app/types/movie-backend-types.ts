// typing for the responses from the movies API is in the src/app/api folder
// below are types for the database for storing reviews and collections

export interface Movie {
    id: string;
    sk: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    collectionId: string;
    movieId: string;
    reviewText: string;
    collectionName: string;
}

export interface Collection {
    id: string;
    sk: string;
    collectionId: string;
    movieId: string;
    collectionName: string;
    userId: string;
}