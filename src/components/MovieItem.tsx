import { ReactNode } from "react";
import styled from "styled-components";
import { Movie } from "../models/MovieModel";
import { Container } from "./layout/Containers";
import { Link } from "react-router-dom";
import { AddToWatchlist } from "./AddToWatchlist";

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
    border: 1px solid ${(props) => props.theme.background[300]};
    box-shadow: 0px 0px 25px 0px rgba(0,0,0,0.05);

    .image {
        width: 100%;
        background-color: ${(props) => props.theme.background[300]};
        position: relative;

        .addToWatchlist {
            position: absolute;
            left: 10px;
            top: 10px;
            z-index: 99;

            button {
                position: relative; 
                z-index: 1;
            }
        }

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
            
            &:hover {   
                filter: brightness(120%);     
            }
        }

        .noImg {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
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
            width: 100%;
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
                    <Link to={`/movie/${movie.id}`}>
                        {movie.poster_path != null
                            ?
                            <img src={"https://image.tmdb.org/t/p/w400/" + movie.poster_path} alt="" />
                            :
                            <div className="noImg" ></div>
                        }
                    </Link>
                    {movie?.id ? (
                        <AddToWatchlist movie={movie} />
                    ) : (<></>)}
                </div>
                <div className="text">
                    <h3 title={movie.title}><Link to={`/movie/${movie.id}`}>{movie.title ? truncateString(movie.title, 30) : ""}</Link></h3>
                    <p className="description">{movie.overview ? truncateString(movie.overview, 110) : ""}</p>
                    <Container
                        $justify="space-between"
                        $alignitems="center"
                        $direction="row"
                        $padding="0px"
                        $margin="15px 0 0 0"
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