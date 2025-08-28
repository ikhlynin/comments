export interface CommentProps {
  id: string;
  userName: string;
  email: string;
  text: string;
  createdAt: Date;
}

export interface CommentFormData {
  userName: string;
  email: string;
  text: string;
  attachment?: File | null;
}

export interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void;
}

export interface CommentData {
  id: string;
  userName: string;
  email: string;
  homePage?: string;
  text: string;
  createdAt: Date;
}
