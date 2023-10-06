import React, { ReactNode } from "react";
import styled from "styled-components";
import { Movie } from "./MovieModel";
import { Container } from "../../../components/ui/layout/Containers";

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
        background-color: ${(props) => props.theme.background[300]};
        position: relative;

        &:after {
            content: "";
            padding-top: 145%;
            display: block;
        }

        img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            object-position: center;
            position: absolute;
            left: 0;
            top: 0;
            border-bottom: 4px solid  ${(props) => props.theme.primary[500]};
            transition: all 0.35s;
        }

        .noImg {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }

        &:hover {
            img {
                filter: brightness(115%);
            }
        }
    }

    .text {
        padding: 20px 20px 20px;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;

        h3 {
            color: ${(props) => props.theme.text[200]};
            margin-top: 0;
            margin-bottom: 10px;
            line-height: 1.3;
        }

        p {
            margin: 0;
            
            &.description {
                margin:5px 0;
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
                padding: 10px 15px;
                display: inline-flex;
                color: ${(props) => props.theme.text[900]};
                border-radius: 25px;
                background-color: ${(props) => props.theme.primary[500]};
                text-align: Center;
                align-self: flex-end;
                display: inline-flex;   
                align-items: flex-end;  
          
          
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

const MovieItem = ({ movie }: MovieItemProps) => {

    if (movie) {
        return (
            <MovieItemStyled>
                <div className="image">
                    { movie.poster_path != null 
                    ? 
                    <img src={"https://image.tmdb.org/t/p/w400/" + movie.poster_path} /> 
                    : 
                    <div className="noImg"></div>
                    }             
                </div>
                <div className="text">
                    <h3><a href="">{movie.title ? truncateString(movie.title, 40) : ""}</a></h3>
                    <p className="description">{movie.overview ? truncateString(movie.overview, 200) : ""}</p>
                    <Container 
                        justify="space-between" 
                        alignitems="center" 
                        direction="row" 
                        padding="0px"
                        margin="15px 0 0 0"
                    >
                    <p className="date">{movie.release_date}</p>
                    <p className="rating"><strong>{movie.vote_average}</strong></p>
                    </Container>
                    
                </div>
            </MovieItemStyled>
        );
    } else {
        return null;
    }

}

export default MovieItem;