import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "./redux/reducers/searchReducers";
import { fetchSearchResults } from "./redux/actions/searchActions";
import SearchResult from "./SearchResult";
// import { fetchSearchResults, setSearchTerm } from "./reducers";

function MovieSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.movie.searchTerm);
  const searchResults = useSelector((state) => state.movie.searchResults);

  useEffect(() => {
    const search = new URLSearchParams(location.search).get("query");
    if (search) {
      dispatch(setSearchTerm(search));
      dispatch(fetchSearchResults(search));
    }
  }, [location.search, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-8 mb-4">
        Search Results for "{searchTerm}"
      </h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          placeholder="Search movies..."
          className="border border-gray-300 rounded px-4 py-2 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>
      <SearchResult resultSearch={searchResults} />
    </div>
  );
}

export default MovieSearch;
