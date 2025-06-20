import { useState, useEffect } from 'react';

export function useFetch(url, options = {}) {
  // State management for fetch operation
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Don't fetch if no URL provided
    if (!url) {
      setLoading(false);
      return;
    }

    // Create AbortController for cleanup
    const abortController = new AbortController();
    
    // Reset states at start of fetch
    setLoading(true);
    setError(null);
    setData(null);

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal
        });

        // Check if response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        // Only update state if not aborted
        if (!abortController.signal.aborted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        // Don't set error if request was aborted
        if (!abortController.signal.aborted) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function - abort fetch on unmount or dependency change
    return () => {
      abortController.abort();
    };
  }, [url, JSON.stringify(options)]); // Re-run when URL or options change

  return { data, loading, error };
}