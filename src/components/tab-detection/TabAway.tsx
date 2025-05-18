import * as React from "react";

/**
 * TabAway Component
 *
 * This React component tracks how many times the user has switched away from the browser tab.
 * It uses the Page Visibility API to detect when the document's visibility state changes.
 *
 * Features:
 * - Displays a count of how many times the user has left the tab.
 * - Updates the count each time the tab becomes hidden (not "visible").
 *
 * Usage:
 * ```tsx
 * <TabAway />
 * ```
 *
 * @returns {JSX.Element} A paragraph displaying the number of times the user has tabbed away.
 */
export default function TabAways() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const handleChange = () => {
      if (document.visibilityState !== "visible") {
        setCount((c) => c + 1);
      }
    };

    document.addEventListener("visibilitychange", handleChange);

    return () => {
      document.removeEventListener("visibilitychange", handleChange);
    };
  }, []);

  return (
    <p>
      You've tabbed away <strong>{count}</strong> time{count !== 1 && "s"}.
    </p>
  );
}
