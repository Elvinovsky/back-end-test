import {UseCaseParams} from '@/domain/usecase/types';
import {InvalidDataError, NotFoundError} from '@/domain/errors';

export type Delete = (params:{
    userId: string;
    voiceId: string
}) => Promise<boolean | never>

export const buildDelete = ({adapter}: UseCaseParams): Delete=>{
  return async ({userId, voiceId})=>{
    const voice = await adapter.upvoteRepository.getVoice({
      where: {id:voiceId},
      select: {
        id: true,
        userId: true,
        feedbackId:true
      }
    })

    if (!voice) {
      throw new NotFoundError({
        code: 'VOICE_NOT_FOUND'
      });
    }

    const user = await adapter.userRepository.get({
      where: { id:{
        equals:userId
      } }
    });

    if (!user || voice.userId !== user.id) {
      throw new InvalidDataError({
        code: 'FORBIDDEN'
      });
    }

    const result = await adapter.upvoteRepository.deleteVoice({
      where:{
        id:voiceId
      }
    })

    return !!result
  }
}