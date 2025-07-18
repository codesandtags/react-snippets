import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function useRandomInterval(cb, { minDelay, maxDelay }) {
  const timeoutId = React.useRef(null);
  const onInterval = React.useEffectEvent(cb);

  const handleClearTimeout = React.useCallback(() => {
    window.clearTimeout(timeoutId.current);
  }, []);

  React.useEffect(() => {
    const tick = () => {
      const interval = getRandomNumber(minDelay, maxDelay);
      timeoutId.current = window.setTimeout(() => {
        onInterval();
        tick();
      }, interval);
    };

    tick();

    return handleClearTimeout;
  }, [minDelay, maxDelay, handleClearTimeout]);

  return handleClearTimeout;
}