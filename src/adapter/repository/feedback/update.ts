import {AdapterParams, UnknownTx} from '@/adapter/types';
import {Prisma} from '@prisma/client'
import {IFeedback} from '@/domain/entity/feedback';

type Params = Pick<AdapterParams, 'db'>

export type Update = (params:Prisma.FeedbackUpdateArgs, tx?: UnknownTx)=>Promise<IFeedback | never>
export const buildUpdate = ({db}: Params): Update=>{
  return async (getParams, tx)=> {
    return await db.getContextClient(tx).feedback.update(getParams) as IFeedback
  }
}
