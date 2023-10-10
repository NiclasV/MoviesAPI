import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { Movie } from '../models/MovieModel';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface WatchListItem {
    label: string;
    movies: Movie[] | null;
}

// Define the initial context value
interface WatchListContextProps {
    watchLists: WatchListItem[] | null;
    addToWatchlist: (novie: Movie) => void;
    removeFromWatchlist: (id: number) => void;
}

const WatchListContext = createContext<WatchListContextProps | undefined>(undefined);

export const useWatchListContext = () => {
    const context = useContext(WatchListContext);

    if (!context) {
        throw new Error('useWatchListContext must be used within a WatchListProvider');
    }
    return context;
};

export const WatchListProvider = ({ children }: PropsWithChildren) => {
    const { localGet, localSet } = useLocalStorage();
    const [watchLists, setWatchLists] = useState<WatchListItem[] | null>(null);

    const addToWatchlist = (movie: Movie) => {
        if (watchLists) {
            // Create a new array with the updated data
            const updatedWatchLists = [...watchLists];
            updatedWatchLists[0].movies?.push(movie);
    
            // Update the state and local storage
            setWatchLists(updatedWatchLists);
            localSet('watchlists', JSON.stringify(updatedWatchLists)); // Use the replacer function
        }
    }

    const removeFromWatchlist = (id: number) => {
        if (watchLists) {
            // Create a new array without the movie with the specified id
            const updatedWatchLists: WatchListItem[] = watchLists.map((watchList) => {
                const updatedMovies = watchList.movies?.filter((movie) => movie.id !== id);
                return { ...watchList, movies: updatedMovies || null }; // Use null as the default if updatedMovies is undefined
            });
    
            // Update the state and local storage
            setWatchLists(updatedWatchLists);
            localSet('watchlists', JSON.stringify(updatedWatchLists)); // Use the replacer function
        }
    }

    useEffect(() => {
        const storedWatchLists = localGet('watchlists');

        if (storedWatchLists) {
            // If watchlists exist in local storage, use them
            setWatchLists(JSON.parse(storedWatchLists));
        } else {
            // If no watchlists in local storage, create a default watchlist
            const defaultWatchList: WatchListItem = {
                label: 'Movies to watch',
                movies: [], // Initialize with an empty array
            };
          
            setWatchLists([defaultWatchList]);

            // Save the default watchlist to local storage
            localSet('watchlists', JSON.stringify([defaultWatchList])); // Use the replacer function
        }
    }, []);


    return (
        <WatchListContext.Provider value={{ watchLists, addToWatchlist, removeFromWatchlist }}>
            {children}
        </WatchListContext.Provider>
    );
};