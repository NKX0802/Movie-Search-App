import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [sortBy, setSortBy] = useState("popularity.desc"); //The default is now by popularity

  // Wait 500ms after user stop typing to request the API
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=${sortBy}`;

      const response = await fetch(endpoint, API_OPTIONS);

      //Fetch error
      if (!response.ok) {
        throw new Error("Failed to fetch movies"); //Skip everything to catch
      }

      //Get data from database
      const data = await response.json();

      //Fetch error
      if (!data.results) {
        setErrorMessage("Error fetching movies from TMDB.");
        return; //Skip everything to finally
      }

      setMovieList(data.results); //Put the data into setMovieList

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm, sortBy]); //[debouncedSearchTerm] is ON then run useEffect

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  //Show the Back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        //When the user scroll Y axis > 300
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll); //This let the button handleScroll be always functioning

    // Clean up: remove the listener when the component closes
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <h1>
            Find <span className="text-gradient">Movies</span> You Like
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10 w-full max-w-3xl mx-auto">
            {/* Update the data, clear set the searchTerm to empty string (Props can let the system know =)*/}
            <SearchBar
              currentWord={searchTerm}
              updateWord={setSearchTerm}
              clear={() => setSearchTerm("")}
            />

            {/* Change the sortBy */}
            {!searchTerm && (
              <div
                className="rounded-3xl will-change-transform w-fit text-sm sm:text-2xl mt-1 p-[3px] transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(to right, #BAE6FD, #7DD3FC)",
                }}
              >
                <select
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm sm:text-2xl bg-transparent text-black p-2 sm:p-3 rounded-3xl outline-none cursor-pointer h-full"
                >
                  <option value="popularity.desc">Popularity</option>
                  <option value="vote_average.desc">Rating</option>
                  <option value="primary_release_date.desc">
                    Release Date
                  </option>
                </select>
              </div>
            )}
          </div>
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending items-center">
            <h2 className="text-4xl">Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p className="fancy-text">{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2 className="text-4xl">All Movies</h2>
          {/* && = straight show */}
          {searchTerm &&
            !isLoading &&
            !errorMessage &&
            movieList.length > 0 && <p>Found {movieList.length} movies</p>}
          {/* Check isLoading then check errorMessage if both ok then show MovieCard */}
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : searchTerm && movieList.length <= 0 ? (
            <p>No movies found for {searchTerm}</p>
          ) : (
            <ul>
              {movieList.map((movie2) => (
                <MovieCard key={movie2.id} movie={movie2} />
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Back to top button */}
      {showButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer will-change-transform fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 font-bold rounded-full shadow-lg transition-transform duration-300 hover:scale-110 active:scale-90 bg-linear-to-r from-[#BAE6FD] to-[#7DD3FC] text-primary"
        >
          <img
            src="arrow-top.png"
            alt="up arrow"
            className="size-5 sm:size-8 object-contain"
          />

          <span className="hidden sm:inline text-xl">Back to top</span>
        </button>
      )}
    </main>
  );
};

export default App;
