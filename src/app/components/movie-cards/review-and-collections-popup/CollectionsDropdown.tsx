import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

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

type Checked = DropdownMenuCheckboxItemProps["checked"]

type CollectionsDropdownProps = {
  collections: Collection[];
  onSelectionChange: (selectedCollections: Collection[]) => void;
}

export const CollectionsDropdown = ({collections, onSelectionChange}: CollectionsDropdownProps) => {
  // const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
//   const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
//   const [showPanel, setShowPanel] = React.useState<Checked>(false)

  const [checkedState, setCheckedState] = React.useState<{ [key: string]: Checked }>(
    collections.reduce((acc, collection) => ({ ...acc, [collection.collectionId]: false }), {})
  );

  const handleCheckedChange = (id: string, checked: Checked) => {
    const newCheckedState = { ...checkedState, [id]: checked };
    setCheckedState(newCheckedState);
    
    const selectedCollections = collections
      .filter(collection => newCheckedState[collection.collectionId])
      .map(collection => ({ collectionId: collection.collectionId, collectionName: collection.collectionName }));
    
    onSelectionChange(selectedCollections);
  };

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
