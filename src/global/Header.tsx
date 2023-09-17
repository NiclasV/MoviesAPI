import React from "react";
import { Container } from "../components/ui/layout/Containers";
import styled from "styled-components";
import { useThemeContext } from "../context/ThemeContext";
import MoonSvg from "../assets/svg/moon.svg";
import SunSvg from "../assets/svg/sun.svg";
import { Button } from "../components/ui/elements/Button";
import SvgIcon from "../components/ui/elements/SvgIcon";
interface HeaderProps { }

const HeaderStyled = styled.div<HeaderProps>`
    display: flex;
    justify-content: center;
    background-color: ${(props) => props.theme.background[100]}
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

export const Header: React.FC<HeaderProps> = ({ }) => {
   const { themeMode, toggleTheme } = useThemeContext();

   return (
      <HeaderStyled>
         <Container variant="wide" direction="row" justify="space-between">
            <p>Header stuff</p>
            <Button 
               variant="filled"
               color="primary" 
               padding="5px"
               rounded="true"
               onClick={toggleTheme}
               >
               {themeMode === "light" ? <MoonIcon/> : <SunIcon/>}
            </Button>
         </Container>
      </HeaderStyled>
   );
}     