import React from "react";
import { IMAGE_TYPES } from "../../types/types";

const CommentAttachment: React.FC<{ path: string }> = ({ path }) => {
  const rawPath =
    process.env.REACT_APP_API_URL ||
    "https://backend-production-7295.up.railway.app";
  const fullPath = `${rawPath}${path}`;
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
