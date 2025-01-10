import { MovieResult } from "@/app/api/types"

export const ResultCard = ({ Title, Poster, Year, imdbID }: MovieResult) => {
    return (        <div key={imdbID} className="movie-item">
          <h3>{Title}</h3>
          <img src={Poster} alt={`${Title} poster`} />
          <p>Year: {Year}</p>
        </div>)
}