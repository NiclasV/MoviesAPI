import { useMovieContext } from "../../context/MovieContext";
import { Section, Container } from "../../components/ui/layout/Containers";
import styled from "styled-components";
import { Button } from "../../components/ui/elements/Button";
import { Link } from "react-router-dom";
import { MovieSlider } from "../../components/MovieSlider";

const MovieCardStyled = styled.div`
  background-color: ${props => props.theme.background[100]};
  display: grid;
  grid-template-columns: 0.75fr 1fr;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0px 0px 25px 0px rgba(0,0,0,0.15);

  .text {
    padding: 40px;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top {

  }
  .bottom {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  h1 {
    margin-top: 0;
    margin-bottom: 10px;
    padding-bottom: 10px;
    color: ${props => props.theme.primary[700]};
    font-size: 46px;
    line-height: 1.3;
    border-bottom: 2px solid ${props => props.theme.secondary[500]};
  }

  .tagline {
    color: ${props => props.theme.text[200]};
    font-size: 24px;
    margin: 0px 0 20px;
  }

  .overview {
    line-height: 1.85;
    font-size: 18px;
    color: ${props => props.theme.text[200]};

  }
  .date {
    margin: 0;
    font-size: 20px;
    color: ${props => props.theme.text[200]}
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

  .rating {
    margin: 0;
    line-height: 1;
    padding: 10px 15px;
    display: inline-flex;
    color: ${(props) => props.theme.text[900]};
    border-radius: 25px;
    font-size: 20px;
    background-color: ${(props) => props.theme.primary[500]};
    text-align: Center;
    align-self: flex-end;
    display: inline-flex;   
    align-items: flex-end;  

    strong {
      margin-right: 3px;
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
        <Container direction="row" margin="0 0 10px 0">
          <Button color="text" size="sm" onClick={() => window.history.back()}>
            <span>Back to movies</span>
          </Button>
        </Container>
        {movie ? (
          <MovieCardStyled>
            <div>
              <img src={"https://image.tmdb.org/t/p/w780/" + movie.poster_path} />
            </div>
            <div className="text">
              <div className="top">
                <h1>{movie.title}</h1>
                <p className="tagline">{movie?.tagline}</p>
                <div className="genres">
                  {movie.genres?.map(genre => (
                    <Link to={`/?with_genres=${genre.id}`} key={genre.id}><p key={genre.id}>{genre.name}</p></Link>
                  ))}
                </div>
                <p className="overview">{movie?.overview}</p>
              </div>
              <div className="bottom">
                <p className="date">{movie.release_date}</p>
                <p className="rating"><strong>{movie.vote_average ? Math.round(movie.vote_average) : ""}</strong> /10</p>
              </div>
            </div>
          </MovieCardStyled>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
      <MovieSlider/>
    </Section>
  );
};
