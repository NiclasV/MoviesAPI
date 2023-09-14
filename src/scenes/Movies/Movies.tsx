import React, { useEffect, useRef, useState }  from "react";
import GetData from "../../data/GetData";
import MovieNav from "./parts/MoviesNav";
import MovieGrid from "./parts/MovieGrid";
import { Pagination } from "./parts/Pagination";
import { useSearchParams } from "../../hooks/useSearchParams";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Movies: React.FC = () => {
  const baseUrl: string = "https://api.themoviedb.org/3/discover/movie?";
  const [data, setData] = useState();
  const abortControllerRef = useRef<AbortController | null>(null);
  const { localGet, localSet } = useLocalStorage();

  const { params, fetchUrl, updateSearchParams } = useSearchParams({
    url: baseUrl,
    searchParams: new URLSearchParams({
      "include_adult": "false",
      "include_video": "false",
      "language": "en-US",
      "page": "1",
      "sory_by": "popularity.desc",
    }),
  });

  useEffect(() => {
    localSet("hej", "hejaaa")

    console.log(localGet("hej"))
  }, [])

  useEffect(() => {
    const fetchData = async (url: string) => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController(); 
      console.log("fetch")

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

  const handlePageChange = (newPage: number) => {
    var sp = new URLSearchParams(params);
    sp.set("page", String(newPage))

    updateSearchParams(sp);
  };

  return (
    <>
      <MovieNav />
      <MovieGrid moviesData={data} />
      <Pagination searchParams={params} onPageChange={handlePageChange}/>
    </>
  );
}

export default Movies;
