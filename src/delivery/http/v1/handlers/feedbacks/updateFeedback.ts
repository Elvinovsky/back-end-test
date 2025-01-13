import {Response} from 'express';

import { DeliveryParams } from '@/delivery/types';
import {AuthRequest} from '@/delivery/http/v1/handlers/types';

type Params = Pick<DeliveryParams, 'feedbacks'>
export type UpdateFeedback = (req: AuthRequest, res: Response)=>Promise<Response>
export const buildUpdateFeedback = ({feedbacks}: Params): UpdateFeedback=>{
  return async (req, res)=>{
    const feedback = await feedbacks.updatePost({
      authorId: req.user.id,
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      categoryId: req.body.categoryId,
      statusId: req.body.statusId
    })

    return res.status(204).json(feedback)
  }
}
