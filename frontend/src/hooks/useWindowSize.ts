import { useEffect, useState } from 'react';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    window: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({ window: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);
  return windowSize;
};
