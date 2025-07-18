import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useEventListener(target, eventName, handler, options) {
  const onEvent = React.useEffectEvent(handler);

  React.useEffect(() => {
    const targetElement = target.current ?? target;

    if (!targetElement?.addEventListener) return;

    targetElement.addEventListener(eventName, onEvent, options);

    return () => {
      targetElement.removeEventListener(eventName, onEvent, options);
    };
  }, [target, eventName, options]);
}