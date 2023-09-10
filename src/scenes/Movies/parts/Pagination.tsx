import React from "react";

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

    return (
        <div>
            <p>{currentPage}</p>
            <button onClick={nextPage}>Next page</button>
        </div>
    );
}