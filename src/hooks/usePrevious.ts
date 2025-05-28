import * as React from "react";

/**
 * A custom React hook that tracks and returns the previous value of a given input.
 *
 * @param initialValue - The current value to track.
 * @returns The previous value before the most recent update, or `null` if there is no previous value.
 *
 * @remarks
 * This hook updates the previous value whenever the input value changes.
 * Note that this implementation uses state and may cause unnecessary re-renders.
 *
 * @example
 * ```tsx
 * const previousCount = usePrevious(count);
 * ```
 */
export default function usePrevious(initialValue: any) {
  const [current, setCurrent] = React.useState(initialValue);
  const [previous, setPrevious] = React.useState(null);

  if (initialValue !== current) {
    setPrevious(current);
    setCurrent(initialValue);
  }
  
  return previous;
}
