import React from "react";
import { Container } from "../../../components/ui/layout/Containers";
import Dropdown from "../../../components/ui/elements/Dropdown";
import { useMoviesContext } from "../../../context/MoviesParamsContext";

const sortByArr = ["Popularity desc", "Popularity asc", "Revenue desc", "Revenue asc", "Releasedate asc", "Releasedate desc"]

export const SortDropdown = () => {
    const { searchParams, updateSearchParams } = useMoviesContext();

    // Function to add or update a key-value pair in searchParams
    const addOrUpdateParam = (key: string, value: any) => {
        value = value.toLowerCase().replace(/\s/g, '.')

        var newParams = new URLSearchParams(searchParams)
        
        newParams.set(key, value)
        updateSearchParams(newParams);
    };

    return (
        <Container direction="row" alignitems="center" justify="flex-end" padding="0">
            <p style={{margin: "0px", marginRight: "10px", fontSize: "13px"}}>SORT</p>
            <Dropdown label="Popularity desc" items={sortByArr} onItemClick={(item) => {
                addOrUpdateParam("sort_by", item)
            }} />
        </Container>
    );
}