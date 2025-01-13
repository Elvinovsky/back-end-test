import {IFeedbackPagination} from '@/domain/entity/feedback';
import {UseCaseParams} from '@/domain/usecase/types';
import {countTotalPages, offsetPagination} from '@/lib';

export type ListPosts = (params: {
  category?: string;
  status?: string;
  sortBy?: 'created_at' | 'upvotes';
  order?: 'asc' | 'desc';
  pageSize?: number;
  pageNumber?: number;
})=>Promise<IFeedbackPagination>

export const buildListPosts =  ({adapter}: UseCaseParams): ListPosts=>{
  return async ({
    category,
    status,
    sortBy = 'created_at',
    order = 'desc',
    pageSize = 10,
    pageNumber = 1,
  }) => {

    const where: Record<string, any> = {};
    if (category) where.category.name = category;
    if (status) where.status.name = status;

    const totalCount: number =  await adapter.feedBackRepository.count({ where });
    const pagesCount: number = countTotalPages(totalCount, pageSize);
    const offset = offsetPagination(pageNumber,pageSize)

    const feedbacks = await adapter.feedBackRepository.list({
      where,
      include: {
        category: true,
        status: true,
        author: {
          select: { email: true, avatar: true },
        },
        _count: {
          select: { Upvote: true },
        },
      },
      orderBy: {
        [sortBy === 'upvotes' ? '_count.Upvote' : 'created_at']: order,
      },
      take: pageSize,
      skip: offset,
    });

    return {
      pagesCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      items: feedbacks
    };
  };
}
