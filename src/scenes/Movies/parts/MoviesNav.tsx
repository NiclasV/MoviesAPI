import React, { useState } from "react";
import Dropdown from "../../../components/ui/elements/Dropdown";
import { Container } from "../../../components/layout/Containers";

const sortByArr = ["Popularity desc", "Popularity asc", "Revenue desc", "Revenue asc", "Releasedate asc", "Releasedate desc"]

interface MovieNavProps {
    handleParamChange: (key: string, value: string | number) => void;
}

const MovieNav = ({ handleParamChange }: MovieNavProps) => {
    return (
        <Container direction="row" margin="0 0 20px 0" padding="0">
            <Container>
                
            </Container>
            <Container direction="row" alignitems="center" justify="flex-end" padding="0">
                <p style={{margin: "0px", marginRight: "10px"}}>Sort by</p>
                <Dropdown label="Popularity desc" items={sortByArr} />
            </Container>
        </Container>
    );
}

export default MovieNav;