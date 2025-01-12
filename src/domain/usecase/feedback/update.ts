import { UseCaseParams } from '../types';
import {InvalidDataError, NotFoundError} from '@/domain/errors';

export type Update = (data: {
    authorId: string;
    id: string,
    title?: string;
    description?: string;
    categoryId?: string;
    statusId?: string;
}) =>
    Promise<boolean | never>

export const buildUpdate = ({ adapter }: UseCaseParams): Update=>{
  return async ({authorId, id, title, description, categoryId, statusId })=> {

    const feedback = await adapter.feedBackRepository.get({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        authorId: true
      }
    })

    if (!feedback) {
      throw new NotFoundError({
        code: 'FEEDBACK_NOT_FOUND'
      });
    }
      
    const user = await adapter.userRepository.get({
      where: { id:{
        equals:authorId
      } }
    });

    if (!user || feedback.authorId !== user.id) {
      throw new InvalidDataError({
        code: 'FORBIDDEN'
      });
    }

    const updatedFeedback =  await adapter.feedBackRepository.update({where:{id},
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(categoryId && { categoryId }),
        ...(statusId && { statusId }),
      }
    })

    return !!updatedFeedback;
  }
}
