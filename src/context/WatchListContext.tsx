import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { Movie } from '../models/MovieModel';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { NotificationsContext } from './NotificationsContext';

interface WatchListItem {
    label: string;
    movies: Movie[] | null;
}

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
    const { addNotification } = useContext(NotificationsContext);

    const addToWatchlist = (movie: Movie) => {
        if (watchLists) {
            const updatedWatchLists = [...watchLists];
            updatedWatchLists[0].movies?.push(movie);
            addNotification(`Added ${movie.title} to watchlist`);

            setWatchLists(updatedWatchLists);
            localSet('watchlists', JSON.stringify(updatedWatchLists)); 
        }
    }

    const removeFromWatchlist = (id: number) => {
        if (watchLists) {
            const updatedWatchLists: WatchListItem[] = watchLists.map((watchList) => {
                const updatedMovies = watchList.movies?.filter((movie) => movie.id !== id);
                const theMovie = watchList.movies?.find((mov) => mov.id == id); 

                addNotification(`Removed ${theMovie?.title} from watchlist`);

                return { ...watchList, movies: updatedMovies || null }; 
            });
            
            setWatchLists(updatedWatchLists);
            localSet('watchlists', JSON.stringify(updatedWatchLists)); 
        }
    }

    useEffect(() => {
        const storedWatchLists = localGet('watchlists');

        if (storedWatchLists) {
            setWatchLists(JSON.parse(storedWatchLists));
        } else {
            const defaultWatchList: WatchListItem = {
                label: 'Movies to watch',
                movies: [], 
            };
          
            setWatchLists([defaultWatchList]);
            localSet('watchlists', JSON.stringify([defaultWatchList])); // Use the replacer function
        }
    }, []);


    return (
        <WatchListContext.Provider value={{ watchLists, addToWatchlist, removeFromWatchlist }}>
            {children}
        </WatchListContext.Provider>
    );
};