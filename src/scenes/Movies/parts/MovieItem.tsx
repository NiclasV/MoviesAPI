import React, { ReactNode } from "react";
import styled from "styled-components";
import { Movie } from "./MovieModel";
import { Container } from "../../../components/layout/Containers";

interface MovieItemProps {
    children?: ReactNode | "",
    movie?: Movie;
}

const MovieItemStyled = styled.div<MovieItemProps>`
    display: flex;
    flex-direction: column; 
    align-items: flex-start;
    width: 100%;
    height: auto;
    background-color: ${(props) => props.theme.background[100]};
    border-radius: 10px;
    overflow: hidden;

    .image {
        width: 100%;
        height: auto;

        img {
            width: 100%;
            height: auto;
            display: block;
        }
    }

    .text {
        padding: 20px 20px 30px;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: flex-start;
        align-items: flex-start;
        border-top: 4px solid  ${(props) => props.theme.primary[500]};

        h3 {
            color: ${(props) => props.theme.text[200]};
            margin-top: 0;
            margin-bottom: 5px;
            font-weight: 700;
            line-height: 1.35;
        }

        p {
            margin: 0;
            
            &.description {
                margin: 10px 0;
                flex: 1 1 0;

            }

            &.date {
                color: ${(props) => props.theme.text[500]};
                font-size: 14px;
                line-height: 1;
            }

            &.rating {
                margin: 0;
                line-height: 1;
                padding: 8px 15px;
                font-size: 16px;
                display: inline-flex;
                color: ${(props) => props.theme.text[900]};
                border-radius: 25px;
                background-color: ${(props) => props.theme.primary[500]};
                text-align: Center;
                align-self: flex-end;
            }
        }
    }
    
`
function truncateString(input: string, maxLength: number): string {
    if (input.length <= maxLength) {
        return input; // No truncation needed
    }

    // Truncate the string and add "..."
    return input.slice(0, maxLength) + "...";
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {

    if (movie) {
        return (
            <MovieItemStyled>
                <div className="image">
                    <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} />
                </div>
                <div className="text">
                    <h3><a href="">{movie.title}</a></h3>
                    <p className="description">{movie.overview ? truncateString(movie.overview, 200) : ""}</p>
                    <Container 
                        justify="space-between" 
                        alignitems="center" 
                        direction="row" 
                        padding="0px"
                        margin="15px 0 0 0"
                    >
                    <p className="date">{movie.release_date}</p>
                    <p className="rating"><strong>{movie.vote_average}</strong>/10</p>
                    </Container>
                    
                </div>
            </MovieItemStyled>
        );
    } else {
        return null;
    }

}

export default MovieItem;