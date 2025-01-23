import { ResultCard } from "./ResultCard";
import React from "react";
import { SearchResult } from "@/app/api/types";


interface ResultsCardsProps {
  data: SearchResult;
}

export const ResultsCards: React.FC<ResultsCardsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 p-8 justify-items-center">
      {data.Search.map((movie) => (
        <ResultCard
          Title={movie.Title}
          Poster={movie.Poster}
          Year={movie.Year}
          imdbID={movie.imdbID}
        key={`${movie.Title}#${movie.imdbID}`}/>
      ))}
    </div>
  );
};

