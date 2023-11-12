import { styled } from "styled-components";
import { Container } from "../components/layout/Containers";
import SvgIcon from "../components/ui/elements/SvgIcon";
import { Button } from "../components/ui/elements/Button";
import { Link } from "react-router-dom";

const LinkedinIcon = () => {
    return (
        <SvgIcon viewBox="0 0 24 24" strokeWidth="2px" width="20" height="20">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
        </SvgIcon>
    );
}

const StyledFooter = styled.footer`
    background-color: ${props => props.theme.background[100]};
    padding: 40px 0;
    display: flex;
    justify-content: center;
    border-top: 1px solid ${(props) => props.theme.background[300]};
    min-height: 240px;
    margin-top: 60px;
    
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
            <Container $variant="wide" $justify="flex-end"  >
                <Link to={"https://www.linkedin.com/in/niclas-viktorsson-3b03713a/"} target="_blank" title="Connect on Linkedin">
                    <Button
                        $variant="filled"
                        $color="primary"
                        $padding="2px"
                        $rounded="4px"
                    >
                        <LinkedinIcon />
                    </Button>
                </Link>
                <p style={{ margin: "10px 0px 0px 0px", fontSize: "14px" }}><strong>Project by:</strong>     Niclas Viktorsson</p>

            </Container>
        </StyledFooter>
    );
}