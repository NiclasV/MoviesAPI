import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FetchData } from '../actions/FetchData';
import { Movie } from '../models/MovieModel';

// Define the initial context value
interface MoviesContextType {
  searchParams: URLSearchParams;
  updateSearchParams: (newParams: URLSearchParams) => void;
  movies: Movie[] | null;
}

const MoviesParamsContext = createContext<MoviesContextType | undefined>(undefined);

export const useMoviesContext = () => {
  const context = useContext(MoviesParamsContext);

  if (!context) {
    throw new Error('useMoviesContext must be used within a MoviesProvider');
  }
  return context;
};

export const MoviesProvider = ({ children }: PropsWithChildren) => {
  const initParams = new URLSearchParams(window.location.search);

  const getTodaysDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  if (!initParams.get("page")) {
    initParams.set("page", "1")
    initParams.set("primary_release_date.lte", getTodaysDate())
  }

  const abortControllerRef = useRef<AbortController | null>(null);
  const [searchParams, setSearchParams] = useState<URLSearchParams>(initParams);
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const baseUrl: string = "https://api.themoviedb.org/3/discover/movie?";

  const updateSearchParams = (newParams: URLSearchParams) => {
    setSearchParams(newParams);
  };

  // useMemo to memoize the fetch URL
  const fetchUrl = useMemo(() => {
    var lp = new URLSearchParams(searchParams)

    return baseUrl + lp.toString();

  }, [searchParams]);


  useEffect(() => {
    const setHistoryUrl = () => {
      var lp = new URLSearchParams(searchParams)
      var currentUrl = window.location.pathname + "?" + lp.toString();
      window.history.pushState("state", "str", currentUrl);
    }

    const fetchMovies = async () => {
      const data = await FetchData(fetchUrl, abortControllerRef);
      setMovies(data?.results);
      setHistoryUrl();
    };

    fetchMovies()

  }, [fetchUrl, searchParams]);

  return (
    <MoviesParamsContext.Provider value={{ searchParams, updateSearchParams, movies }}>
      {children}
    </MoviesParamsContext.Provider>
  );
};