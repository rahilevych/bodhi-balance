import React, { useEffect } from 'react';

export const useClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  callback: () => void,
  active: boolean = true,
) => {
  useEffect(() => {
    if (!active) return;

    const handleClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [ref, callback, active]);
};
