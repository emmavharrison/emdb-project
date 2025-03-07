import { MovieResult } from "@/app/api/types";

import { SelectedMoviePopup } from "../review-and-collections-popup/SelectedMoviePopup";

export const ResultCard = ({ Title, Poster, Year, imdbID }: MovieResult) => {
  return (
    <div key={imdbID} className="movie-item bg-[#E5D9F2] mb-7 max-w-md rounded-md
    p-4">
      <h3 className="text-center font-semibold text-lg pb-2">{Title}</h3>
      <div className="w-48 h-72 overflow-hidden">
      <img src={Poster} alt={`${Title} poster`} className="w-full h-full object-cover"/>
      </div>
      <p className="py-2 text-center">{Year}</p>
      <div className="justify-self-center">
      <SelectedMoviePopup movieName={Title} movieId={imdbID} moviePoster={Poster} />
      </div>
    </div>
  );
};
