// TODO: Use environment variables instead of hardcoding
export const BACKEND_URL = "http://localhost:8080";

export const API_CONVERSION_ENDPOINT_URL = BACKEND_URL + "/convert";

export const TAILWIND_CLASS_PREFIX = "tw-";

// TODO: Remove and replace this with a real email message
export const PLACEHOLDER_MARKDOWN_CONTENT = `
# Hello, world!

This is a sample email message. It is written in Markdown, and will be converted to HTML when you send it.

\`\`\`js
const message = "Hello, world!";
console.log(message);
\`\`\`

## This is a heading

### This is a subheading

#### This is a subsubheading

Just a link: https://reactjs.com.

##### This is a subsubsubheading
`;
