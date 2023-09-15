import React from "react";
import styled from "styled-components";

interface Button {
    padding?: string;
    variant?: "filled" | "outline";
    color?: "primary" | "secondary" | "text" | "background" | string;
    rounded?: boolean | string;
    weight?: string;
}

export const Button = styled.button<Button>`
    padding: ${({ padding }) => padding ? padding : "10px 20px"};
    cursor: pointer;    
    text-decoration: none;
    color: ${(props) => props.theme.background[100]};
    font-weight: ${({ weight })  => weight ? weight : "700"};
    font-size: 18px;
    border: 2px solid transparent;

    span {
        color: inherit;
    }
    ${({ variant, color, rounded, theme }) => {

        var buttonColor = "";
        var spanColor = "";
        var borderRadius = null;
        switch(color) {
            case "primary":
            buttonColor = theme.primary[500];
            break;
            case "secondary":
            buttonColor = theme.secondary[500];
            break;
            case "text":
            buttonColor = theme.text[100];
            spanColor = theme.background[100];
            break;
            case "background":
            buttonColor = theme.background[100];
            spanColor = theme.text[100]
            break;
            default:
            buttonColor = color ? color : "inherit";
            spanColor = "inherit";
            break;
        }

        switch(rounded) {
            case "true":
            borderRadius = `
                border-top-left-radius: 100px;
                border-top-right-radius: 100px;
                border-bottom-left-radius: 100px;
                border-bottom-right-radius: 100px;
            `;
            break;
            default:
            borderRadius = `border-radius: ${rounded}`;
            break;
        }

        if (variant === "filled") {
            return `
                background-color: ${buttonColor};
                spanColor: ${spanColor};
                ${borderRadius ? borderRadius : ""};
            `;

        } else if(variant === "outline") {
            return `
                background-color: transparent;
                border: 2px solid ${buttonColor};
                color: ${buttonColor};
                ${borderRadius ? borderRadius : ""};
            `;
        } else {
            return ``;
        }
    }};
`;