import React from "react";
import { ALLOWED_FILE_TYPES } from "../../types/types";

const CommentAttachment: React.FC<{ path: string }> = ({ path }) => {
  return ALLOWED_FILE_TYPES.test(path) ? (
    <img src={path} alt="attachment" className="comment__attachment__img" />
  ) : (
    <a href={path} download className="comment__attachment__file">
      Download file
    </a>
  );
};

export default CommentAttachment;
