
import * as React from "react";

type Listener = () => void;

const subscribe = (cb: Listener): (() => void) => {
  window.addEventListener("languagechange", cb);
  return () => window.removeEventListener("languagechange", cb);
};

const getSnapshot = (): string => {
  return navigator.language;
};

const getServerSnapshot = (): string => {
  throw Error("usePreferredLanguage is a client-only hook");
};

/**
 * React hook that returns the user's current preferred language as reported by the browser.
 *
 * This hook listens for the `languagechange` event and updates the returned value
 * whenever the user's preferred language changes.
 *
 * @returns {string} The current preferred language (e.g., "en-US").
 *
 * @throws Will throw an error if used during server-side rendering.
 *
 * @example
 * ```tsx
 * const language = usePreferredLanguage();
 * console.log(language); // e.g., "en-US"
 * ```
 */
export default function usePreferredLanguage(): string {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}