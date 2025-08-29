import React, { useEffect, useState } from "react";
import { commentService } from "../services/commentServices";
import { CommentData, CommentFormData, PAGE_SIZE } from "../types/types";
import CommentForm from "../components/CommentForm";
import Comment from "../components/comment/Comment";
import SortingControls from "../components/Sorting";
import Pagination from "../components/Pagination";
import "../styles/HomePage.scss";

const HomePage: React.FC = () => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState<number>(1);
  const [replyTo, setReplyTo] = useState<string | undefined>();
  const [quote, setQuote] = useState<string | undefined>();

  const fetchComments = async () => {
    const data = await commentService.getComments({
      sortBy,
      order,
      page,
      pageSize: PAGE_SIZE,
    });
    setComments(data.comments);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchComments();
  }, [sortBy, order, page]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("asc");
    }
    setPage(1);
  };

  const handleAddComment = (data: CommentFormData) => {
    fetchComments();
    setReplyTo(undefined);
    setQuote(undefined);
  };

  const handleReply = (parentId: string, quoteText?: string) => {
    setReplyTo(parentId);
    setQuote(quoteText);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div>
      <div className="form-wrapper">
        <CommentForm
          onSubmit={handleAddComment}
          parentId={replyTo}
          quote={quote}
        />
      </div>
      <SortingControls sortBy={sortBy} order={order} onSort={handleSort} />
      <div className="comments-list">
        {comments.map((c) => (
          <Comment c={c} onReply={handleReply} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default HomePage;
