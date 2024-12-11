
import { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"

import Favourite from "./components/Favourite";
import FilterDropdown from "./components/FilterDropdown";
import MovieDetail from "./components/MovieDetail";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { SearchMovie } from "./api";

function App() {
  // state to store the movie fethed from the API..
  const [movies, setMovies] = useState([]);

  // state to store the error messages
  const [error, setError] = useState(null);

  //state to track if the data is still being loaded
  const [loading, setLoading] = useState(true);

  // state to store the filter for the movie list
  const [filter, setFilter] = useState('');

  // state to manage the list of favorite movies
  const [favorite, setFavourite] = useState([]);

  // state to track the current page of movies being displayed
  const [currentPage, setCurrentPage] = useState(1);

  //define the number of movies that can display per page 
  const moviePerPage = 5;

  const handleSearch = useCallback(async (searchTerm) => {
    try {
      // fetch the movie data using the searchmovie function
      const data = await SearchMovie(searchTerm);
      // update the state with the fetched movies
      setMovies(data.Search || [])

    } catch (error) {
      // update the state with the error messages if the api call is fails
      setError(error.message)

    } finally {
      // set loading to false after the api call completes 
      setLoading(false)
    }

  }, []); //we are adding the filter as the dependency 

  // load the default movies whent the component is ready or mounts

  useEffect(() => {
    const loadDefaultMovies = async () => {
      await handleSearch("movies"); //fetch the movies with the default search term
    };
    loadDefaultMovies(); //call the function to load the movies
  }, [handleSearch]);

  // filter the movies
  const handleFilterChange = (filter) => {
    setFilter(filter)
  }

  // update the current page state
  const handlePagination = (pagenumber) => {
    setCurrentPage(pagenumber)
  }

  // calculate the current movies to be displayed
  const indexOfLastMovie = currentPage * moviePerPage
  const indexOfFirstMovie = indexOfLastMovie - moviePerPage
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie) // what movies to be shown in the  page
  const filteredMovies = filter === '' ? currentMovies : currentMovies.filter((currentMovie) => currentMovie.Type === filter)

  //display the total page
  const totalPages = Math.ceil(movies.length / moviePerPage);

  // contains all page numbers for the pagination button

  const paginationNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationNumbers.push(i)
  }

  const addToFavourite = (movie) => {
    if (favorite.find(fav => fav.imdbID === movie.imdbID)) {
      alert("Movie already added to the favourites");
      return;
    } else {
      setFavourite([...favorite, movie])
    }
  }

  // to remove movie from the favourties
  const removeFromFavourite = (movieimdbID) => {
    setFavourite(favorite.filter(fav => fav.imdbID !== movieimdbID))
  }

  // condition if data is loading
  if (loading)
    return <h1 className="text-4xl text-black font-bold text-center p-4">Data is loading please wait for sometime</h1>

  if (error) {
    return <h1 className="text-2xl font-bold text-red-700">Error: {error}</h1>
  }

  // // filter movies based on the category

  // const filteredMovies = 
  // filter === 'all' ? movies : movies.filter((movie) => movie.filter === filter)

  return (
    <>
      <Router>
        <header className="sticky top-0 bg-red-700 text-white items-center flex 
        flex-wrap gap-5 justify-between p-5 mb-10 z-50 shadow-sm shadow-red-600 rounded">
          <h1 className="text-3xl font-extrabold">MovieMania</h1>
          <SearchBar onSearch={handleSearch} />
          <div className="flex flex-wrap gap-4 justify-between">
            <FilterDropdown onFilterChange={handleFilterChange} />
            {/* add the fav link */}
            <Link to="/favourite" className="text-white">
              <button className="text-white bg-red-600 font-medium rounded-lg text-center text-xl px-4 py-2 ms-2">
                Favourite
              </button>
            </Link>
          </div>

        </header>

        <main>
          <div className="mx-10">
            <Routes>
              <Route path="/" element={
                <>
                  <MovieList movies={filteredMovies} />

                  {/* pagination */}

                  <div className="flex justify-center">
                    {paginationNumbers.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => handlePagination(pageNumber)}
                        className={`py-3 px-4 font-bold text-lg rounded my-4 mx-2 ${currentPage === pageNumber ? 'bg-red-500' : 'bg-gray-300'}`}
                      >
                        {pageNumber}
                      </button>
                    ))}

                  </div>

                </>
              } />
              <Route path="/favourite" element={<Favourite favourite={favorite} removeFromFavourite={removeFromFavourite} />} />
              <Route path="/movie/:id" element={<MovieDetail favourite={favorite} addToFavourite={addToFavourite} />} />
            </Routes>
          </div>
        </main>
      </Router>

    </>

  );
}

export default App;