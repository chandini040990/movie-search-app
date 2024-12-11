
// import MovieList from "./MovieList";

function FilterDropdown({ onFilterChange }) {

    return (
        <>
            <div>
                <select id="filter" onChange={(e) => onFilterChange(e.target.value)} className="border outline-none rounded px-4 py-2 text-black w-30">
                    <option value="">All</option>
                    <option value="movie">Movies</option>
                    <option value="series">Series</option>
                </select>
            </div>

        </>

    )

}

export default FilterDropdown