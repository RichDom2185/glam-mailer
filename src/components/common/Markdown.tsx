import React from "react";
import { Components } from "react-markdown";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { Theme, getTheme } from "../../utils/theme";

type Props = {
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
  const tagStyles = tailwindClasses.map((style) => "tw-" + style);
  if (className) {
    tagStyles.push(className);
  }

  const Tag = tag;
  return <Tag className={tagStyles.join(" ")} {...props} />;
};

const Markdown: React.FC<Props> = ({ children }) => {
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
    <ReactMarkdown remarkPlugins={plugins} components={customComponents}>
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
