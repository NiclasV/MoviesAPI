import React, { ReactNode }  from "react";
import styled from "styled-components";
import MovieItem from "./MovieItem";
import { Movie } from "./MovieModel";

interface MoviesData {
    results?: Movie[];
}

interface MovieGridProps {
    children?: ReactNode,
    moviesData?: MoviesData,
}

const MovieGridStyled = styled.div<MovieGridProps>`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 25px;
    row-gap: 25px;
`

const MovieGrid:React.FC<MovieGridProps> = ({ moviesData }) => {
    if (!moviesData) {
        return <p>Loading movies...</p>;
    } else {
        return (
            <MovieGridStyled>
                {moviesData.results?.map((movie) => (
                    <MovieItem key={movie.id} movie={movie}></MovieItem>
                ))}
            </MovieGridStyled>
        ); 
    }

}

export default MovieGrid;