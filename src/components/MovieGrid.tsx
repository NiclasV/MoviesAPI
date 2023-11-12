import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";
import MovieItem from "./MovieItem";
import { Movie } from "../models/MovieModel";
import { Loader } from "./ui/elements/Loader";


interface MovieGridProps {
    children?: ReactNode,
    movies: Movie[]| null, 
}

const MovieGridStyled = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;

    @media (max-width: 1280px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 680px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 520px) {
        grid-template-columns: 1fr;
    }

    > div {
        width: 100%;
    }
`

const MovieGrid = ({ movies }: MovieGridProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const page = searchParams.get('page');
    
        if (containerRef.current && page) {
            containerRef.current.scrollIntoView({ 
                block: 'start',   
                inline: 'nearest', 
            });
            window.scrollBy(0, -240)
          }
    }, [window.location.search])
    
    if (!movies) {
        return (<Loader/>);
    } else {
        return (
            <MovieGridStyled ref={containerRef}>
                {movies?.map((movie) => (
                    <MovieItem key={movie.id} movie={movie}></MovieItem>
                ))}
            </MovieGridStyled>
        ); 
    }

}

export default MovieGrid;