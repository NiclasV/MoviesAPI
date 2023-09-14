import React, { useEffect, useState } from 'react';
import Movies from './scenes/Movies/Movies';
import Global from './styles/global';
import { Container , Section } from './components/layout/Containers';
import { Button } from './components/elements/Button';
import { ThemeProvider  } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { Header } from './global/Header';
import { useLocalStorage } from './hooks/useLocalStorage';

const App:React.FC = () => {
  const { localGet, localSet } = useLocalStorage(); 
  const [ currentTheme, setTheme ] = useState(localGet('theme') ? localGet('theme') : 'light')

  const toggleNightmode = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light')
  };

  useEffect(() => {
    localSet("theme", currentTheme ? currentTheme : "light")
    
  }, [ currentTheme ])

  return (
    <ThemeProvider theme={currentTheme === "light" ? lightTheme : darkTheme}>
      <div className="App">
        <Header />
        <Section variant="pStandard" justify="center">
          <Container variant="wide">
            <Global />
            <Button variant="primary" onClick={toggleNightmode}>
              <span>ToggleNightMode</span>
            </Button>
            <Movies />
          </Container>
        </Section>
      </div>
    </ThemeProvider>
  );
}

export default App;
