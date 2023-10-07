import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useMovieContext } from "../../context/MovieContext";
import { Section, Container } from "../../components/layout/Containers";
import styled from "styled-components";


const MovieCardStyled = styled.div`
  background-color: ${props => props.theme.background[100]};
  display: grid;
  grid-template-columns: 0.75fr 1fr;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0px 0px 25px 0px rgba(0,0,0,0.15);

  .text {
    padding: 40px;

  }

  h1 {
    margin-top: 0;
    margin-bottom: 10px;
    color: ${props => props.theme.primary[700]};
    font-size: 52px;
    border-bottom: 2px solid ${props => props.theme.secondary[500]};
  }

  .tagline {
    color: ${props => props.theme.text[200]};
    font-size: 24px;
    margin: 0px 0 20px;
  }

  .overview {
    line-height: 1.7;
    color: ${props => props.theme.text[200]};

  }

  .genres {
    display: flex;

    p {
      font-size: 12px;
      background-color: ${props => props.theme.secondary[500]};
      text-transform: uppercase; 
      color: ${props => props.theme.text[900]};
      padding: 3px 10px;
      font-weight: 700; 
      margin: 0;
      margin-right: 10px;
      border-radius: 10px;
    }
  }
  img {
    max-width: 100%;
    border-right: 5px solid ${props => props.theme.primary[500]};
    display: block;
  }
`;  

export const Movie = () => {
  const { movie } = useMovieContext();


  return (
    <Section variant="pSmall" justify="center">
      <Container variant="standard">
      {movie ? (
        <MovieCardStyled>
          <div>
            <img src={"https://image.tmdb.org/t/p/w780/" + movie.poster_path} /> 
          </div>
          <div className="text">
            <h1>{movie.title}</h1>
            <p className="tagline">{movie?.tagline}</p>
            <div className="genres">
            {movie.genres?.map(genre => (
              <p key={genre.id}>{genre.name}</p>
            ))}
            </div>
            <p className="overview">{movie?.overview}</p>
          </div>
        </MovieCardStyled>
      ) : (
        <p>Loading...</p>
      )}
      </Container>
    </Section>
  );
};
