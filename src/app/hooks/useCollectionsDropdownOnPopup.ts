import { useState, useEffect } from 'react';
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Collection } from "@/app/types/movie-frontend-types"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export const useCollectionsDropdown = (
  collections: Collection[],
  onSelectionChange: (selectedCollections: Collection[]) => void
) => {
  const [checkedState, setCheckedState] = useState<{ [key: string]: Checked }>(
    collections.reduce((acc, collection) => ({ ...acc, [collection.collectionId]: false }), {})
  );

  useEffect(() => {
    setCheckedState(
      collections.reduce((acc, collection) => ({ 
        ...acc, 
        [collection.collectionId]: checkedState[collection.collectionId] || false 
      }), {})
    );
  }, [collections]);

  const handleCheckedChange = (id: string, checked: Checked) => {
    const newCheckedState = { ...checkedState, [id]: checked };
    setCheckedState(newCheckedState);
    
    const selectedCollections = collections
      .filter(collection => newCheckedState[collection.collectionId])
      .map(collection => ({ collectionId: collection.collectionId, collectionName: collection.collectionName }));
    
    onSelectionChange(selectedCollections);
  };

  return { checkedState, handleCheckedChange };
};
