import { ReviewMovieCard } from "./ReviewMovieCard";
import React from "react";
import { Review } from "@/app/types/movie-backend-types";

interface ReviewMovieCardsProps {
    data: Review[]
}

export const ReviewMovieCards: React.FC<ReviewMovieCardsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 p-8 justify-items-center">
      {data.map((review) => (
        <ReviewMovieCard
        movieId={review.movieId}
        movieName={review.movieName}
        reviewText={review.reviewText}
        moviePoster={review.moviePoster}/>
      ))}
    </div>
  );
};

