import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/comment.dto';
import { PrismaService } from '../../common/prisma.service';
import sanitizeComment from '../../utils/sinitizeComment';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCommentDto) {
    const sanitizedText = sanitizeComment(dto.text);
    return this.prisma.comment.create({
      data: {
        userName: dto.userName,
        email: dto.email,
        homePage: dto.homePage,
        text: sanitizedText,
        quote: dto.quote,
        parentId: dto.parentId,
        attachments: dto.attachments ? { create: dto.attachments } : undefined,
      },
    });
  }

  async findAll(opts: {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }) {
    const {
      page = 1,
      pageSize = 25,
      sortBy = 'createdAt',
      order = 'desc',
    } = opts;

    const topLevelComments = await this.prisma.comment.findMany({
      where: { parentId: null },
      orderBy: { [sortBy]: order },
      include: { attachments: true },
    });

    const allComments = await this.prisma.comment.findMany({
      include: { attachments: true },
      orderBy: { createdAt: 'asc' },
    });

    const map = new Map<string, any>();
    allComments.forEach((c) => {
      map.set(c.id, {
        ...c,
        attachmentPath: c.attachments?.[0]?.path,
        replies: [],
      });
    });

    map.forEach((c) => {
      if (c.parentId) {
        const parent = map.get(c.parentId);
        if (parent) parent.replies.push(c);
      }
    });

    const countThreadComments = (comment: any): number => {
      let count = 1;
      if (comment.replies?.length) {
        for (const reply of comment.replies) {
          count += countThreadComments(reply);
        }
      }
      return count;
    };

    const threads = topLevelComments.map((c) => map.get(c.id));

    const paginatedThreads: any[] = [];
    let count = 0;
    let startIndex = (page - 1) * pageSize;

    for (const thread of threads) {
      const threadSize = countThreadComments(thread);

      if (count + threadSize <= startIndex) {
        count += threadSize;
        continue;
      }

      paginatedThreads.push(thread);
      count += threadSize;
      if (paginatedThreads.length > 0 && count >= page * pageSize) {
        break;
      }
    }
    const total = allComments.length;

    return { comments: paginatedThreads, total };
  }
}
