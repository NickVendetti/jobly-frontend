import { useState, useEffect } from "react";

/** useLocalStorage Hook
 * 
 * This keeps a piece of state synced with localStorage.
 * Automatically saves changes to localStorage.
 */
function useLocalStorage(key, initialValue = null) {
  const [storedValue, setStoredValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(
    () => {
      if (storedValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, storedValue);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
