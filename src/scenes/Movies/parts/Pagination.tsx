import React from "react";
import { Button } from "../../../components/ui/elements/Button";
import { Container } from "../../../components/ui/layout/Containers";

interface PaginationProps {
    searchParams?: URLSearchParams,
    onPageChange: (newPage: number) => void; // Callback function to notify parent
}

export const Pagination: React.FC<PaginationProps> = ({ searchParams, onPageChange }) => {
    var currentPage = searchParams?.get("page") ? parseInt(searchParams.get('page')!, 10) : 1;

    const nextPage = () => {
        const newPage = currentPage + 1;
        onPageChange(newPage); // Notify parent component of the new page
    };

    const prevPage = () => {
        const newPage = currentPage - 1;
        if (newPage > 0) {
            onPageChange(newPage); // Notify parent component of the new page
        }
        return
    };

    return (
        <Container direction="row" justify="center" margin="40px 0">
            <Button onClick={prevPage}
                padding="5px 15px"
                variant="filled"
                color="text"
                rounded="10px"
                size="md"
                weight="700"
                inactive={currentPage < 2 ? "true" : "false"}
            >Prev</Button>
            <p style={{margin: "10px 20px", fontSize: "34px", fontWeight: "700"}}>{currentPage}</p>
            <Button
                onClick={nextPage}
                padding="5px 15px"
                variant="filled"
                color="text"
                rounded="10px"
                size="md"
                weight="700"

            >Next</Button>
        </Container>
    );
}