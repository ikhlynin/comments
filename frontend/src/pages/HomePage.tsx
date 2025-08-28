import React, { useState } from "react";
import CommentForm from "../components/CommentForm";
import Comment from "../components/Comment";
import { CommentData } from "../types/types";
import "../styles/HomePage.scss";

const HomePage: React.FC = () => {
  const [comments, setComments] = useState<CommentData[]>([]);

  const handleAddComment = (data: Omit<CommentData, "id" | "createdAt">) => {
    const newComment: CommentData = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      ...data,
    };
    setComments((prev) => [newComment, ...prev]);
  };

  return (
    <div className="homepage">
      <CommentForm onSubmit={handleAddComment} />

      <div className="homepage_comments">
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((c) => <Comment key={c.id} {...c} />)
        )}
      </div>
    </div>
  );
};

export default HomePage;
