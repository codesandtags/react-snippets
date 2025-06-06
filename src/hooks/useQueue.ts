import * as React from "react";

const placeholder = () => {};

export default function useQueue(initialValue = []) {
  const [queue, setQueue] = React.useState(initialValue);

  const add = React.useCallback((element) => {
    setQueue((q) => [...q, element]);
  }, []);

  const remove = React.useCallback(() => {
    let removedElement;

    setQueue(([first, ...q]) => {
      removedElement = first;
      return q;
    });

    return removedElement;
  }, []);

  const clear = React.useCallback(() => {
    setQueue([]);
  }, []);

  return {
    add,
    remove,
    clear,
    first: queue[0],
    last: queue[queue.length - 1],
    size: queue.length,
    queue
  }; 
}