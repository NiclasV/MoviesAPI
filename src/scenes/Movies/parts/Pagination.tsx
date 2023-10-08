import React from "react";
import { Button } from "../../../components/ui/elements/Button";
import { Container } from "../../../components/ui/layout/Containers";
import { useMoviesContext } from "../../../context/MoviesParamsContext";



export const Pagination = () => {
    const { searchParams, updateSearchParams } = useMoviesContext();  
    const pageParam = searchParams?.get("page");
    const currentPage = pageParam ? parseInt(pageParam) : 1;
    
    const nextPage = () => {
        var newPage = currentPage + 1;
        const newParams = new URLSearchParams(searchParams);

        newParams.set("page", String(newPage))
        updateSearchParams(newParams)

    };

    const prevPage = () => {

        if (currentPage === 1) {
            return
        }
        
        var newPage = currentPage - 1;
        const newParams = new URLSearchParams(searchParams);

        if (newPage > 0) {
            newParams.set("page", String(newPage))
            updateSearchParams(newParams)
        }
        return
    };

    return (
        <Container direction="row" justify="center" margin="40px 0">
            <Button onClick={prevPage}
                variant="filled"
                color="text"
                rounded="5px"
                size="md"
                weight="700"
                inactive={currentPage < 2 ? "true" : "false"}
            ><span>Prev</span></Button>
            <p style={{margin: "10px 20px", fontSize: "34px", fontWeight: "700"}}>{currentPage}</p>
            <Button
                onClick={nextPage}
                variant="filled"
                color="text"
                rounded="5px"
                size="md"
                weight="700"
            ><span>Next</span></Button>
        </Container>
    );
}