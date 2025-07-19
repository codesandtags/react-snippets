import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useIntervalWhen(cb, { ms, when, startImmediately }) {
  const id = React.useRef(null);
  const onTick = React.useEffectEvent(cb);
  const immediatelyCalled = React.useRef(
    startImmediately === true ? false : null
  );

  const handleClearInterval = React.useCallback(() => {
    window.clearInterval(id.current);
    immediatelyCalled.current = false;
  }, []);

  React.useEffect(() => {
    if (when === true) {
      id.current = window.setInterval(onTick, ms);

      if (startImmediately === true && immediatelyCalled.current === false) {
        onTick();
        immediatelyCalled.current = true;
      }

      return handleClearInterval;
    }
  }, [ms, when, startImmediately, handleClearInterval]);

  return handleClearInterval;
}