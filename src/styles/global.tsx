import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    body {
        background-color: ${(props) => props.theme.background[200]};
        color: ${(props) => props.theme.text[300]};
        line-height: 1.7;
        font-family: ${(props) => props.theme.typography.font.main};
    }
    .content {
        min-height: 800px;
    }
    *{
       box-sizing: border-box;
    }

    h1 {
        font-size: ${(props) => props.theme.typography.h1.fontSize};
    }

    h2 {
        font-size: ${(props) => props.theme.typography.h2.fontSize};
    }

    h3 {
        font-size: ${(props) => props.theme.typography.h3.fontSize};
    }

    h4 {
        font-size: ${(props) => props.theme.typography.h4.fontSize};
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

