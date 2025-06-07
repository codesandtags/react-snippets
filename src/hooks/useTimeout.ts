import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useTimeout(cb, ms) {
  const timerIdRef = React.useRef(null);
  const onTimeout = React.useEffectEvent(cb);

  const handleClearTimeout = React.useCallback(() => {
      window.clearTimeout(timerIdRef.current);
  }, []);
  
  React.useEffect(() => {
    timerIdRef.current = window.setTimeout(onTimeout, ms);

    return handleClearTimeout;
  }, [ms, handleClearTimeout]);

  return handleClearTimeout;
}
