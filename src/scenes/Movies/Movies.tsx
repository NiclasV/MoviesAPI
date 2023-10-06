import React, { useEffect, useRef, useState }  from "react";
import GetData from "../../data/GetData";
import MovieNav from "./parts/MoviesNav";
import MovieGrid from "./parts/MovieGrid";
import { Pagination } from "./parts/Pagination";
import { useSearchParams } from "../../hooks/useSearchParams";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Movies = () => {
  const baseUrl: string = "https://api.themoviedb.org/3/discover/movie?";
  const [data, setData] = useState();
  const abortControllerRef = useRef<AbortController | null>(null);

  const generateInitParams = () => {
    const sp = new URLSearchParams(window.location.search);
    const includeAdult = sp.get('include_adult') || 'false';
    const includeVideo = sp.get('include_video') || 'false';
    const language = sp.get('language') || 'en-US';
    const page = sp.get('page') || '1';
    const sortBy = sp.get('sort_by') || 'popularity.desc';

    // Now you can create a new URLSearchParams with the values or fallbacks
    const initialSearchParams = new URLSearchParams({
      "include_adult": includeAdult,
      "include_video": includeVideo,
      "language": language,
      "page": page,
      "sort_by": sortBy,
    });

    //return initialSearchParams;
    return new URLSearchParams()
  }

  const { params, fetchUrl, updateSearchParams } = useSearchParams({
    url: baseUrl,
    searchParams: generateInitParams(),
  });

  useEffect(() => {
    const fetchData = async (url: string) => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController(); 

      try {
        const result = await GetData(url, {
          signal: abortControllerRef.current?.signal,
        });
        setData(result);
      } catch (error) { 
        console.error('Error:', error);
      }
    };

    if (fetchUrl) {
      fetchData(fetchUrl);
    }

  }, [fetchUrl])

  const handleParamChange = (param: string, value: string | number) => {
    var sp = new URLSearchParams(params);
    sp.set(param, String(value))

    updateSearchParams(sp);
  };

  return (
    <>
      <MovieNav />
      <MovieGrid moviesData={data} />
      <Pagination searchParams={params} handleParamChange={handleParamChange}/>
    </>
  );
}

export default Movies;
