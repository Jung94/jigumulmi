import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [ windowSize, setWindowSize ] = useState<{
    width: number
    height: number
  }>({
    width: window.innerWidth ?? 0,
    height: window.innerHeight ?? 0
  });

  const updateWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowSize);
    
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;