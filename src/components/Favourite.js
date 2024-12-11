import { Link, useNavigate } from "react-router-dom"

function Favourite({ favourite, removeFromFavourite }) {

    const navigate = useNavigate();
    const backToprev = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="text-center">
                {favourite.length === 0 ? (
                    <p className="text-xl uppercase text-orange-500">No Movies in your favourite list</p>
                ) : (
                    <div>
                        {favourite.map(movie => (
                            <Link key={movie.imdbID} tp={`/movie/${movie.imdbID}`}>
                                <div className="mb-8 w-80 text-center rounded-md shadow-md shadow-red-600 overflow-hidden">
                                    <img src={movie.Poster} alt={movie.Title} className="w-full h-72" />
                                    <div className="bg-slate-100 py-4">
                                        <h1 className="text-2xl text-orange-500">{movie.Title}</h1>
                                        <h3 className="text-xl text-orange-500">{movie.Year}</h3>
                                        <p className="text-2xl text-orange-500 uppercase">{movie.Type}</p>
                                        <button onClick={() => removeFromFavourite(movie.imdbID)} className="text-white bg-red-600 rounded-lg text-sm px-5 py-3 text-center mb-4 mt-5">Remove</button>
                                    </div>

                                </div>
                            </Link>
                        ))}

                    </div>

                )}

            </div>
            <button className="bg-gray-500 text-white text-xl py-2 px-5 mr-64 rounded-lg"
                onClick={backToprev}>Back</button>
        </>
    )

}

export default Favourite