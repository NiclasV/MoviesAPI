    import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
    import { MovieFull } from '../models/MovieModel';
    import { useLocalStorage } from '../hooks/useLocalStorage';

    interface WatchListItem {
        label: string;
        movies: MovieFull[] | null;
    }

    // Define the initial context value
    interface WatchListContextProps {
        watchLists: WatchListItem[] | null;
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

        useEffect(() => {
            const storedWatchLists = localGet('watchlists');
        
            // Function to handle circular references
            function getCircularReplacer() {
                const seen = new WeakSet();
                return (value: any) => {
                    if (typeof value === "object" && value !== null) {
                        if (seen.has(value)) {
                            return;
                        }
                        seen.add(value);
                    }
                    return value;
                };
            }
        
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
                localSet('watchlists', JSON.stringify([defaultWatchList], getCircularReplacer())); // Use the replacer function
            }
        }, []);
        
        return (
            <WatchListContext.Provider value={{ watchLists }}>
                {children}
            </WatchListContext.Provider>
        );
    };