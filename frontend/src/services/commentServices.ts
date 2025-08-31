import api from "../api/axios";
import { CommentData, CommentFormData, CommentsOpts } from "../types/types";

export const commentService = {
  async getComments(
    opts?: CommentsOpts
  ): Promise<{ comments: CommentData[]; total: number }> {
    const res = await api.get<{ comments: CommentData[]; total: number }>(
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

  async addComment(formData: FormData): Promise<void> {
    await api.post("/comments", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
