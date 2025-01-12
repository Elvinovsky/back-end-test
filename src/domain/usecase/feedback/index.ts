import { UseCaseParams } from '@/domain/usecase/types';
import {buildCreate, Create} from '@/domain/usecase/feedback/create';
import {buildGet, Get} from '@/domain/usecase/feedback/get';
import {buildUpdate, Update} from '@/domain/usecase/feedback/update';
import {buildDelete, Delete} from '@/domain/usecase/feedback/delete';

export type FeedBackUseCase = {
    createPost: Create;
    updatePost: Update;
    deletePost: Delete;
    getPost: Get;
}

export const buildAFeedBackUseCase = (params: UseCaseParams): FeedBackUseCase => {
  const createPost = buildCreate(params);
  const getPost = buildGet(params);
  const updatePost = buildUpdate(params);
  const deletePost = buildDelete(params);

  return {
    createPost,
    updatePost,
    deletePost,
    getPost,
  }
}
