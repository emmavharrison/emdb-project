import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Navigate } from "react-router";

export const SearchBar = () => {
  const [searchedMovie, setSearchedMovie] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  // const [data, setData] = useState({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedMovie(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("searched film", searchedMovie);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
      return <Navigate to={`/results/${searchedMovie}`} replace />;
  }

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
