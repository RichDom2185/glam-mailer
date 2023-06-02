import React, { useMemo } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
// TODO: Set up type definitions
import remarkSimplePlantUML from "@akebifiky/remark-simple-plantuml";
import addClasses from "rehype-add-classes";
import rehypeHighlight from "rehype-highlight";
import rehypeMathjax from "rehype-mathjax";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkSmartypants from "remark-smartypants";
import { remarkTruncateLinks } from "remark-truncate-links";

import { getClassMappingFrom, getTheme } from "../../utils/theme";

type Props = {
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

const Markdown: React.FC<Props> = ({ containerRef, children }) => {
  // TODO: Use a prop to respect abstraction boundaries
  const theme = getTheme();
  const classesToAdd = useMemo(() => {
    const classesToAdd: {
      [key: string]: string;
    } = getClassMappingFrom(theme);
    return classesToAdd;
  }, [theme]);

  return (
    <div ref={containerRef}>
      <ReactMarkdown
        className={classesToAdd[".markdown-body"] ?? ""}
        remarkPlugins={remarkPlugins}
        // Take note of ordering of applying plugins
        rehypePlugins={[
          rehypeMathjax,
          [rehypeHighlight, { ignoreMissing: true }],
          [addClasses, classesToAdd],
        ]}
        linkTarget="_blank"
        children={children}
      />
    </div>
  );
};

export default Markdown;
