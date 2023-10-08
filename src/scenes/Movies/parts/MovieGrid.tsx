import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";
import MovieItem from "../../../components/MovieItem";
import { Movie } from "../../../models/MovieModel";
import { Loader } from "../../../components/ui/elements/Loader";

interface MoviesData {
    results?: Movie[];
}

interface MovieGridProps {
    children?: ReactNode,
    moviesData?: MoviesData | null,
}

const MovieGridStyled = styled.div<MovieGridProps>`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 10px;
    row-gap: 15px;
`

const MovieGrid = ({ moviesData }: MovieGridProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ 
                block: 'start',   // Align with the top of the viewport
                inline: 'nearest', // Maintain horizontal alignment
            });
            window.scrollBy(0, -300)
          }
    }, [moviesData])
    
    if (!moviesData) {
        return (<Loader/>);
    } else {
        return (
            <MovieGridStyled ref={containerRef}>
                {moviesData.results?.map((movie) => (
                    <MovieItem key={movie.id} movie={movie}></MovieItem>
                ))}
            </MovieGridStyled>
        ); 
    }

}

export default MovieGrid;