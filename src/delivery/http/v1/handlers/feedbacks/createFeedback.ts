import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import {AuthRequest} from '@/delivery/http/v1/handlers/types';

type Params = Pick<DeliveryParams, 'feedbacks'>

export type CreateFeedback = (req: AuthRequest, res: Response)=>Promise<Response>
export const buildCreateFeedback = ({feedbacks}: Params): CreateFeedback=>{
  return async (req, res)=>{
    const data = await feedbacks.createPost({
      id: req.user.id,
      title: req.body.title,
      description: req.body.description,
      categoryId: req.body.categoryId,
      statusId: req.body.statusId
    });

    return res.status(200).json(data);
  }
}
