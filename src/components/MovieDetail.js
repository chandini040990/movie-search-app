
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MovieDetails } from "../api";

function MovieDetail({ favourite, addToFavourite }) {

    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const backToprev = () => {
        navigate(-1);
    }

    // fethc the movie details from the api

    useEffect(() => {
        const movieDetail = async () => {
            try {
                const data = await MovieDetails(id);
                setMovie(data)

            } catch (error) {
                setError("failed to fetch the movie details")
            }
        }
        movieDetail();
    }, [id])

    //condition if data is loading

    if (!movie) {
        return <h1 className="text-4xl font-bold text-center p-4 text-orange-500">Data is loading please wait.....</h1>
    }

    if (error) {
        return <h1 className="text-2xl text-green-200">Error: {error}</h1>
    }

    // check if the movie is already in fav
    const isFavourite = favourite && movie.imdbId ? favourite.some(fav => fav.imdD === movie.imdbId) : false;


    return (
        <>
            <div className="">
                <img src={movie.Poster} alt={movie.Title} />
                <div>
                    <h1 className="text-2xl text-white underline mt-4">{movie.Title}</h1>
                    <h2 className="text-xl text-white mt-4">Year: {movie.Year}</h2>
                    <h3 className="text-xl text-white mt-4">Genre: {movie.Genre}</h3>
                    <h4 className="text-xl text-white mt-4">Plot: {movie.Plot}</h4>
                    <h5 className="text-xl text-white mt-4">Ratings: {movie.imdbRating}</h5>
                    <h5 className="text-xl text-white mt-4">Cast: {movie.Actors}</h5>
                    <p className="text-black bg-red-600 rounded w-64 p-2 m-2 text-xl">Add to Favourite: <button onClick={() => addToFavourite(movie)} className={`text-white font-bold py-2 px-4 rounded ${isFavourite ? "text-yellow-500" : "text-green"}`}>***</button></p>
                </div>
            </div>
            <button className="bg-gray-500 text-white text-center text-xl py-2 px-5 mr-64 rounded-lg"
                onClick={backToprev}>Back</button>
        </>
    )
}

export default MovieDetail