import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  title?: string;
  preflight?: boolean;
};

const Tailwind: React.FC<Props> = ({ children, title, preflight = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ref, setRef] = useState<HTMLIFrameElement | null>(null);
  const root = ref?.contentWindow?.document?.body;
  const document = useMemo(() => ref?.contentDocument, [ref]);

  useEffect(() => {
    if (!document) {
      return;
    }
    const tw = document.createElement("script");
    tw.src = "https://cdn.tailwindcss.com";

    const config = document.createElement("script");
    config.text = `
    tailwind.config = {
      corePlugins: {
        preflight: ${preflight},
      },
    };
    `;

    document.head.appendChild(tw);
    tw.onload = () => {
      document.head.appendChild(config);
      setIsLoading(false);
    };
    return () => {
      document.head.removeChild(tw);
      document.head.removeChild(config);
    };
  }, [document, preflight]);

  return (
    <iframe
      ref={setRef}
      title={title ?? "Tailwind Preview"}
      style={{
        width: "100%",
        border: "none",
        height: "100%",
        overflow: "auto",
        display: isLoading ? "none" : undefined,
      }}
    >
      {!isLoading && root && createPortal(children, root)}
    </iframe>
  );
};

export default Tailwind;
