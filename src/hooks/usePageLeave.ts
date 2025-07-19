import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

export default function usePageLeave(cb) {
  const onLeave = React.useEffectEvent((event) => {
    const to = event.relatedTarget || event.toElement;
    if (!to || to.nodeName === "HTML") {
      cb();i
    }
  });

  React.useEffect(() => {
    document.addEventListener("mouseout", onLeave);

    return () => {
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);
}