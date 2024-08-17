import axios from "axios";
import { Components } from "react-markdown";
import { parse } from "yaml";
import defaultThemeFile from "../themes/default.yaml?raw";
import { Theme } from "../types/theme";
import {
  API_CONVERSION_ENDPOINT_URL,
  TAILWIND_CLASS_PREFIX,
} from "./constants";

export { defaultThemeFile };
export const parseTheme = (yaml: string): Theme => {
  return parse(yaml);
};
export const defaultTheme = parseTheme(defaultThemeFile);

// Precondition: `className` is not conditional
const generatePrefixedClass = (className: string): string => {
  const isImportant = className.startsWith("!");
  return isImportant
    ? `!${TAILWIND_CLASS_PREFIX}${className.slice(1)}`
    : `${TAILWIND_CLASS_PREFIX}${className}`;
};

export const getClassMappingFrom = (theme: Theme): Record<string, string> => {
  const { styles } = theme;
  const classMap: Record<string, string> = {};
  Object.keys(styles).forEach((tag) => {
    // Must use any here because of the large union type
    // TODO: Fix typings to reflect usage of CSS selectors
    const tailwindClasses = styles[tag as keyof Components] ?? [];
    classMap[tag] = tailwindClasses
      // We include the default style as well
      // for use when exporting as email
      // TODO: Use prefix for exports
      .flatMap((style) => {
        const isConditional = style.includes(":");
        if (!isConditional) {
          return [style, generatePrefixedClass(style)];
        }

        const [condition, remaining] = style.split(":", 2);
        // We must define it in `prefixedClass` first
        // for some reason; if we substitute the function
        // call directly, it doesn't work.
        const prefixedClass = generatePrefixedClass(remaining);
        return [style, `${condition}:${prefixedClass}`];
      })
      .join(" ");
  });
  return classMap;
};

export const formatAsHtmlEmail = async (html: string) => {
  const res = await axios.post(API_CONVERSION_ENDPOINT_URL, {
    html,
  });
  return res.data;
};
