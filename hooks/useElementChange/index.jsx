import { useState, useEffect } from 'react';

export default function useElementChange(el) {
  // Initialize state with undefined width/height so server and client renders match
  const [size, setSize] = useState({
    top: 'unset',
    right: 'unset',
    bottom: 'unset',
    left: 'unset',
    x: 0,
    y: 0,
    width: 'auto',
    height: 'auto',
  });
  useEffect(() => {
    if (el) {
      // Handler to call on element change
      function handlerChange() {
        const rect = el.getBoundingClientRect();
        const { top, right, bottom, left, width, height, x, y } = rect;
        // Set element size to state
        setSize({
          top,
          right,
          bottom,
          left,
          width,
          height,
          x,
          y,
        });
      }
      // Add event listener
      el.addEventListener('change', handlerChange);
      window.addEventListener('resize', handlerChange);
      // Call handler right away so state gets updated with initial window size
      handlerChange();
      // Remove event listener on cleanup
      return function cleanup() {
        el.removeEventListener('change', handlerChange);
        window.removeEventListener('resize', handlerChange);
      };
    }
  }, [el]); // Empty array ensures that effect is only run on mount
  return size;
}
