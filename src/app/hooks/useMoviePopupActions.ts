import { useState, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Collection } from "@/app/types/movie-frontend-types";
import { addToCollection } from "@/app/helpers/addToCollection";
import { addReview } from "@/app/helpers/addReview";
import { fetchAllCollectionsForDropdown } from "@/app/helpers/fetchAllCollectionsForDropdown";

interface SelectedCollection {
  collectionId: string;
  collectionName: string;
}

export const useMovieActions = (movieId: string, movieName: string, moviePoster: string) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [review, setReview] = useState("");
  const [selectedCollections, setSelectedCollections] = useState<SelectedCollection[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    fetchAllCollectionsForDropdown({ user, setCollections });
  }, [user]);

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };
  
  const handleCollectionChange = (collections: SelectedCollection[]) => {
    setSelectedCollections(collections);
  };

  const handleSubmit = async () => {
    try {
      const collectionPromises = selectedCollections.map(collection => 
        addToCollection({
          collectionId: collection.collectionId, 
          user, 
          movieId, 
          movieName, 
          moviePoster,
          collectionName: collection.collectionName
        })
      );
      
      const reviewPromise = review.trim() ? 
        addReview({
          user,
          movieId,
          movieName,
          moviePoster,
          review
        }) : 
        Promise.resolve();

      await Promise.all([...collectionPromises, reviewPromise]);
      // Could add success state or reset form here
    } catch (error) {
      console.error('Error saving movie data:', error);
      // Could add error state here
    }
  };

  return {
    review,
    collections,
    selectedCollections,
    handleReviewChange,
    handleCollectionChange,
    handleSubmit
  };
};
