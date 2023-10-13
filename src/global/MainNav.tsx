import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useWatchListContext } from "../context/WatchListContext";
import { styled } from "styled-components";

const Underline = styled.div`
  position: absolute;
  bottom: -1px;
  height: 3px;
  background: ${(props) => props.theme.primary[500]};
  transition: left .35s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const StyledNav = styled.nav`
    position: relative;

    ul {
        list-style: none;
        height: 100%;
        margin: 0;
        padding: 0;
        height: 50px;
        display: flex; 
        align-items: center;
        margin: 0 10px;

        li {
            display: inline-block;
            margin: 0 12px;
            text-transform: uppercase;  

            a { 
                text-decoration: none;
                position: relative;
                font-size: 15px;
                color: ${(props) => props.theme.primary[500]};
                font-weight: 600;

                .count {
                    position: absolute;
                    top: -4px;
                    right: -8px;
                    width: 20px;
                    height: 15px;
                    border-radius: 50px 50px 50px 50px;
                    background-color: ${(props) => props.theme.secondary[500]};
                    color: ${(props) => props.theme.text[900]};
                    display: flex;
                    justify-content: centeR;
                    align-items: center;
                    font-size: 10px;
                    font-weight: 600;
                }

                &:hover {
                    color: ${(props) => props.theme.primary[600]};
                }
            }
        }
    }
`;


export const MainNav = () => {
    const { watchLists } = useWatchListContext();
    const [watchlistMoviesCount, setCount] = useState<number>(0);
    const location = useLocation();
    const [underlineStyle, setUnderlineStyle] = useState({ left: '0px', width: '0px' });
    const navRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (watchLists && watchLists[0]) {
            const moviesCount = watchLists[0].movies?.length;
            setCount(moviesCount ? moviesCount : 0)
        }

    }, [watchLists])
    
    useEffect(() => {
        const calculateUnderline = () => {
            if (navRef.current) {
              const activeElement: HTMLElement = navRef.current.querySelector('.active') as HTMLElement;
              if (activeElement) {
                setUnderlineStyle({ left: `${activeElement.offsetLeft}px`, width: `${activeElement.offsetWidth}px` });
              }
            }
          };
          setTimeout(calculateUnderline, 0);
    }, [location]);

    return (
        <StyledNav ref={navRef}>
            <ul>
                <li>
                    <NavLink end to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                        Movies
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/watchlists" className={({ isActive }) => isActive ? 'active' : ''}>
                        Watchlist<span className="count">{watchlistMoviesCount}</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                        About
                    </NavLink>
                </li>
            </ul>
            <Underline style={underlineStyle} />
        </StyledNav>
    );
}