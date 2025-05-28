import * as React from "react";

export default function useDefault(initialState: any, defaultState: any) {
  const [state, setState] = React.useState(initialState);

  if (typeof state === 'undefined' || state === null) {
    return [defaultState, setState];
  }
  
  
  return [state, setState];
}
