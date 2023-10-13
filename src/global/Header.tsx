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
    border-bottom: 1px solid ${(props) => props.theme.background[300]}
`;

const MoonIcon = () => {
   return (
      <SvgIcon viewBox="0 0 24 24" >
         <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </SvgIcon>
   );
}

const SunIcon = () => {
   return (
      <SvgIcon viewBox="0 0 24 24" strokeWidth="2px">
         <circle cx="12" cy="12" r="5"></circle>
         <line x1="12" y1="1" x2="12" y2="3"></line>
         <line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
         <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line>
         <line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
         <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>      
      </SvgIcon>
   );
}

export const Header = () => {
   const { themeMode, toggleTheme } = useThemeContext();

   return (
      <HeaderStyled>
         <Container $variant="wide" $direction="row" $justify="space-between">
            <Link to={"/"}><p style={{margin: "0  "}}>Movies'n'Stuff</p></Link>
            <Container $padding="0" $direction="row" $justify="flex-end" $align-items="center">
               <MainNav />
               <Button 
                  $variant="filled"
                  $color="primary" 
                  $padding="5px"
                  $rounded="true"
                  onClick={toggleTheme}
                  >
                  {themeMode === "light" ? <MoonIcon/> : <SunIcon/>}
               </Button>
            </Container>
         </Container>
      </HeaderStyled>
   );
}     