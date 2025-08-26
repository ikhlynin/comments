export class CreateAttachmentDto {
  filename: string;
  url: string;
  type: 'image' | 'text';
  commentId: string;
}