import React, { useMemo } from "react";
import { Components } from "react-markdown";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import addClasses from "rehype-add-classes";
import remarkGfm from "remark-gfm";
import { TAILWIND_CLASS_PREFIX } from "../../utils/constants";
import { Theme, getTheme } from "../../utils/theme";

type Props = {
  containerRef?: React.RefObject<HTMLDivElement>;
  children: string;
};

const plugins = [remarkGfm];

const Markdown: React.FC<Props> = ({ containerRef, children }) => {
  // TODO: Use a prop to respect abstraction boundaries
  const { styles } = getTheme() as Theme;
  // Must use any here because of the large union type

  const classesToAdd = useMemo(() => {
    const classesToAdd: {
      [key: string]: string;
    } = {};
    Object.keys(styles).forEach((tag) => {
      // Must use any here because of the large union type
      const tailwindClasses = styles[tag as keyof Components] ?? [];
      classesToAdd[tag] = tailwindClasses
        .flatMap((style) => [
          // We include the default style as well
          // for use when exporting as email
          style,
          `${TAILWIND_CLASS_PREFIX}${style}`,
        ])
        .join(" ");
    });
    return classesToAdd;
  }, [styles]);

  return (
    <div ref={containerRef}>
      <ReactMarkdown
        remarkPlugins={plugins}
        rehypePlugins={[[addClasses, classesToAdd]]}
        linkTarget="_blank"
        children={children}
      />
    </div>
  );
};

export default Markdown;
