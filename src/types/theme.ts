import { Components } from "react-markdown";

export type Theme = {
  name: string;
  author: string;
  description: string;
  version: string;
  preflight?: boolean;
  styles: {
    // TODO: Update types to reflect usage of CSS selectors,
    //       not just HTML element tags
    [tag in keyof Components]: string[];
  };
};
