import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [ windowSize, setWindowSize ] = useState<{
    width: number
    height: number
  }>({
    width: 0,
    height: 0
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