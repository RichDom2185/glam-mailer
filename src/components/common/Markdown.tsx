import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  children: string;
};

const plugins = [remarkGfm];

const Markdown: React.FC<Props> = ({ children }) => {
  return <ReactMarkdown remarkPlugins={plugins}>{children}</ReactMarkdown>;
};

export default Markdown;
