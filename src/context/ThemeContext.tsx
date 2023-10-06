import { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ThemeContextProps {
    themeMode: "light" | "dark";
    toggleTheme?: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>({themeMode: "light"}) 

export const ThemeContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { localSet, localGetTheme } = useLocalStorage(); 

    const [themeMode, setThemeMode] = useState<"light" | "dark">(localGetTheme('theme'));

    const toggleTheme = () => {
        setThemeMode(prevThemeMode => prevThemeMode === "light" ? "dark" : "light");
    }

    useEffect(() => {
        localSet("theme", themeMode ? themeMode : "light")
        
      }, [ themeMode ])
    
    return (
      <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
}

export const useThemeContext =  () => {
    const theme = useContext(ThemeContext)

    if(theme === undefined) {
        throw new Error("useThemeContext must be used within ThemeContext")
    }

    return theme;
}