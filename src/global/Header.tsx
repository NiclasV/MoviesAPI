import React from "react";
import { Container } from "../components/layout/Containers";
import styled from "styled-components";
interface HeaderProps {}

const HeaderStyled = styled.div<HeaderProps>`
    display: flex;
    justify-content: center;
    background-color: ${(props) => props.theme.background[100]}
`;

export const Header: React.FC<HeaderProps> = ({}) => {

    return (
        <HeaderStyled>
            <Container variant="wide" >
                <p>Header stuff</p>
            </Container>
        </HeaderStyled>
    );
}