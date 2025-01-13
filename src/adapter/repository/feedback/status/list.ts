import {AdapterParams} from '@/adapter/types';
import {Prisma} from '@prisma/client'
import {IStatus} from '@/domain/entity/status';

type Params = Pick<AdapterParams, 'db'>

type List = (params:Prisma.StatusFindManyArgs)=>Promise<Array<IStatus> | never>
const buildList = ({db}: Params): List=>{
  return async (getParams )=>{
    return await db.client.status.findMany(getParams) as Array<IStatus>
  }
}

export type StatusRepository = {
  list: List,
}
export const buildStatusRepository = (params: Params): StatusRepository=>{
  const list = buildList(params)

  return {
    list,
  }
}

