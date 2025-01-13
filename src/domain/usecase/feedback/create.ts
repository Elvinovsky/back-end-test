import { UseCaseParams } from '../types';
import { InvalidDataError } from '@/domain/errors';
import {IFeedback} from '@/domain/entity/feedback';

export type Create = (
	params: {
		id: string
		title: string;
		description: string;
		categoryId: string;
		statusId: string;
	}) => Promise<IFeedback>;

export const buildCreate = ({ adapter }: UseCaseParams): Create => {
  return async ({id, title, description, categoryId, statusId }) => {
    const user = await adapter.userRepository.get({
      where: { id: id }
    });

    console.log(user, id)

    if (!user) {
      throw new InvalidDataError({
        code: 'FORBIDDEN'
      });
    }


    return adapter.feedBackRepository.create({
      data: {
        authorId: user.id,
        title,
        description,
        categoryId,
        statusId
      },
      select: {
        id: true,
        author:true,
        authorId: true,
        title: true,
        description: true,
        category: true,
        status: true,
        created_at: true,
        updated_at: true,
      }
    });
  };
}