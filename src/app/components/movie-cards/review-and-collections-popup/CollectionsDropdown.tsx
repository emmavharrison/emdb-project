import * as React from "react"
import { Button } from "@/app/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Collection } from "@/app/types/movie-frontend-types"
import { useCollectionsDropdown } from "@/app/hooks/useCollectionsDropdownOnPopup"


type CollectionsDropdownProps = {
  collections: Collection[];
  onSelectionChange: (selectedCollections: Collection[]) => void;
}

export const CollectionsDropdown = ({collections, onSelectionChange}: CollectionsDropdownProps) => {
  const { checkedState, handleCheckedChange } = useCollectionsDropdown(collections, onSelectionChange);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">View Collections</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto">
        <DropdownMenuLabel>Collections</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {collections.map((collection) => (
          <DropdownMenuCheckboxItem
          key={collection.collectionId}
          checked={checkedState[collection.collectionId]}
          onCheckedChange={(checked) => handleCheckedChange(collection.collectionId, checked)}
          disabled={collection.disabled}
          >
            {collection.collectionName}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
