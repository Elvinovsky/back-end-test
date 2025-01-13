import { UseCaseParams } from '@/domain/usecase/types';
import {buildCreate, Create} from '@/domain/usecase/upvote/create';
import {buildDelete, Delete} from '@/domain/usecase/upvote/delete';

export type UpvoteUseCase = {
    createVoice: Create;
    deleteVoice: Delete;
}

export const buildUpvoteUseCase = (params: UseCaseParams): UpvoteUseCase => {
  const createVoice = buildCreate(params);
  const deleteVoice = buildDelete(params);

  return {
    createVoice,
    deleteVoice
  }
}
