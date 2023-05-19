import React from "react";
import { Components } from "react-markdown";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { TAILWIND_CLASS_PREFIX } from "../../utils/constants";
import { Theme, getTheme } from "../../utils/theme";

type Props = {
  containerRef?: React.RefObject<HTMLDivElement>;
  children: string;
};

type StyledComponentProps = {
  tag: keyof Components;
  className: string;
  tailwindClasses: string[];
  props: Record<string, any>;
};

const plugins = [remarkGfm];

const StyledComponent: React.FC<StyledComponentProps> = ({
  tag,
  className,
  tailwindClasses,
  ...props
}) => {
  const tagStyles = tailwindClasses.flatMap((style) => [
    // We include the default style as well
    // for use when exporting as email
    style,
    `${TAILWIND_CLASS_PREFIX}${style}`,
  ]);
  if (className) {
    tagStyles.push(className);
  }

  const Tag = tag;
  return <Tag className={tagStyles.join(" ")} {...props} />;
};

const Markdown: React.FC<Props> = ({ containerRef, children }) => {
  // TODO: Use a prop to respect abstraction boundaries
  const { styles } = getTheme() as Theme;
  // Must use any here because of the large union type
  const customComponents: any = {};

  Object.keys(styles).forEach((tag) => {
    const key = tag as keyof Components;
    // Must use any here because of the large union type
    customComponents[key] = ({ node: _node, className, ...props }: any) => (
      <StyledComponent
        tag={tag}
        className={className}
        tailwindClasses={styles[key]}
        {...props}
      />
    );
  });

  return (
    <div ref={containerRef}>
      <ReactMarkdown
        remarkPlugins={plugins}
        components={customComponents}
        linkTarget="_blank"
        children={children}
      />
    </div>
  );
};

export default Markdown;
