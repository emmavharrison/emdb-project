// typing for the responses from the movies API is in the src/app/api folder
// below are types for the database for storing reviews and collections

export interface Result {
    id?: string;
    sk: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    collectionId: string | undefined;
    movieId: string | undefined;
    movieName: string | undefined;
    reviewText: string | undefined;
    collectionName: string | undefined;
}

export interface Collection {
    id: string;
    sk: string;
    collectionId: string;
    movieId: string;
    collectionName: string;
    userId: string;
}

export interface Review {
    reviewText: string;
    movieName: string;
    movieId: string;
}