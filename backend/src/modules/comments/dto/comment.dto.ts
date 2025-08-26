export class CreateCommentDto {
  userId: string;
  text: string;
  captcha: string;
  parentId?: string;
}
