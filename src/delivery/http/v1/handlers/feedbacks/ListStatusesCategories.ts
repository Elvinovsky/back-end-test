import {Request, Response} from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'feedbacks'>
export type ListStatusesCategories = (req: Request, res: Response)=>Promise<Response>
export const buildListStatusesCategories = ({feedbacks}: Params): ListStatusesCategories=>{
  return async (req, res)=>{
    const result = await feedbacks.getReference()

    return res.status(200).json(result)
  }
}
