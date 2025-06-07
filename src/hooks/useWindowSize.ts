import * as React from "react";

/**
 * A React custom hook that returns the current window size.
 *
 * This hook listens for window resize events and updates the returned
 * width and height values accordingly. It uses `useLayoutEffect` to
 * ensure the size is updated synchronously after DOM mutations.
 *
 * @returns An object containing the current `width` and `height` of the window.
 *
 * @example
 * const { width, height } = useWindowSize();
 * console.log(`Window size: ${width}x${height}`);
 */
export default function useWindowSize() {
  const [size, setSize] = React.useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight
  });
  React.useLayoutEffect(() => {
    const handler = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    handler();
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);
  return size;
}