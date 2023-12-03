import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    body {
        background-color: ${(props) => props.theme.background[200]};
        color: ${(props) => props.theme.text[300]};
        line-height: 1.7;
        font-family: ${(props) => props.theme.typography.font.main};
    }
    .content {
        min-height: 70vh;
    }
    *{
       box-sizing: border-box;
    }

    h1 {
        font-size: clamp(16px, calc(${(props) => props.theme.typography.h1.fontSizeMin}px + (${(props) => props.theme.typography.h1.fontSize} - ${(props) => props.theme.typography.h1.fontSizeMin}) * (100vw - 768px)/(1920 - 768)), 48px);
        }

    h2 {
        font-size: clamp(16px, calc(${(props) => props.theme.typography.h2.fontSizeMin}px + (${(props) => props.theme.typography.h2.fontSize} - ${(props) => props.theme.typography.h2.fontSizeMin}) * (100vw - 768px)/(1920 - 768)), 48px);
    }

    h3 {
        font-size: clamp(16px, calc(${(props) => props.theme.typography.h3.fontSizeMin}px + (${(props) => props.theme.typography.h3.fontSize} - ${(props) => props.theme.typography.h3.fontSizeMin}) * (100vw - 768px)/(1920 - 768)), 48px);
    }

    h4 {
        font-size: clamp(16px, calc(${(props) => props.theme.typography.h4.fontSizeMin}px + (${(props) => props.theme.typography.h4.fontSize} - ${(props) => props.theme.typography.h4.fontSizeMin}) * (100vw - 768px)/(1920 - 768)), 48px);
    }

    h1, h2, h3, h4, h5 {
        color: ${(props) => props.theme.text[200]};
        font-family: ${(props) => props.theme.typography.font.header};
        margin: 20px 0;

        a {
            text-decoration: none;
        }
    }

    a {
        color: inherit;

        &:hover {
            color: ${(props) => props.theme.primary[500]}
        }
    }


`

