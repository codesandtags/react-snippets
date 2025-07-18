import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useContinuousRetry(
  callback,
  interval = 100,
  options = {}
) {
  const { maxRetries = Infinity } = options;
  const [hasResolved, setHasResolved] = React.useState(false);
  const onInterval = React.useEffectEvent(callback);

  React.useEffect(() => {
    let retries = 0;

    const intervalId = window.setInterval(() => {
        if (onInterval()) {
            setHasResolved(true);
            window.clearInterval(intervalId);
        } else if (retries >= maxRetries) {
            window.clearInterval(intervalId);
        } else {
            retries += 1;
        }
    }, interval)

    return () => {
        window.clearInterval(intervalId);
    }
  }, [maxRetries])

  return hasResolved;
}
