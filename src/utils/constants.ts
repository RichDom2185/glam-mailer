import markdownTemplates from "../lib/markdown";

// TODO: Use environment variables instead of hardcoding
export const BACKEND_URL: string =
  import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";

export const API_CONVERSION_ENDPOINT_URL = BACKEND_URL + "/convert";

export const TAILWIND_CLASS_PREFIX: string =
  import.meta.env.VITE_TAILWIND_PREFIX ?? "tw-";

export const PLACEHOLDER_MARKDOWN_CONTENT =
  markdownTemplates.defaultPlaceholder;

export const HEADER_HEIGHT = 60 as const;

export const GITHUB_URL: string = import.meta.env.VITE_GITHUB_URL ?? "#";
export const WEBSITE_URL: string = import.meta.env.VITE_WEBSITE_URL ?? "#";
export const LINKEDIN_URL: string = import.meta.env.VITE_LINKEDIN_URL ?? "#";
