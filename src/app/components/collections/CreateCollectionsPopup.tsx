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
import { useState } from "react"

import { generateClient } from 'aws-amplify/api'
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Schema } from "amplify/data/resource"

const client = generateClient<Schema>()

export const CreateCollectionsPopup = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [collectionName, setCollectionName] = useState('')

  const handleCollectionNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCollectionName(event.target.value);
  };

  const createCollection = async (collectionName: string) => {
    try {
      await client.models.Movie.create({
        userId: user?.userId,
        sk: `COLLECTION#${collectionName}`,
        collectionId: `ID-${collectionName}`,
        collectionName,
      });
    } catch (error) {
      console.error('Could not create collection', error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Collection</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
        <DialogTitle>New Collection</DialogTitle>
          <DialogDescription>
            Create a new collection to store all your favourite movies!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-6 py-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="review" className="text-left font-medium">
              Collection Name
            </Label>
            <Input id="review" value={collectionName} onChange={handleCollectionNameChange} placeholder="" className="w-full" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => {createCollection(collectionName)}}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
