import React from "react";
import { CommentProps } from "../types/types";
import "../styles/Comment.scss";

const Comment: React.FC<CommentProps> = ({
  userName,
  email,
  text,
  createdAt,
}) => {
  return (
    <div className="comment">
      <div className="comment_header">
        <div>
          <span className="comment_user">{userName}</span>{" "}
          <span className="comment_email">({email})</span>
        </div>
        <span className="comment_date">
          {new Date(createdAt).toLocaleString()}
        </span>
      </div>
      <p className="comment_text">{text}</p>
    </div>
  );
};

export default Comment;
