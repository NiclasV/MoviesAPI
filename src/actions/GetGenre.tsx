export  const GetGenre = (input?: string | number): string | number | undefined => {
    const movieGenreList = [
      { label: 'Action', id: 28 },
      { label: 'Adventure', id: 12 },
      { label: 'Animation', id: 16 },
      { label: 'Comedy', id: 35 },
      { label: 'Crime', id: 80 },
      { label: 'Documentary', id: 99 },
      { label: 'Drama', id: 18 },
      { label: 'Family', id: 10751 },
      { label: 'Fantasy', id: 14 },
      { label: 'History', id: 36 },
      { label: 'Horror', id: 27 },
      { label: 'Music', id: 10402 },
      { label: 'Mystery', id: 9648 },
      { label: 'Romance', id: 10749 },
      { label: 'Science Fiction', id: 878 },
      { label: 'TV Movie', id: 10770 },
      { label: 'Thriller', id: 53 },
      { label: 'War', id: 10752 },
      { label: 'Western', id: 37 },
    ];
  
    if (typeof input === 'string') {
      const genre = movieGenreList.find((item) => item.label === input);
      return genre ? genre.id : undefined;
    } else if (typeof input === 'number') {
      const genre = movieGenreList.find((item) => item.id === input);
      return genre ? genre.label : undefined;
    } else {
      return undefined;
    }
  };