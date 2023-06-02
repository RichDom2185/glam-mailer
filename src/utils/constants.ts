// TODO: Use environment variables instead of hardcoding
export const BACKEND_URL: string =
  import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";

export const API_CONVERSION_ENDPOINT_URL = BACKEND_URL + "/convert";

export const TAILWIND_CLASS_PREFIX: string =
  import.meta.env.VITE_TAILWIND_PREFIX ?? "tw-";

// TODO: Remove and replace this with a real email message
export const PLACEHOLDER_MARKDOWN_CONTENT = `# Dear [RECIPIENT],

Write your email here!

Best regards,
[SENDER]
`;

export const HEADER_HEIGHT = 60 as const;
