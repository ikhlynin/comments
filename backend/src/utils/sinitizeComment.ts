import * as sanitizeHtml from 'sanitize-html';
const sanitizeComment = (text: string): string => {
  return sanitizeHtml(text, {
    allowedTags: ['a', 'code', 'i', 'strong'],
    allowedAttributes: { a: ['href', 'title'] },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: (tagName, attribs) => {
        return {
          tagName: 'a',
          attribs: {
            ...attribs,
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        };
      },
    },
  });
};

export default sanitizeComment;
