import { Container, Section } from "../../components/layout/Containers";
import avatarUrl from "../../assets/avatar.png";
import { Avatar } from "../../components/ui/elements/Avatar";

export const About = () => {
    return (
        <Section $variant="mSmall">
            <Container $variant="standard" $justify="space-between" $direction="row" $alignitems="flex-start">
                <Container $width="35%" $padding="40px 0 0">
                    <Avatar imageUrl={avatarUrl} width="120px" />
                </Container>
                <Container $width="60%">
                    <div className="text-block">
                        <h1>About the project</h1>
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
            </Container>
        </Section>
    );
}