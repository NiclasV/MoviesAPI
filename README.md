# Movies Project

### Overview

#### This project is a playground for exploring React, TypeScript, styled-components and data fetching using The Movie Database API. It provides an opportunity to experiment with various aspects of modern web development.


### Technologies Used

**React:** The core framework for building the user interface.
**TypeScript:** Enhances code quality and maintainability with static typing.
**styled-components:** Enables the creation of custom, responsive styled components.
**The Movie Database API:** A source of movie-related data for fetching and displaying information.

### Features

- Data Fetching: Utilizes The Movie Database API to retrieve movie data for display.
- Styled Components: Custom styled-components for creating a unique visual experience.
- Dark/Light Mode: Implements a theme switcher using ThemeProvider to offer a dynamic user experience.
- Watchlist: Add movies you want to watch to a "Watchlist"

### Getting Started

    Clone this repository.
    Install dependencies using npm install.
    Create an account on TMDB and get access to a API bearer token and API-key
    Create a .env file in the base of the project and add: 
    - REACT_APP_API_BEARER_TOKEN=*BEARERTOKEN*
    - REACT_APP_API_KEY=*APIKEY*
    Start the development server with npm start.
    ENJOY

### Usage

    Explore different movie data fetched from The Movie Database API.
    Toggle between dark and light themes for a personalized viewing experience.
    Add movies to a watchlist!

### Todo

- ~~Create a global context to store the users preference setting of dark/lightmode, maybe localstorage~~
- ~~Add more pagination functionality~~ (~~prev/next~~ + manual page input)
- Add more controls for sorting and listing the movies, add toggle to show tvseries/movies
- ~~Add URLhandler to the use of searchParams to enable url-sharing which presets the initial fetch~~
- ~~Add variant/color props to button-element for styling to theme-colors~~
- ~~Make each movie linkable for new page with more moviedata~~
- ~~Create some filtration possibilites targeting searchparams, sort-order etc~~
- ~~Create watchlist functionality, adding movies to a watchlist (localStorage)~~
- ~~Create a "Similar to this"-listing while viewing a single movie~~
- ~~Enable dynamic page-titles based of the scenes/pages

#### License

This project is open-source and available under the MIT License.
