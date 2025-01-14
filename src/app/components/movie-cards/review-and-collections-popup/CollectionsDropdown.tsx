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

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface Collection {
    id: string;
    name: string;
    disabled?: boolean;
}

interface SelectedCollection {
    id: string;
    name: string;
}

type CollectionsDropdownProps = {
  collections: Collection[];
  onSelectionChange: (selectedCollections: SelectedCollection[]) => void;
}

export const CollectionsDropdown = ({collections, onSelectionChange}: CollectionsDropdownProps) => {
  // const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
//   const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
//   const [showPanel, setShowPanel] = React.useState<Checked>(false)

  const [checkedState, setCheckedState] = React.useState<{ [key: string]: Checked }>(
    collections.reduce((acc, collection) => ({ ...acc, [collection.id]: false }), {})
  );

  const handleCheckedChange = (id: string, checked: Checked) => {
    const newCheckedState = { ...checkedState, [id]: checked };
    setCheckedState(newCheckedState);
    
    const selectedCollections = collections
      .filter(collection => newCheckedState[collection.id])
      .map(collection => ({ id: collection.id, name: collection.name }));
    
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
          key={collection.id}
          checked={checkedState[collection.id]}
          onCheckedChange={(checked) => handleCheckedChange(collection.id, checked)}
          disabled={collection.disabled}
          >
            {collection.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
