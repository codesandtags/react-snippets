import * as React from "react";
import './styles.css';

const query = "only screen and (max-width : 768px)";

const subscribe = (callback: () => void): (() => void) => {
  const matchMedia = window.matchMedia(query);

  matchMedia.addEventListener("change", callback);

  return () => {
    matchMedia.removeEventListener("change", callback);
  };
};

const getSnapshot = (): boolean => {
  return window.matchMedia(query).matches;
};

export default function MatchMedia() {
  const isMobile = React.useSyncExternalStore(subscribe, getSnapshot);

  return (
    <section>
      Resize your browser's window to see changes.
      <article>
        <figure className={isMobile ? "active" : ""}>
          📲
          <figcaption>Is mobile: {`${isMobile}`}</figcaption>
        </figure>

        <figure className={!isMobile ? "active" : ""}>
          💻
          <figcaption>Is larger device: {`${!isMobile}`}</figcaption>
        </figure>
      </article>
    </section>
  );
}