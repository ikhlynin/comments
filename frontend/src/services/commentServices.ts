import axios from "../api/axios";
import { CommentData, CommentFormData, CommentsOpts } from "../types/types";

export const commentService = {
  async getComments(
    opts?: CommentsOpts
  ): Promise<{ comments: CommentData[]; total: number }> {
    const res = await axios.get<{ comments: CommentData[]; total: number }>(
      "/comments",
      {
        params: {
          sortBy: opts?.sortBy || "createdAt",
          order: opts?.order || "desc",
          page: opts?.page || 1,
          pageSize: opts?.pageSize || 25,
        },
      }
    );
    return res.data;
  },

  async addComment(data: CommentFormData & { attachment?: File | null }) {
    await axios.post("/comments", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
