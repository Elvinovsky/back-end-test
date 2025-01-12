import {UseCaseParams} from '@/domain/usecase/types';
import {InvalidDataError, NotFoundError} from '@/domain/errors';

export type Delete = (params:{
    id: string;
    feedbackId: string
}) => Promise<boolean | never>

export const buildDelete = ({adapter}: UseCaseParams): Delete=>{
  return async ({id, feedbackId})=>{
    const feedback = await adapter.feedBackRepository.get({
      where: {id:feedbackId},
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
        equals:id
      } }
    });

    if (!user || feedback.authorId !== user.id) {
      throw new InvalidDataError({
        code: 'FORBIDDEN'
      });
    }
    const result = await adapter.feedBackRepository.delete({
      where:{
        id:feedbackId
      }
    })

    return !!result
  }
}