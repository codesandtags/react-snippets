import * as React from "react";

React.useEffectEvent = React.experimental_useEffectEvent;

const initialState = {
  error: undefined,
  data: undefined
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...initialState };
    case "fetched":
      return { ...initialState, data: action.payload };
    case "error":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export default function useFetch(url, options) {
  const cacheRef = React.useRef({});

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onFetch = React.useEffectEvent((url) => {
    return fetch(url, options);
  });

  React.useEffect(() => {
    if (typeof url !== "string") return;

    let ignore = false;

    const fetchData = async () => {
      const cachedResponse = cacheRef.current[url];

      if (cachedResponse) {
        dispatch({ type: "fetched", payload: cachedResponse });
        return;
      }

      dispatch({ type: "loading" });

      try {
        const res = await onFetch(url);

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const json = await res.json();
        cacheRef.current[url] = json;

        if (ignore === false) {
          dispatch({ type: "fetched", payload: json });
        }
      } catch (e) {
        if (ignore === false) {
          dispatch({ type: "error", payload: e });
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return state;
}