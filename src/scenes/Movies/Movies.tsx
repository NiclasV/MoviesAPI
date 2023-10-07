import React, { useEffect, useRef, useState } from "react";
import GetData from "../../data/GetData";
import MovieNav from "./parts/MoviesNav";
import MovieGrid from "./parts/MovieGrid";
import { Pagination } from "./parts/Pagination";
import { useMoviesContext } from "../../context/MoviesParamsContext";
import { useFetch } from "../../hooks/useFetch";
import { Section, Container } from "../../components/layout/Containers";

const Movies = () => {
  const { fetchUrl } = useMoviesContext()
  const { data } = useFetch(fetchUrl);

  return (
    <>
    <Section variant="pStandard" justify="center">
      <Container variant="wide">
        <MovieNav />
        <MovieGrid moviesData={data} />
        <Pagination />
      </Container>
    </Section>
    </>
  );
}

export default Movies;
