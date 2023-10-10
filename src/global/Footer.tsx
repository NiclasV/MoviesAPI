import { styled } from "styled-components";
import { Container } from "../components/layout/Containers";

const StyledFooter = styled.footer`
    background-color: ${props => props.theme.background[100]};
    padding: 40px 0;
    display: flex;
    justify-content: center;
    border-top: 1px solid ${(props) => props.theme.background[300]};

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
                <div className="text-block">
                    <p><strong>Movies'n'Stuff</strong> is a React and TypeScript hobby project aimed at learning and applying various web development concepts.<br/>
                        The project relies on <a href="https://www.themoviedb.org/" rel="noreferrer">The Movie Database API</a> for comprehensive movie data.</p>

                    <p>Additionally, it serves as a practical learning ground for implementing styled-components.
                        This not only enhances the styling but also provides hands-on experience in building custom,
                        reusable components—an essential skill for potential future endeavors, such as creating a dedicated component library.
                        Explore "Movies'n'Stuff" as I navigate the world of web development and enhance my skills.</p>
                    <p>
                    You'll also have the opportunity to experiment with a light and dark theme-setting feature. 
                    This feature allows you to dynamically switch the color scheme to the one you prefer, 
                    adding an extra layer of user customization and enhancing the overall look and feel of the application. 
                    </p>
                        <p>Project by: <a href="https://github.com/NiclasV" rel="noreferrer" target="_blank"><strong>Niclas Viktorsson</strong></a></p>
                </div>
            </Container>
        </StyledFooter>
    );
}