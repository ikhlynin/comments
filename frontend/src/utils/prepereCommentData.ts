import { CommentFormData } from "../types/types";
import sanitizeHtml from "sanitize-html";

const prepareCommentData = (
  data: CommentFormData,
  file: File | null,
  parentId?: string,
  quote?: string,
  captchaText?: string,
  sessionId?: string
) => {
  const sanitizedText = sanitizeHtml(data.text, {
    allowedTags: ["a", "code", "i", "strong"],
    allowedAttributes: {
      a: ["href"],
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

  const formData = new FormData();
  formData.append("userName", data.userName);
  formData.append("email", data.email);
  formData.append("homePage", data.homePage || "");
  formData.append("text", sanitizedText.trim());
  if (file) formData.append("attachment", file);
  if (parentId) formData.append("parentId", parentId);
  if (quote) formData.append("quote", quote);
  if (captchaText) formData.append("captchaText", captchaText);
  if (sessionId) formData.append("sessionId", sessionId);

  return formData;
};

export default prepareCommentData;
