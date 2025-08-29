export interface CommentData {
  id: string;
  userName: string;
  email: string;
  homePage?: string;
  text: string;
  createdAt: string;
  attachmentPath?: string;
  parentId?: string;
  replies?: CommentData[];
  quote?: string;
}

export interface CommentProps {
  c: CommentData;
  onReply: (parentId: string, quote?: string) => void;
  level?: number;
}

export interface TextInputProps {
  label?: string;
  placeholder: string;
  register: any;
  error?: string;
}

export interface CommentFormData {
  userName: string;
  email: string;
  homePage?: string;
  text: string;
  quote?: string;
  captcha?: string;
  attachment?: File | null;
  parentId?: string;
}

export interface CommentFormProps {
  onSubmit?: (data: CommentFormData) => void;
  parentId?: string;
  onCreated?: () => void;
  quote?: string;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export interface SortingProps {
  sortBy: string;
  order: "asc" | "desc";
  onSort: (field: string) => void;
}

export interface CommentsOpts {
  sortBy?: string;
  order?: string;
  page?: number;
  pageSize?: number;
}

export const SORT_FIELDS = [
  { label: "User Name", value: "userName" },
  { label: "E-mail", value: "email" },
  { label: "Date", value: "createdAt" },
];

export const PAGE_SIZE = 25;

export const ALLOWED_TAGS = /<(\/?(a|code|i|strong)( [^>]*)?)>/gi;

export const ALLOWED_FILE_TYPES = /(\.jpg|\.jpeg|\.png|\.txt)$/i;

export const ALLOWED_MAX_FILE_SIZE = 100;
