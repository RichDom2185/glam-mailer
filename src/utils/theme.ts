import { Components } from "react-markdown";
import { parse } from "yaml";
import components from "../themes/components.min.css?raw";
import defaultTheme from "../themes/default.yaml?raw";
import utilities from "../themes/utilities.min.css?raw";

import axios from "axios";
import { API_CONVERSION_ENDPOINT_URL } from "./constants";

export type Theme = {
  name: string;
  author: string;
  description: string;
  styles: {
    [tag in keyof Components]: string[];
  };
};

// TODO: Use redux
export const getTheme = () => {
  return parse(defaultTheme);
};

export const formatAsHtmlEmail = async (html: string) => {
  const tailwind = "<style>\n" + components + "\n" + utilities + "\n</style>\n";
  const res = await axios.post(API_CONVERSION_ENDPOINT_URL, {
    html: tailwind + html,
  });
  return res.data;
};
