import { Container } from "../../../components/layout/Containers";
import { Input } from "../../../components/ui/elements/Input";
import { useMoviesContext } from "../../../context/MoviesParamsContext";

export const SearchField = () => {
    const { updateSearchQuery} = useMoviesContext();

    return (
        <Container $justify="flex-start" $direction="row" $padding="0px">
            <Input type="text" placeholder="Search for a movie" onChange={(event) => updateSearchQuery(event.target.value)}></Input>
        </Container>
    );
}