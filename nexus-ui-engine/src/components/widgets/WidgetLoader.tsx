import { useState, useEffect } from "react";

export const WidgetLoader = ({ manifest }: { manifest: any }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Use a single shared ID for the main library bundle
    const scriptId = "nexus-widget-library";

    // If the library is already on window, just mark as loaded
    if ((window as any).NexusWidgets) {
      setLoaded(true);
      return;
    }

    const existingScript = document.getElementById(scriptId);
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = manifest.entryPointUrl;
      script.async = true;

      script.onload = () => {
        console.log("Nexus Widget Library loaded successfully.");
        setLoaded(true);
      };

      script.onerror = () => {
        setError(`Failed to load library from ${manifest.entryPointUrl}`);
      };

      document.body.appendChild(script);
    } else {
      // If script exists but library isn't on window yet, wait for it
      existingScript.addEventListener("load", () => setLoaded(true));
    }
  }, [manifest.entryPointUrl]);

  if (error)
    return (
      <div className="text-red-500 p-4 border rounded">Error: {error}</div>
    );

  if (!loaded)
    return (
      <div className="animate-pulse p-4 bg-gray-100 rounded">
        Engine: Mounting {manifest.name}...
      </div>
    );

  // 2. Resolve the component dynamically from the library
  // This avoids the "missing from window" error by checking the library object
  const library = (window as any).NexusWidgets;
  const Component = library?.[manifest.name] || library?.["DefaultCard"];

  if (!Component) {
    return (
      <div className="text-red-500 p-4 border border-red-200 rounded">
        {manifest.name} not found in library and no DefaultCard available.
      </div>
    );
  }

  // 3. Parse PostgreSQL configSchema securely
  const config =
    typeof manifest.configSchema === "string"
      ? JSON.parse(manifest.configSchema)
      : manifest.configSchema;

  return <Component {...config} />;
};
