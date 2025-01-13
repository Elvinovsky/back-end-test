import { AdapterParams } from '@/adapter/types';
import { buildDelete, Delete } from './delete';
import { buildCreate, Create} from './create'
import {buildGet, Get} from '@/adapter/repository/upvote/get';

type Params = Pick<AdapterParams, 'db'>

export type UpvoteRepository = {
    createVoice: Create,
    deleteVoice: Delete,
    getVoice: Get,
}
export const buildUpvoteRepository = (params: Params): UpvoteRepository=>{
  const createVoice = buildCreate(params)
  const deleteVoice = buildDelete(params)
  const getVoice =buildGet(params)

  return {
    createVoice,
    deleteVoice,
    getVoice
  }
}
