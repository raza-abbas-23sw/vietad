import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Show loading for at least 1 second

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return isLoading;
}; 