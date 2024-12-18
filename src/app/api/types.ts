export type MovieResult = {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
};

export type SearchResult = {
  Search: MovieResult[];
  totalResults: string;
  Response: string;
};
