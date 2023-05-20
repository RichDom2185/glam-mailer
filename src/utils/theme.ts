import { Components } from "react-markdown";
import { parse } from "yaml";
import defaultTheme from "../themes/default.yaml?raw";

import axios from "axios";
import {
  API_CONVERSION_ENDPOINT_URL,
  TAILWIND_CLASS_PREFIX,
} from "./constants";

export type Theme = {
  name: string;
  author: string;
  description: string;
  styles: {
    // TODO: Update types to reflect usage of CSS selectors,
    //       not just HTML element tags
    [tag in keyof Components]: string[];
  };
};

// TODO: Use redux
export const getTheme = (): Theme => {
  return parse(defaultTheme) as Theme;
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
      .flatMap((style) => [style, `${TAILWIND_CLASS_PREFIX}${style}`])
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
