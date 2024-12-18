import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useSearchMovies } from "@/app/hooks/useSearchMovies";
import { fetchSearchMovies } from "@/app/api/searchMovies";

export const SearchBar = () => {
  const [searchedMovie, setSearchedMovie] = useState<string>("");
  const [data, setData] = useState({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedMovie(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("searched film", searchedMovie);
    fetchSearchMovies(searchedMovie).then(data => { console.log(data) })
  };

  console.log(data);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <Input
        type="text"
        placeholder="Search Movies..."
        onChange={handleChange}
        value={searchedMovie}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};
