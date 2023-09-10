import React from "react";
import styled from "styled-components";

interface Button {
    padding?: string;
    variant?: "primary" | "secondary" | "outline" | "";
}

export const Button = styled.button<Button>`
    padding: ${({ padding }) => padding ? padding : "10px 20px"};
    border: 1px solid black;
    cursor: pointer;    
    text-decoration: none;
    background-color: transparent;
    border
`;