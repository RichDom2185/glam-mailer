import remarkSimplePlantUML from "@akebifiky/remark-simple-plantuml";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import addClasses from "rehype-add-classes";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeMathjax from "rehype-mathjax";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkSmartypants from "remark-smartypants";
import { remarkTruncateLinks } from "remark-truncate-links";

import { Theme, getClassMappingFrom } from "../../utils/theme";

type Props = {
  theme?: Theme;
  containerRef?: React.RefObject<HTMLDivElement>;
  children: string;
};

// Take note of ordering of applying plugins
const remarkPlugins = [
  [remarkTruncateLinks, { style: "middle", length: 45 }],
  remarkMath,
  remarkSimplePlantUML,
  remarkSmartypants,
  remarkGfm,
  remarkGemoji,
];

const Markdown: React.FC<Props> = ({ theme, containerRef, children }) => {
  const [classesToAdd, setClassesToAdd] = useState<Record<string, string>>({});
  useEffect(() => {
    if (!theme) {
      return;
    }
    setClassesToAdd(getClassMappingFrom(theme));
  }, [theme]);

  return (
    <div ref={containerRef}>
      <ReactMarkdown
        className={classesToAdd[".markdown-body"] ?? ""}
        remarkPlugins={remarkPlugins}
        // Take note of ordering of applying plugins
        rehypePlugins={[
          rehypeMathjax,
          [rehypeHighlight, {}],
          [addClasses, classesToAdd],
          [
            rehypeExternalLinks,
            { target: "_blank", rel: ["nofollow", "noopener", "noreferrer"] },
          ],
        ]}
        children={children}
      />
    </div>
  );
};

export default Markdown;
