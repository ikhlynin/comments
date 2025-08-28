export type SortField = "username" | "email" | "createdAt";
export type SortOrder = "asc" | "desc";

export type AttachmentType = "image" | "text";

export interface AttachmentDTO {
  id: string;
  type: AttachmentType;
  url: string;
  filename: string;
}

export interface CommentDTO {
  id: string;
  username: string;
  email: string;
  homepage?: string | null;
  textHtml: string;
  createdAt: string;
  attachments: AttachmentDTO[];
  replies: CommentDTO[];
  parentId?: string | null;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
