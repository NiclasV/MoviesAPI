import { styled } from "styled-components";
import { Container } from "../components/layout/Containers";

const StyledFooter = styled.footer`
    background-color: ${props => props.theme.background[100]};
    padding: 40px 0;
    display: flex;
    justify-content: center;
    border-top: 1px solid ${(props) => props.theme.background[300]};
    min-height: 240px;

    .text-block {
        max-width: 860px;
        font-size: 13px;
        color: ${props => props.theme.background[600]};
        text-align: center;
        strong {
            color: ${props => props.theme.background[700]};
        }
    }
`;

export const Footer = () => {
    return (
        <StyledFooter>
            <Container $variant="wide" $direction="row">
               
            </Container>
        </StyledFooter>
    );
}