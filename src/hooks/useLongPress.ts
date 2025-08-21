import * as React from "react";

export function isTouchEvent({ nativeEvent }) {
  return window.TouchEvent
    ? nativeEvent instanceof TouchEvent
    : "touches" in nativeEvent;
}

export function isMouseEvent(event) {
  return event.nativeEvent instanceof MouseEvent;
}

export default function useLongPress(callback, options = {}) {
  const { threshold = 400, onStart, onFinish, onCancel } = options;

  return React.useMemo(() => {
    if (typeof callback !== "function") {
      return {};
    }

    const start = (event) => {};

    const cancel = (event) => {};

    const mouseHandlers = {
      onMouseDown: start,
      onMouseUp: cancel,
      onMouseLeave: cancel
    };

    const touchHandlers = {
      onTouchStart: start,
      onTouchEnd: cancel
    };

    return {
      ...mouseHandlers,
      ...touchHandlers
    };
  }, [callback, threshold, onCancel, onFinish, onStart]);
}
