import { useEffect, useRef } from "react";
import { Container } from "../../../components/layout/Containers";
import { useMoviesContext } from "../../../context/MoviesParamsContext";
import { SortDropdown } from "./SortDropdown";
import { Input } from "../../../components/ui/elements/Input";
import { SearchField } from "./SearchField";

const MovieNav = () => {
   
    return (
        <Container $direction="row" $margin="0 0 20px 0" $padding="0">
            <SearchField />
            <SortDropdown />
        </Container>
    );
}

export default MovieNav;