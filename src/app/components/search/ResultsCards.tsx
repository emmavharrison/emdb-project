import { ResultCard } from "./ResultCard";
import React from "react";
import { SearchResult } from "@/app/api/types";

interface ResultsCardsProps {
  data: SearchResult;
}

export const ResultsCards: React.FC<ResultsCardsProps> = ({ data }) => {
  return (
    <div>
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

