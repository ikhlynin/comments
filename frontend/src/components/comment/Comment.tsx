import React, { useEffect, useRef } from "react";
import CommentAttachment from "./CommentAttchment";
import CommentQuote from "./CommentQuote";
import { useSelectedText } from "../../utils/useSelectedText";
import { CommentProps } from "../../types/types";
import "../../styles/Comment.scss";

const Comment: React.FC<CommentProps> = ({ c, onReply }) => {
  const commentRef = useRef<HTMLDivElement>(null);
  const [selectedText, setSelectedText] = useSelectedText(commentRef);

  return (
    <div className="comment" ref={commentRef}>
      <div className="comment__header">
        <div className="comment__user">
          <a
            href={c.homePage}
            target="_blank"
            rel="noreferrer"
            className="comment__username"
          >
            {c.userName}
          </a>
          <span className="comment__email">({c.email})</span>
        </div>
        <div className="comment__date">
          {new Date(c.createdAt).toLocaleString()}
        </div>
      </div>
      {c.quote && <CommentQuote quote={c.quote} />}
      <div
        className="comment__text"
        ref={commentRef}
        dangerouslySetInnerHTML={{ __html: c.text }}
      />
      {c.attachmentPath && <CommentAttachment path={c.attachmentPath} />}
      <div className="comment__actions">
        {selectedText && (
          <button
            onClick={() => {
              onReply(c.id, selectedText);
              setSelectedText("");
            }}
          >
            Reply to selection
          </button>
        )}
      </div>
      {c.replies?.map((r) => (
        <Comment key={r.id} c={r} onReply={onReply} />
      ))}
    </div>
  );
};

export default Comment;
