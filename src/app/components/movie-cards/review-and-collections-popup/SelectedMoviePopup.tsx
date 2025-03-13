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
import { useMovieActions } from "@/app/hooks/useMoviePopupActions"


type SelectedMoviePopupProps = {
  movieName: string
  movieId: string
  moviePoster: string
}

export const SelectedMoviePopup = ({movieName, movieId, moviePoster}: SelectedMoviePopupProps) => {
  const {
    review,
    collections,
    handleReviewChange,
    handleCollectionChange,
    handleSubmit
  } = useMovieActions(movieId, movieName, moviePoster);

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
            <Input 
              id="review" 
              value={review} 
              onChange={handleReviewChange} 
              placeholder="Start reviewing" 
              className="w-full" 
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label className="text-left font-medium">
              Collections
            </Label>
            <CollectionsDropdown 
              collections={collections} 
              onSelectionChange={handleCollectionChange} 
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
