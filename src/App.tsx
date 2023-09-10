import React, { useState } from 'react';
import Movies from './scenes/Movies/Movies';
import Global from './styles/global';
import { Container , Section } from './components/layout/Containers';
import { Button } from './components/elements/Button';
import { ThemeProvider  } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { Header } from './global/Header';

const App:React.FC = () => {
  const [theme, setTheme] = useState("light");

  const toggleNightmode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
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
