
import { Link } from "react-router-dom";

function MovieList({ movies }) {

    // if movie is not found
    if (movies.length === 0) {
        return <h1 className="text-3xl font-medium text-orange-500 text-center">Movie is not found, search with different name !!!</h1>
    }


    return (
        <>
            <div className="text-white flex flex-wrap gap-20">
                {movies.map(movie => (
                    <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
                        <div className="mb-8 w-80 text-center bg-gray-900 rounded-md shadow-md shadow-red-600 overflow-hidden">
                            <img src={movie.Poster} alt={movie.Title} className="w-full h-72" />
                            <div>
                                <h1 className="text-xl text-white">{movie.Title}</h1>
                                <h3 className="text-xl text-white">{movie.Year}</h3>
                                <p className="text-xl text-white uppercase">{movie.Type}</p>
                            </div>

                        </div>
                    </Link>


                ))}

            </div>

        </>
    )

}

export default MovieList
