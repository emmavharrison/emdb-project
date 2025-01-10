import { MovieResult } from "@/app/api/types";

import { SelectedMoviePopup } from "../review-and-collections-popup/SelectedMoviePopup";

export const ResultCard = ({ Title, Poster, Year, imdbID }: MovieResult) => {
  return (
    <div key={imdbID} className="movie-item bg-orange-400 mb-7 max-w-md">
      <h3>{Title}</h3>
      <img src={Poster} alt={`${Title} poster`} />
      <p>Year: {Year}</p>
      <SelectedMoviePopup movieName={Title} />
    </div>
  );
};
