import { UseCaseParams } from '../types';
import { InvalidDataError } from '@/domain/errors';

export type Create = (
	params: {
		feedbackId: string;
		userId: string;
	}) => Promise<{ id:string }>;

export const buildCreate = ({ adapter }: UseCaseParams): Create => {
  return async ({feedbackId, userId }) => {
    const user = await adapter.userRepository.get({
      where: { id:{
        equals:userId
      } }
    });

    if (!user) {
      throw new InvalidDataError({
        code: 'FORBIDDEN'
      });
    }

    await adapter.feedBackRepository.update({
      where: { id: feedbackId },
      data: {
        upvote_count: { increment: 1 },
      },
    });

    return adapter.upvoteRepository.createVoice({
      data: {
        userId: user.id,
        feedbackId,
      },
      select: {
        id: true,
      }
    });
  };
}