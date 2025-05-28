import * as React from "react";

export default function useToggle(initialValue = true) {
  const [state, setState] = React.useState(() => {
    if (typeof initialValue === 'boolean') {
      return initialValue;  
    }

    return Boolean(initialValue)
  });

  const handleToggle = React.useCallback((value: any) => {
    if (typeof value === 'boolean') {
      return setState(value);
    }

    return setState((v) => !v);
  }, []);
  
  return [state, handleToggle];
}
