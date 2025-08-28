import DOMPurify from "dompurify";

export function sanitizeHtml(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ["a", "code", "i", "strong"],
    ALLOWED_ATTR: ["href", "title"],
    // безопасные ссылки
    ADD_ATTR: [],
    ALLOW_ARIA_ATTR: false,
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ["script", "style"],
    FORBID_ATTR: ["onerror", "onclick", "onload"],
  });
}
