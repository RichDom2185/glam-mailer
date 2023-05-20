import { Components } from "react-markdown";
import { parse } from "yaml";
import defaultTheme from "../themes/default.yaml?raw";

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
  const res = await axios.post(API_CONVERSION_ENDPOINT_URL, {
    html,
  });
  return res.data;
};
