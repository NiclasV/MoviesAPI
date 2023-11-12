import { Swiper, SwiperSlide, } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Section, Container } from "./layout/Containers";
import { useMovieContext } from "../context/MovieContext";
import MovieItem from "./MovieItem";
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { GetGenre } from '../actions/GetGenre';
import { Loader } from './ui/elements/Loader';
import { Navigation } from 'swiper/modules';

const SwiperStyled = styled.div`
    width: 100%;
    position: relative;
    overflow: auto;
    padding-bottom: 10px;

    .swiper-button {
        &-prev, &-next {
            width: 50px;
            height: 70px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);    
            z-index: 9;
            color: ${(props) => props.theme.secondary[500]};
            opacity: 0;
            background-color: rgba(0,0,0, .25);
            padding: 10px 5px;
            transition: opacity 0.25s;

            &:after {
                font-size: 50px;
                font-weight 700;
            }

            &-disabled {
                pointer-events: all!important;
                opacity: 0.25!important;
            }
        }
        &-prev {
            left: 5px;
        }
        &-next {
            right: 5px;
        }
    }
    
    .swiper-wrapper {
 
        .swiper-slide {
            height: auto;

            > div {
                height: 100%;
            }
        }
    }
    
    &:hover {
        .swiper-button {
            &-prev, &-next {
                opacity: 1;
            }
        }
    }
`;

export const MovieSlider = () => {
    const { movies, randomizedGenres, moviesLoading } = useMovieContext();
    const [genreString, setGenreString] = useState<String>("");

    useEffect(() => {
        const generateGenreString = () => {
            const gArr: string[] = []; // Define gArr as an array of strings
            randomizedGenres?.forEach((genre) => {
                const genreLabel = GetGenre(genre);
                if (typeof genreLabel === 'string') {
                    gArr.push(genreLabel); // Push the genre label into the array
                }
            });

            const gString: string = gArr.join(" | ");
            setGenreString(gString);
        };

        if (randomizedGenres && randomizedGenres.length > 0) {
            generateGenreString();
        }
    }, [randomizedGenres]);


    return (
        <Section $variant="pStandard">
            <Container $variant="wide">
                <h2 style={{ margin: "0px" }}>More like this</h2>
                <p style={{ margin: "0 0 20px" }}>{genreString}</p>
                {(!movies || moviesLoading) ? (
                    <Loader />
                ) : (
                    <SwiperStyled>
                        <Swiper slidesPerView={5} slidesPerGroup={5} spaceBetween={10} style={{ width: '100%' }} navigation={true} modules={[Navigation]}  >
                            {movies?.map((movie) => (
                                <SwiperSlide key={movie.id}>
                                    <MovieItem movie={movie}></MovieItem>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </SwiperStyled>
                )}
            </Container>
        </Section>
    );
}