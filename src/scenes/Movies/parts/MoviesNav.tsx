import { useEffect, useRef } from "react";
import Dropdown from "../../../components/ui/elements/Dropdown";
import { Container } from "../../../components/layout/Containers";
import { useMoviesContext } from "../../../context/MoviesParamsContext";

const sortByArr = ["Popularity desc", "Popularity asc", "Revenue desc", "Revenue asc", "Releasedate asc", "Releasedate desc"]

const MovieNav = () => {
    const { searchParams, updateSearchParams } = useMoviesContext();
    const searchParamsRef = useRef(searchParams);
    
    // Function to add or update a key-value pair in searchParams
    const addOrUpdateParam = (key: string, value: any) => {
        const newSearchParams = { ...searchParams, [key]: value };
        updateSearchParams(newSearchParams);
    };

    // Create a JSON string representation of searchParams
    const searchParamsString = JSON.stringify(searchParams);

    useEffect(() => {
        // Check if the JSON string representation of searchParams has changed
        if (searchParamsString !== JSON.stringify(searchParamsRef.current)) {
        console.log('searchparams changed');
        // Update the ref to match the current searchParams
        searchParamsRef.current = searchParams;
        }
    }, [searchParamsString]);

    return (
        <Container direction="row" margin="0 0 20px 0" padding="0">
            <Container>
            </Container>
            <Container direction="row" alignitems="center" justify="flex-end" padding="0">
                <p style={{margin: "0px", marginRight: "10px", fontSize: "13px"}}>SORT</p>
                <Dropdown label="Popularity desc" items={sortByArr} onItemClick={(item) => {
                    addOrUpdateParam("test", item)
                }} />
            </Container>
        </Container>
    );
}

export default MovieNav;