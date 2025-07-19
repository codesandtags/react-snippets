import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function useLogger(name, ...rest) {
  const initialRenderRef = React.useRef(true);

  const handleLog = React.useEffectEvent((event) => {
    console.log(`${name} ${event}:`, rest);
  });

  React.useEffect(() => {
    if (initialRenderRef.current === false) {
      handleLog("updated");
    }
  });

  React.useEffect(() => {
    handleLog("mounted");
    initialRenderRef.current = false;

    return () => {
      handleLog("unmounted");
      initialRenderRef.current = true;
    };
  }, []);
}