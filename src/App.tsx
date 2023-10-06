import React, { useEffect, useState } from 'react';
import Movies from './scenes/Movies/Movies';
import Global from './styles/global';
import { Container , Section } from './components/ui/layout/Containers';
import { Button } from './components/ui/elements/Button';
import { ThemeProvider  } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { Header } from './global/Header';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useThemeContext } from './context/ThemeContext';
import { MoviesProvider } from './context/MoviesParamsContext';

const App:React.FC = () => {
  const { localGet, localSet } = useLocalStorage(); 
  const [ currentTheme, setTheme ] = useState(localGet('theme') ? localGet('theme') : 'light')
  const { themeMode } = useThemeContext();

  const toggleNightmode = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light')
  };

  useEffect(() => {
    localSet("theme", currentTheme ? currentTheme : "light")
    
  }, [ currentTheme ])

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <div className="App">
        <Header />
        <Section variant="pStandard" justify="center">
          <Container variant="wide">
            <Global />
            <MoviesProvider>
              <Movies />
            </MoviesProvider>
          </Container>
        </Section>
      </div>
    </ThemeProvider>
  );
}

export default App;
