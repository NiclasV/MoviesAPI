import { ReactNode } from "react";
import { Movie } from "../models/MovieModel";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Section, Container } from "./ui/layout/Containers";

interface MoviesData {
    results?: Movie[];
}

interface MovieSliderProps {
    children?: ReactNode,
    moviesData?: MoviesData | null,
}

export const MovieSlider = ({ moviesData }: MovieSliderProps) => {

    return (
        <Section variant="mSmall">
            {/* <Container variant="standard">
                <h2>Related</h2>
                <Swiper>
                    <SwiperSlide key="1">
                        <p>hej</p>
                    </SwiperSlide>
                    <SwiperSlide key="2">
                        <p>haaa</p>
                    </SwiperSlide>
                </Swiper>
            </Container> */}
        </Section>

    );
}