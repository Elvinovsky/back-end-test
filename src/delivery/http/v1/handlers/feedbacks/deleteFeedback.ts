import {Response} from 'express';

import { DeliveryParams } from '@/delivery/types';
import {AuthRequest} from '@/delivery/http/v1/handlers/types';

type Params = Pick<DeliveryParams, 'feedbacks'>
export type DeleteFeedback = (req: AuthRequest, res: Response)=>Promise<Response>
export const buildDeleteFeedback = ({feedbacks}: Params): DeleteFeedback=>{
  return async (req, res)=>{
    const feedback = await feedbacks.deletePost({
      id: req.user.id,
      feedbackId: req.params.feedbackId,
    })

    return res.status(200).json(feedback)
  }
}
