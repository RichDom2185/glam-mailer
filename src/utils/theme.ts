import { Components } from "react-markdown";
import { parse } from "yaml";
import defaultTheme from "../themes/default.yaml?raw";

export type Theme = {
  name: string;
  author: string;
  description: string;
  styles: {
    [tag in keyof Components]: string[];
  };
};

export const getTheme = () => {
  return parse(defaultTheme);
};
