import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useCountdown(endTime, options) {
  const [count, setCount] = React.useState(null);
  const intervalIdRef = React.useRef(null);

  const handleClearInterval = () => {
    window.clearInterval(intervalIdRef.current);
  };

  const onTick = React.useEffectEvent(() => {
    if (count === 0) {
      handleClearInterval();
      options.onComplete();
    } else {
      setCount(count - 1);
      options.onTick();
    }
  });

  React.useEffect(() => {
    setCount(Math.round((endTime - Date.now()) / options.interval));
  }, [endTime, options.interval]);

  React.useEffect(() => {
    intervalIdRef.current = window.setInterval(onTick, options.interval);

    return () => handleClearInterval();
  }, [options.interval]);

  return count;
}