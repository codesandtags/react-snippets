import * as React from "react";

export default function useList(defaultList = []) {
  const [list, setList] = React.useState(defaultList);

  const set = React.useCallback((l) => {
    setList(l);
  }, []);

  const push = React.useCallback((element) => {
    setList((l) => [...l, element]);
  }, []);

  const removeAt = React.useCallback((index) => {
    setList((l) => [...l.slice(0, index), ...l.slice(index + 1)]);
  }, []);

  const insertAt = React.useCallback((index, element) => {
    setList((l) => [...l.slice(0, index), element, ...l.slice(index)]);
  }, []);

  const updateAt = React.useCallback((index, element) => {
    setList((l) => l.map((e, i) => (i === index ? element : e)));
  }, []);

  const clear = React.useCallback(() => setList([]), []);

  return [list, { set, push, removeAt, insertAt, updateAt, clear }];
}