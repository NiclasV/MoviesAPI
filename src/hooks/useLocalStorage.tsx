import { useState } from "react"

interface localStorageProps {
    key?: string,
    value?: string,
}

export const useLocalStorage = ({key, value}: localStorageProps = {}) => {

    const [storedVal, setStoredVal] = useState(()  => {
        try {
            const item = key ? localStorage.getItem(key) : null;
            return item ? JSON.parse(item) : value;
        } catch (error) {
            console.log("error retreiving from localStorage")
            return value;
        }
    })

    const setValue = (setKey: string, value: string) => {
        try {
          localStorage.setItem(setKey, JSON.stringify(value));
          setStoredVal(value);
        } catch (error) {
          console.error('Error storing in localStorage:', error);
        }
      };

    const setLocalStorage = (key: string, value: string): void => {
        localStorage.setItem(key, value)
    }
    
    const getLocalStorage = (key: string): string | null => {
        var val = localStorage.getItem(key);
        return val !== null ? val : null;
    }

    const getLocalTheme = (key: "theme"): "light" | "dark" => {
        var res = localStorage.getItem(key);
        
        if (res === "light" || res === "dark") { // Check if the value is "light" or "dark"
            return res;
        } else {
            localStorage.setItem("theme", "light");
            return "light";
        }
    }

    const removeLocalStorage = (key: string): void => {
        localStorage.removeItem(key)
    }

    return {
        localGet: getLocalStorage,
        localSet: setLocalStorage,
        localGetTheme: getLocalTheme,
        localRemove: removeLocalStorage, 
        storedVal,
        setValue
    }
}