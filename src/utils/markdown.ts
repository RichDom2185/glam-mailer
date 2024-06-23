import remarkSimplePlantUML from "@akebifiky/remark-simple-plantuml";
import * as runtime from "react/jsx-runtime";
import addClasses from "rehype-add-classes";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeMathjax from "rehype-mathjax";
import rehypeReact from "rehype-react";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkSmartypants from "remark-smartypants";
import { remarkTruncateLinks } from "remark-truncate-links";
import { unified } from "unified";

export const buildRenderPipeline = (classesToAdd: Record<string, string>) => {
  // Take note of ordering of applying plugins
  const pipeline = unified()
    .use(remarkParse as any)

    // Remark plugins
    .use(remarkTruncateLinks, { style: "middle", length: 45 } as any)
    .use(remarkMath)
    .use(remarkSimplePlantUML)
    .use(remarkSmartypants as any)
    .use(remarkGfm)
    .use(remarkGemoji)

    .use(remarkRehype)

    // Rehype plugins
    .use(rehypeMathjax)
    .use(rehypeHighlight)
    .use(addClasses, classesToAdd)
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["nofollow", "noopener", "noreferrer"],
    })

    .use(rehypeReact as any, { ...runtime });
  return pipeline;
};
