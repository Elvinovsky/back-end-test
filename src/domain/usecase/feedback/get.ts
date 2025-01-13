import {UseCaseParams} from '@/domain/usecase/types';
import { NotFoundError } from '@/domain/errors';
import {IFeedback} from '@/domain/entity/feedback';

export type Get = (params: {
    id: string,
}) =>
    Promise<IFeedback | never>
export const buildGet = ({adapter}: UseCaseParams): Get=>{
  return async ({id})=>{
    const feedback = await adapter.feedBackRepository.get({
      where: {
        id
      },
      select: {
        id: true,
        authorId: true,
        title: true,
        upvote_count: true,
        description: true,
        status: true,
        category : true,
        created_at: true,
      }
    })

    if (!feedback){
      throw new NotFoundError({
        code: 'FEEDBACK_NOT_FOUND'
      })
    }

    return feedback
  }
}
