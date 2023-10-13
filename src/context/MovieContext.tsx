import { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieFull, Movie } from '../models/MovieModel';
import { FetchData } from '../actions/FetchData';

// Define the initial context value
interface MovieContextType {
    movie: MovieFull | null;
    movies?: Movie[] | null;
    randomizedGenres?: number[] | null;
    moviesLoading: boolean;
    movieLoading: boolean;
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
    const apiKey = process.env.REACT_APP_API_KEY;
    const abortControllerRef = useRef<AbortController | null>(null);
    const MoviesAbortControllerRef = useRef<AbortController | null>(null);
    const [movieLoading, setMovieLoading] = useState<boolean>(false);
    const [moviesLoading, setMoviesLoading] = useState<boolean>(false);

    const [movie, setMovie] = useState<MovieFull | null>(null);
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [genres, setGenres] = useState<number[] | null>(null); 
    const [randomizedGenres, setRandomizedGenres] = useState<number[] | null>(null); 

    const { id } = useParams();

    const possibleSorts: string[] = ["popularity.desc", "revenue.desc", "vote_count.desc"];
    const possiblePage: string[]= ["1", "2", "3", "4", "5"];

    const getRandomGenreIds = (genreArr: number[]) => {
        const shuffledGenres = genreArr.sort(() => 0.5 - Math.random());
        const selectedGenres = shuffledGenres.slice(0, 3);
        setRandomizedGenres(selectedGenres);
        return selectedGenres.join(",");
    };

    const getRandomVal = (arr: string[]) => {
        const shuffledArr = arr.sort(() => 0.5 - Math.random());
        const selectedVal = shuffledArr[0];
        return selectedVal;
    }

    // Update the movie state when the data changes
    useEffect(() => {
        const fetchMovie = async () => {
            setMovieLoading(true);
            const baseUrl = "https://api.themoviedb.org/3/movie/";
            const fetchUrl = baseUrl + id + "?api-key=" + apiKey + "&append_to_response=videos";
            const data = await FetchData(fetchUrl, abortControllerRef);
            setMovie(data);
            setMovieLoading(false);

        };

        fetchMovie()
    }, [id]);

    useEffect(() => {
        if (movie) {
            const genreArr: number[] = []; // Specify the type of genreArr

            movie.genres?.forEach(genre => {
                if (genre.id)
                    genreArr.push(genre.id); // Assuming 'id' is the property that holds the genre ID
            });

            setGenres(genreArr);
        }

    }, [movie]);

    useEffect(() => {
        // Fisher-Yates (Knuth) Shuffle algorithm
        function shuffleArray(array: Movie[]) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        const fetchMovies = async () => {
            if (genres) {
                setMoviesLoading(true);

                const randomPage = getRandomVal(possiblePage);
                const randomSort = getRandomVal(possibleSorts);
                const fetchMoviesUrl = "https://api.themoviedb.org/3/discover/movie?with_genres=" + getRandomGenreIds(genres) + "&page=" + randomPage + "&sort_by=" + randomSort;
                const data = await FetchData(fetchMoviesUrl, MoviesAbortControllerRef);

                // Shuffle movies array
                const shuffledMovies = data?.results ? shuffleArray([...data.results ]) : [];
                const shuffledMoviesWithoutActive = shuffledMovies.filter(x => x.id !== (id ? parseInt(id) : undefined));
                setMovies(shuffledMoviesWithoutActive);
                setMoviesLoading(false);
            }
        }
        if (genres) {
            fetchMovies()
        }
    }, [genres])

    return (
        <MovieContext.Provider value={{ movie, movies, randomizedGenres, movieLoading, moviesLoading}}>
            {children}
        </MovieContext.Provider>
    );
};