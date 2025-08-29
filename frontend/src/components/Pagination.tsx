import React from "react";
import { PaginationProps } from "../types/types";
import "../styles/Pagination.scss";

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  setPage,
}) => {
  return (
    <div className="pagination">
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        Prev
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
