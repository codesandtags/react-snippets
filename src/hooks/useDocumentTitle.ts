import * as React from "react";


/**
 * Custom React hook that sets the document's title to the specified value.
 *
 * @param title - The string to set as the document's title.
 *
 * @remarks
 * This hook updates the document title whenever the `title` argument changes.
 *
 * @example
 * ```tsx
 * useDocumentTitle("My Page Title");
 * ```
 */
export default function useDocumentTitle(title: string) {
  React.useEffect(() => {
    document.title = title;
  }, [title])
}
