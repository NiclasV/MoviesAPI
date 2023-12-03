import { Section, Container } from "../../components/layout/Containers";
import { MovieSlider } from "../../components/MovieSlider";
import { MovieCard } from "./parts/MovieCard";

export const Movie = () => {

  return (
    <Section $variant="pSmall" $justify="center">
      <Container $variant="standard">
        <MovieCard/>
      </Container>
      <MovieSlider />

    </Section>

  );
};
