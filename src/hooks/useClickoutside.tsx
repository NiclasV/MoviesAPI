import { useEffect } from 'react';

function useClickoutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: (event: MouseEvent) => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Unbind the event listener on cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

export default useClickoutside;