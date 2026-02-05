import { useState, useEffect } from "react";

export const useExternalScript = (url: string) => {
  const [state, setState] = useState(url ? "loading" : "idle");

  useEffect(() => {
    if (!url) return;

    let script = document.querySelector(
      `script[src="${url}"]`,
    ) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.setAttribute("data-status", "loading");
      document.body.appendChild(script);

      const setAttributeFromEvent = (event: Event) => {
        script.setAttribute(
          "data-status",
          event.type === "load" ? "ready" : "error",
        );
        setState(event.type === "load" ? "ready" : "error");
      };

      script.addEventListener("load", setAttributeFromEvent);
      script.addEventListener("error", setAttributeFromEvent);
    } else {
      setState(script.getAttribute("data-status") || "ready");
    }
  }, [url]);

  return state;
};
