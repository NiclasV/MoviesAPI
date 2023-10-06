import React from "react";
import styled from "styled-components";

interface Button {
    padding?: string;
    variant?: "filled" | "outline";
    color?: "primary" | "secondary" | "text" | "background" | string;
    rounded?: boolean | string;
    weight?: string;
    inactive?: "true" | "false";
    size?: "sm" | "md" | "lg" | "xl";
}

export const Button = styled.button<Button>`
    padding: ${({ padding }) => padding ? padding : "6px 16px"};
    cursor: pointer;    
    text-decoration: none;
    color: ${(props) => props.theme.background[100]};
    font-weight: ${({ weight })  => weight ? weight : "500"};
    font-size: 18px;
    border: 2px solid transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: filter 0.15s;
    background: transparent;
    text-transform: uppercase;

    ${({inactive}) => {
        if(inactive === "true") {
            return `opacity: 0.5; pointer-events: none;`;
        }
    }}
    ${({size}) => {
        if(size && size === "sm") {
            return `font-size: 14px;`;
        }
        if(size && size === "md") {
            return `font-size: 16px;`;
        }
        if(size && size === "lg") {
            return `font-size: 20px;`;
        }
        if(size && size === "xl") {
            return `font-size: 24px`;
        }
    }}
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
                border: 1px solid ${buttonColor};
                color: ${buttonColor};
                ${borderRadius ? borderRadius : ""};
            `;
        } else {
            return ``;
        }
    }};

    &:hover {
        filter: brightness(110%);
        
    }
`;