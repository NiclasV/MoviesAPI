import React, { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

interface ProductionCompany {
    id?: number;
    logo_path?: string | null;
    name?: string;
    origin_country?: string;
}

interface ProductionCountry {
    iso_3166_1?: string;
    name?: string;
}

interface SpokenLanguage {
    english_name?: string;
    iso_639_1?: string;
    name?: string;
}

interface Genre {
    id?: number;
    name?: string;
}

interface Movie {
    adult?: boolean;
    backdrop_path?: string;
    belongs_to_collection?: boolean;
    budget?: number;
    genres?: Genre[];
    homepage?: string;
    id?: number;
    imdb_id?: string;
    original_language?: string;
    original_title: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    production_companies?: ProductionCompany[];
    production_countries?: ProductionCountry[];
    release_date?: string;
    revenue?: number;
    runtime?: number;
    spoken_languages?: SpokenLanguage[];
    status?: string;
    tagline?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}

// Define the initial context value
interface MovieContextType {
    movie: Movie | null;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovieContext = () => {
    const context = useContext(MovieContext);

    if (!context) {
        throw new Error('useMoviesContext must be used within a MoviesProvider');
    }
    return context;
};

export const MovieProvider = ({ children }: PropsWithChildren) => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const { id } = useParams();
    const baseUrl = "https://api.themoviedb.org/3/movie/";
    const fetchUrl = baseUrl + id;
  
    const { data } = useFetch(fetchUrl);
  
    // Update the movie state when the data changes
    useEffect(() => {
      if (data) {
        setMovie(data);
      }
    }, [data]);
  
    return (
        <MovieContext.Provider value={{ movie }}>
            {children}
        </MovieContext.Provider>
    );
};