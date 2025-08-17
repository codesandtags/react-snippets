import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useKeyPress(key, cb, options = {}) {
  const { event = "keydown", target = window ?? null, eventOptions } = options;
  const onListen = React.useEffectEvent(cb);

  React.useEffect(() => {
    const handler = (event) => {
      if (event.key === key) {
        onListen(event);
      }
    };

    target.addEventListener(event, handler, eventOptions);

    return () => {
      target.removeEventListener(event, handler, eventOptions);
    };
  }, [key, target, event, eventOptions]);
}