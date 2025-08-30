import React from "react";
import { ALLOWED_FILE_TYPES, IMAGE_TYPES } from "../../types/types";

const API_PATH = process.env.REACT_APP_API_URL || "http://localhost:5000";

const CommentAttachment: React.FC<{ path: string }> = ({ path }) => {
  const fullPath = `${API_PATH}${path}`;
  const isImage = IMAGE_TYPES.test(path);
  return isImage ? (
    <img src={fullPath} alt="attachment" className="comment__attachment__img" />
  ) : (
    <a href={fullPath} download className="comment__attachment__file">
      Download file
    </a>
  );
};

export default CommentAttachment;
