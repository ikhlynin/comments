// src/services/commentService.ts
import axios from "../api/axios";
import { CommentFormData } from "../types/types";

export const commentService = {
  async addComment(data: CommentFormData) {
    console.log(data);
  },
};
