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

    const removeLocalStorage = (key: string): void => {
        localStorage.removeItem(key)
    }

    return {
        localGet: getLocalStorage,
        localSet: setLocalStorage,
        localRemove: removeLocalStorage, 
        storedVal,
        setValue
    }
}