import React from "react";

const CommentQuote: React.FC<{ quote: string }> = ({ quote }) => (
  <div className="comment__quote">
    <span>{quote}</span>
  </div>
);

export default CommentQuote;
