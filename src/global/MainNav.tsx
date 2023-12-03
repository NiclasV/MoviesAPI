import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useWatchListContext } from "../context/WatchListContext";
import { styled } from "styled-components";
import { Button } from "../components/ui/elements/Button";
import { useThemeContext } from "../context/ThemeContext";
import SvgIcon from "../components/ui/elements/SvgIcon";

const Underline = styled.div`
  position: absolute;
  bottom: -1px;
  height: 3px;
  background: ${(props) => props.theme.primary[500]};
  transition: left .35s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 620px) {
    display: none;
  }
`;

const NavWrap = styled.div`
    display: flex;

    @media (max-width: 620px) {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100dvh;
        z-index: 999;    
        background-color: ${props => props.theme.background[100]};
        padding: 80px 40px; 
        display: flex;
        flex-direction: column;
        align-items: center;
        display: none;

        &.open {
            display: flex;
        }
    }

    .iconbutton {
        display: flex;
        align-items: center;
    }
`;

const StyledNav = styled.nav`
    position: relative;
    
    @media (max-width: 620px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    ul {
        list-style: none;
        height: 100%;
        margin: 0;
        padding: 0;
        height: 50px;
        display: flex; 
        align-items: center;
        margin: 0 10px;

        @media (max-width: 620px) {
            flex-direction: column;
            height: auto;
            margin-bottom: 20px;
        }

        li {
            display: inline-block;
            margin: 0 12px;
            text-transform: uppercase;  

            @media (max-width: 620px) {
                margin: 5px 0;
            }

            a { 
                text-decoration: none;
                position: relative;
                font-size: 15px;
                color: ${(props) => props.theme.primary[500]};
                font-weight: 600;

                @media (max-width: 620px) {
                    font-size: 24px;
                }
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

const Hamburger = styled.div`
    width: 24px;
    height: 17px;
    flex-direction: column;
    justify-content: space-between;
    display: none;
    cursor: pointer;
    @media (max-width: 620px) {
        display: flex;
        margin: 15px 0;
        position: relative;
        z-index: 99999;
    }

    span {
        width: 100%;
        height: 3px;
        background-color: ${props => props.theme.primary[500]};
        transition: transform 0.3s ease-out, opacity 0.25s;
    }
    &:hover {
        span:nth-child(1) {
            transform: translateY(4px);
        }
        span:nth-child(2) {
            opacity: 0;
        }
        span:nth-child(3) {
            transform: translateY(-4px);
        }
    }
    &.open {
        span:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
        }
        span:nth-child(2) {
            opacity: 0; 
        }
        span:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);

        }
    }
`;


const MoonIcon = () => {
    return (
        <SvgIcon viewBox="0 0 24 24" >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </SvgIcon>
    );
}

const SunIcon = () => {
    return (
        <SvgIcon viewBox="0 0 24 24" strokeWidth="2px">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </SvgIcon>
    );
}

export const MainNav = () => {
    const { watchLists } = useWatchListContext();
    const [watchlistMoviesCount, setCount] = useState<number>(0);
    const location = useLocation();
    const [underlineStyle, setUnderlineStyle] = useState({ left: '0px', width: '0px' });
    const navRef = useRef<HTMLElement | null>(null);
    const { themeMode, toggleTheme } = useThemeContext();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (watchLists && watchLists[0]) {
            const moviesCount = watchLists[0].movies?.length;
            setCount(moviesCount ? moviesCount : 0)
        }

    }, [watchLists])

    const handleHamburgerClick = () => {
        setIsOpen(!isOpen);
    };

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
        <>
            <NavWrap className={`${isOpen ? 'open' : ''}`}>
                <StyledNav ref={navRef}>
                    <ul>
                        <li>
                            <NavLink end to="/React-MoviesAPI/" className={({ isActive }) => isActive ? 'active' : ''}>
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
                <div className="iconbutton">
                    <Button
                        $variant="filled"
                        $color="primary"
                        $padding="5px"
                        $rounded="true"
                        onClick={toggleTheme}
                    >
                        {themeMode === "light" ? <MoonIcon /> : <SunIcon />}
                    </Button>
                </div>
            </NavWrap>

            <Hamburger 
                className={`${isOpen ? 'open' : ''}`}
                onClick={handleHamburgerClick}
            >
                <span></span>
                <span></span>
                <span></span>
            </Hamburger>

        </>
    );
}