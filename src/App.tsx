import React, { useEffect, useState } from 'react';
import Movies from './scenes/Movies/Movies';
import Global from './styles/global';
import { Container, Section } from './components/ui/layout/Containers';
import { Button } from './components/ui/elements/Button';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { Header } from './global/Header';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useThemeContext } from './context/ThemeContext';
import { MoviesProvider } from './context/MoviesParamsContext';
import { Movie } from './scenes/Movie/Movie';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';

const App: React.FC = () => {
  const { localGet, localSet } = useLocalStorage();
  const [currentTheme] = useState(localGet('theme') ? localGet('theme') : 'light')
  const { themeMode } = useThemeContext();


  useEffect(() => {
    localSet("theme", currentTheme ? currentTheme : "light")

  }, [currentTheme])

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <div className="App">
      <Router>
        <Header />
          <Global />
            <Routes>
              <Route path="/" element={
                <MoviesProvider>
                  <Movies />
                </MoviesProvider>
              } />                  
              <Route path="/movie/:id" element={
                <MovieProvider>
                  <Movie />
                </MovieProvider>
              } />
            </Routes>
          </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
