import { useEffect, useRef } from "react";
import { Container } from "../../../components/ui/layout/Containers";
import { useMoviesContext } from "../../../context/MoviesParamsContext";
import { SortDropdown } from "./SortDropdown";


const MovieNav = () => {
    const { searchParams } = useMoviesContext();
    const searchParamsRef = useRef(searchParams);
    
    // Create a JSON string representation of searchParams
    const searchParamsString = JSON.stringify(searchParams);

    useEffect(() => {
        // Check if the JSON string representation of searchParams has changed
        if (searchParamsString !== JSON.stringify(searchParamsRef.current)) {
        // Update the ref to match the current searchParams
        searchParamsRef.current = searchParams;
        }
    }, [searchParamsString, searchParams]);

    return (
        <Container direction="row" margin="0 0 20px 0" padding="0">
            <Container>
            </Container>
            <SortDropdown />
        </Container>
    );
}

export default MovieNav;