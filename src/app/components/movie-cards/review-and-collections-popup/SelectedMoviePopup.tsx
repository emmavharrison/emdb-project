import { Button } from "@/app/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { CollectionsDropdown } from "./CollectionsDropdown"
import { useState } from "react"
import type { Schema } from '../../../../../amplify/data/resource'
import { generateClient } from 'aws-amplify/api'
import { useAuthenticator } from "@aws-amplify/ui-react";

type SelectedMoviePopupProps = {
    movieName: string
    movieId: string
}

interface SelectedCollection {
  id: string;
  name: string;
}

const client = generateClient<Schema>()

const collections = [{id: "1", name: "Collection 1"}, {id: "2", name: "Collection 2"}]

export const SelectedMoviePopup = ({movieName, movieId}: SelectedMoviePopupProps) => {
  const { user } = useAuthenticator((context) => [context.user]);

  const [review, setReview] = useState("")
  const [selectedCollections, setSelectedCollections] = useState<SelectedCollection[]>([])

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };
  
  const handleCollectionChange = (collections: SelectedCollection[]) => {
    setSelectedCollections(collections);
  };

  const addToCollection = async (collectionId: string) => {
    try {
      await client.models.Movie.create({
        userId: user?.userId,
        sk: `COLLECTION#${collectionId}`,
        movieId,
        collectionId,
        collectionName: `Collection${collectionId}`
      });
    } catch (error) {
      console.error('Movie model is not defined', error);
    }
  }

  const addReview = async () => {
    try {
      await client.models.Movie.create({
        userId: user?.userId,
        sk: `REVIEW#${movieId}`,
        movieId,
        reviewText: review
      });
    } catch (error) {
      console.error('Movie model is not defined', error);
    }
  }

  const handleSubmit = async () => {
    console.log('Review:', review);
    console.log('Selected Collections:', selectedCollections);

    try {
      const collectionPromises = selectedCollections.map(collection => addToCollection(collection.id))
    
      const reviewPromise = addReview()

      await Promise.all([...collectionPromises, reviewPromise])
      console.log('collections and reviews sent')

    } catch (error) {
      console.error('Error in handleSubmit in popup:', error)
    }
  };



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Select Movie</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
        <DialogTitle>{movieName}</DialogTitle>
          <DialogDescription>
            Review this movie or add it to a collection!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-6 py-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="review" className="text-left font-medium">
              Review
            </Label>
            <Input id="review" value={review} onChange={handleReviewChange} placeholder="Start reviewing" className="w-full" />
          </div>
          <div className="flex flex-col space-y-2">
          <Label className="text-left font-medium">
              Collections
            </Label>
            <CollectionsDropdown collections={collections} onSelectionChange={handleCollectionChange} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
