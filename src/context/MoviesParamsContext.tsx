import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';

// Define the initial context value
interface MoviesContextType {
  searchParams: URLSearchParams;
  updateSearchParams: (newParams: URLSearchParams) => void;
  fetchUrl: string;
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

  if(!initParams.get("page")) {
    initParams.set("page", "1")
  }

  const [searchParams, setSearchParams] = useState<URLSearchParams>(initParams);
  const [fetchUrl, setFetchUrl] = useState("");
  const baseUrl: string = "https://api.themoviedb.org/3/discover/movie?";

  const updateSearchParams = (newParams: URLSearchParams) => {
    setSearchParams(newParams);
  };

  // useEffect for updating fetchUrl when params change
  // also setting the url based on the new params
  useEffect(() => {
    const generateFetchUrl = () => {
        var lp = new URLSearchParams(searchParams)
        const newurl = baseUrl + lp.toString();
        setFetchUrl(newurl);
    };

    const setHistoryUrl = () => {
      var lp = new URLSearchParams(searchParams)
        var currentUrl = window.location.pathname + "?" + lp.toString();
        window.history.pushState("state", "str", currentUrl);
    }

    generateFetchUrl(); 
    setHistoryUrl();

  }, [searchParams]);


  return (
    <MoviesParamsContext.Provider value={{ searchParams, updateSearchParams, fetchUrl}}>
      {children}
    </MoviesParamsContext.Provider>
  );
};