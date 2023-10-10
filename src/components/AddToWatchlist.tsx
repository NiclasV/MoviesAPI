import { styled } from "styled-components";
import SvgIcon from "./ui/elements/SvgIcon";
import { useWatchListContext } from "../context/WatchListContext";
import { Button } from "./ui/elements/Button";
import { useEffect, useState } from "react";
import { Movie } from "../models/MovieModel";

const WatchIcon = () => {
    return (
        <SvgIcon viewBox="0 0 24 24" fill="none" strokeWidth="2px" width="24px" height="24px">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>
        </SvgIcon>
    );
}

const UnWatchIcon = () => {
    return (
        <SvgIcon viewBox="0 0 24 24" fill="none" strokeWidth="2px" width="24px" height="24px">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>
        </SvgIcon>
    );
}

interface WatchlistProps {
    movie: Movie;
}

const StyledWatchListButton = styled.div`
    position: relative;
    color: ${(props) => props.theme.secondary[500]};

    button {
        opacity: 0.55;
        &:hover {
            opacity: 1;
        }
    }
`;
export const AddToWatchlist = ({ movie }: WatchlistProps) => {
    const { watchLists, addToWatchlist, removeFromWatchlist } = useWatchListContext();
    const [matchStatus, setMatch] = useState<Boolean | undefined>(false)

    useEffect(() => {
        if (watchLists) {
            const isIdMatching = watchLists[0]?.movies?.some(obj => obj.id === movie.id);
            setMatch(isIdMatching)
        }
    }, [watchLists, movie])

    return (
        <StyledWatchListButton className="addToWatchlist">
            <div></div>
            {matchStatus ? (
                <Button $padding="4px" $variant="filled" $color="secondary" $rounded="true" title="Remove from Watchlist" onClick={() => removeFromWatchlist(movie.id ? movie.id : 0)}>
                    <UnWatchIcon />
                </Button>
            ) : (
                <Button $padding="4px" $variant="filled" $color="secondary" $rounded="true" title="Add to Watchlist" onClick={() => addToWatchlist(movie)}>
                    <WatchIcon />
                </Button>
            )}

        </StyledWatchListButton>
    );
}