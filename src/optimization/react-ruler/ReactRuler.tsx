import * as React from "react";

export default function ReactRuler() {
  const [width, setWidth] = React.useState<number | null>(null);
  const ruleRef = React.useRef<HTMLElement>(null);

  React.useLayoutEffect(() => {
    if (!ruleRef.current) return;

    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      const entry = entries[0];
      // Fallback for browsers that may not support borderBoxSize
      const size =
        entry.borderBoxSize && entry.borderBoxSize.length > 0
          ? entry.borderBoxSize[0].inlineSize
          : entry.contentRect.width;
      setWidth(size);
    });

    observer.observe(ruleRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section>
      <h1>React Ruler</h1>
      <p>(Resize the ruler)</p>
      <article ref={ruleRef}>
        <label>
          width: {width !== null ? Math.floor(width) : "—"}
        </label>
      </article>
    </section>
  );
}