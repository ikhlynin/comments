export class CreateCommentDto {
  userName: string;
  email: string;
  homePage?: string;
  text: string;
  parentId?: string;
  quote?: string;
  attachments?: {
    path: string;
    mimetype: string;
    size: number;
  }[];
}
