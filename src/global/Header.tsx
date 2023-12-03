import { Container } from "../components/layout/Containers";
import styled from "styled-components";
import { useThemeContext } from "../context/ThemeContext";
import { Button } from "../components/ui/elements/Button";
import SvgIcon from "../components/ui/elements/SvgIcon";
import { Link } from "react-router-dom";
import { MainNav } from "./MainNav";
interface HeaderProps { }

const HeaderStyled = styled.div<HeaderProps>`
    display: flex;
    justify-content: center;
    background-color: ${(props) => props.theme.background[100]};
    border-bottom: 1px solid ${(props) => props.theme.background[300]};

    .logo {
      position: relative; 
      z-index: 9999;
    }
`;

export const Header = () => {

   return (
      <HeaderStyled>
         <Container $variant="wide" $direction="row" $justify="space-between">
            <div className="logo">
               <Link to={"/React-MoviesAPI/"}><p style={{margin: "0  "}}>Movies'n'Stuff</p></Link>
            </div>
            <Container $padding="0" $direction="row" $justify="flex-end" $align-items="center">
               <MainNav />
            </Container>
         </Container>
      </HeaderStyled>
   );
}     