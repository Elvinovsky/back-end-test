import {AdapterParams} from '@/adapter/types';
import {Prisma} from '@prisma/client'
import {IUpvote} from '@/domain/entity/upvote';

type Params = Pick<AdapterParams, 'db'>

export type Get = (params:Prisma.UpvoteFindFirstArgs)=>Promise<IUpvote | null | never>
export const buildGet = ({db}: Params): Get => {
  return async (getParams )=>{
    return await db.client.upvote.findFirst(getParams) as IUpvote | null
  }
}
