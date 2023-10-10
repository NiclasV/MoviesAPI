import MovieNav from "./parts/MoviesNav";
import MovieGrid from "../../components/MovieGrid";
import { Pagination } from "./parts/Pagination";
import { useMoviesContext } from "../../context/MoviesParamsContext";
import { Section, Container } from "../../components/layout/Containers";

const Movies = () => {
  const { movies } = useMoviesContext()

  return (
    <>
      <Section $variant="pSmall" $justify="center">
        <Container $variant="wide">
          <h1 style={{margin: "10px 0 0 0",}}>Explore movies</h1>    
          <MovieNav />
          <MovieGrid movies={movies}/>
          <Pagination />
        </Container>
      </Section>
    </>
  );
}

export default Movies;
