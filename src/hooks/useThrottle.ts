import * as React from "react";

export default function useThrottle(value, interval = 500) {
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastUpdated = React.useRef(null);

  React.useEffect(() => {
    const now = Date.now();

    if (lastUpdated.current && now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      setThrottledValue(value);
    } else {
      const id = window.setTimeout(() => {
        lastUpdated.current = now;
        setThrottledValue(value);
      }, interval);

      return () => window.clearTimeout(id);
    }
  }, [value, interval]);

  return throttledValue;
}