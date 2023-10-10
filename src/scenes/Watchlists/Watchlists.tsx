import { useEffect, useState } from "react";
import MovieGrid from "../../components/MovieGrid";
import { Container, Section } from "../../components/layout/Containers";
import { useWatchListContext } from "../../context/WatchListContext";
import { Movie } from "../../models/MovieModel";

export const Watchlists = () => {
    const { watchLists } = useWatchListContext();
    const [movies, setMovies ] = useState<Movie[] | null>(null);

    useEffect(() => {
        if(watchLists) {
            const watchListMovies = watchLists[0].movies;
            setMovies(watchListMovies)
        }
    }, [watchLists])
    
    return (
        <Section $variant="mSmall">
                <Container $variant="wide">
                <h1 style={{margin: "10px 0 0 0",}}>Your Watchlist</h1>    
                <p style={{margin: "0 0 20px 0",}}>{watchLists ? watchLists[0]?.label : ""}</p>
                <MovieGrid movies={movies}/>
            </Container>
        </Section>
    );
}