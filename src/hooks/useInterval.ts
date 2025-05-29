import * as React from "react";

// If using React 19+ with useEffectEvent, otherwise remove this line
// React.useEffectEvent = React.experimental_useEffectEvent;

export default function useInterval(cb: () => void, ms: number): () => void {
  const id = React.useRef<number | null>(null);
  // @ts-expect-error: experimental API
  const onInterval = React.useEffectEvent(cb);

  const handleClearInterval = React.useCallback(() => {
    if (id.current !== null) {
      window.clearInterval(id.current);
    }
  }, []);

  React.useEffect(() => {
    id.current = window.setInterval(onInterval, ms);
    return handleClearInterval;
  }, [ms, handleClearInterval, onInterval]);

  return handleClearInterval;
}