// const apiKey = import.meta.env.REACT_APP_API_KEY;

export const fetchSearchMovies = async (searchedMovie: string) => {
  // if (!apiKey) {
  //   throw new Error("Missing API key");
  // }

  console.log("searched movie", searchedMovie);
  // console.log("apikey", apiKey);

  const response = await fetch(
    // `https://www.omdbapi.com/?t=${searchedMovie}&apikey=${apiKey}`
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

// https://www.omdbapi.com/?t=PRIDE+AND+PREJUDICE&apikey=5b006bb3
