// src/hooks/useLocalStorage.js
import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  // Step 1: Get initial value from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error, return initialValue
      console.log(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Step 2: Create setValue function that updates both state and localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save to state
      setStoredValue(valueToStore);
      
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}