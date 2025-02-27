import { Review } from "@/app/types/movie-backend-types";

export const ReviewMovieCard = ({ reviewText, movieName, movieId }: Review) => {
  return (
    <div key={movieId} className="movie-item bg-[#E5D9F2] mb-7 max-w-md rounded-md
    p-4">
      <h3 className="text-center font-semibold text-lg pb-2">{movieName}</h3>
      <div className="w-48 h-72 overflow-hidden">
      </div>
      <p className="py-2 text-center">{reviewText}</p>
    </div>
  );
};