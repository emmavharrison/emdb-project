# EMDB

## Hooks

*useMoviePopupActions*
Used in the `SelectedMoviePopup` component to extract out business logic - things like adding a review for a movie, adding a movie to a collection, and submitting this data.

*useSearchMovies*
Used to make a call to the OMDB Movie API.

## Helpers

*createCollections*
Allows a user to create a new collection and give it a description. Used on the Collections page.

*addToCollection*
Used on the `SelectedMoviePopup` that appears on a selected movie from the search results page. It allows a user to add the selected movie to a pre-existing collection.

*fetchAllCollectionsForDropdown*
Used on the `SelectedMoviePopup` that appears on a selected movie from the search results page. It displays all current collections a user has, so they can select what collection to add their chosen film to.

*fetchAllCollectionsForCollectionsPage*
Used on the Collections page, fetches and displays all collections a user has, and ensure each collection is unique.
