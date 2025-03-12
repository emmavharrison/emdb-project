export const fetchSearchMovies = async (searchedMovie: string) => {
  console.log("searched movie", searchedMovie);

  const response = await fetch(
    `https://www.omdbapi.com/?s=${searchedMovie}&apikey=5b006bb3`
  );

  console.log("response", response);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Error fetching movies");
  }

  return data;
};
