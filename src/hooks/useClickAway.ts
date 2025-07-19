import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useClickAway(cb) {
  const ref = React.useRef(null);

  const onEventHandler = React.useEffectEvent((e) => {
    const element = ref.current;
    if (element && !element.contains(e.target)) {
      cb(e);
    }
  });

  React.useEffect(() => {
    document.addEventListener("mousedown", onEventHandler);
    document.addEventListener("touchstart", onEventHandler);

    return () => {
      document.removeEventListener("mousedown", onEventHandler);
      document.removeEventListener("touchstart", onEventHandler);
    };
  }, []);

  return ref;
}