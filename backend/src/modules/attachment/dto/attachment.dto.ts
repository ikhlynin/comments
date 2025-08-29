export class CreateAttachmentDto {
  path: string;
  mimetype: 'image' | 'text';
  size: number;
  commentId: string;
}
