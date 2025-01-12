import {Request, Response} from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'feedbacks'>
export type GetFeedback = (req: Request, res: Response)=>Promise<Response>
export const buildGetFeedback = ({feedbacks}: Params): GetFeedback=>{
  return async (req, res)=>{
    const feedback = await feedbacks.getPost({
      id: req.params.id
    })

    return res.status(200).json(feedback)
  }
}
