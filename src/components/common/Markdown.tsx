import React, { useMemo } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
// TODO: Set up type definitions
import addClasses from "rehype-add-classes";
import remarkGfm from "remark-gfm";
import { getClassMappingFrom, getTheme } from "../../utils/theme";

type Props = {
  containerRef?: React.RefObject<HTMLDivElement>;
  children: string;
};

const plugins = [remarkGfm];

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
        remarkPlugins={plugins}
        rehypePlugins={[[addClasses, classesToAdd]]}
        linkTarget="_blank"
        children={children}
      />
    </div>
  );
};

export default Markdown;
