import { AdapterParams } from '@/adapter/types';
import { buildDelete, Delete } from './delete';
import { buildUpdate, Update } from './update';
import { List, buildList } from './list';
import { buildCreate, Create} from './create'
import { buildGet, Get} from './get'
import {buildCount, Count} from '@/adapter/repository/feedback/count';

type Params = Pick<AdapterParams, 'db'>

export type FeedbackRepository = {
    create: Create,
    delete: Delete,
    get: Get,
    list: List,
    update: Update,
    count: Count,
}
export const buildFeedbackRepository = (params: Params): FeedbackRepository=>{
  const create = buildCreate(params)
  const deleteUser = buildDelete(params)
  const get = buildGet(params)
  const list = buildList(params)
  const update = buildUpdate(params)
  const count = buildCount(params)

  return {
    create,
    delete: deleteUser,
    get,
    list,
    update,
    count
  }
}
