import * as React from "react";

/**
 * A custom React hook that sets or updates the favicon of the current document.
 *
 * When the `url` parameter changes, this hook will either update the existing favicon
 * link element or create a new one if it does not exist.
 *
 * @param url - The URL of the favicon to set for the document.
 *
 * @example
 * useFavicon('/favicon.ico');
 *
 * @remarks
 * This hook should be used within a React component. It will update the favicon
 * whenever the `url` changes.
 */
export default function useFavicon(url: string) {
  React.useEffect(() => {
    let link: HTMLLinkElement | null = document.querySelector(`link[rel~="icon"]`);

    if (!link) {
      link = document.createElement('link');
      link.type = "image/x-icon";
      link.rel = "icon";
    
      document.head.appendChild(link);
    } 

    link.href = url;
  }, [url])
  
  return;
}
