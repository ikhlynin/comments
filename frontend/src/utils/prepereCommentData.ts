import { CommentFormData } from "../types/types";
import sanitizeHtml from "sanitize-html";

const prepareCommentData = (
  data: CommentFormData,
  file: File | null,
  captchaToken: string | null,
  parentId?: string,
  quote?: string
) => {
  const sanitizedText = sanitizeHtml(data.text, {
    allowedTags: ["a", "code", "i", "strong"],
    allowedAttributes: {
      a: ["href", "title"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    enforceHtmlBoundary: true,
    transformTags: {
      a: (tagName, attribs) => {
        if (attribs.href && !/^https?:|^mailto:/i.test(attribs.href)) {
          delete attribs.href;
        }
        return { tagName, attribs };
      },
    },
  });

  return {
    ...data,
    text: sanitizedText.trim(),
    attachment: file,
    parentId,
    quote,
    captchaToken,
  };
};

export default prepareCommentData;
