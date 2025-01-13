import { Response } from 'express';
import { DeliveryParams } from '@/delivery/types';
import {AuthRequest} from '@/delivery/http/v1/handlers/types';

type Params = Pick<DeliveryParams, 'upvote'>

export type CreateVoice = (req: AuthRequest, res: Response)=>Promise<Response>
export const buildCreateVoice = ({upvote}: Params): CreateVoice=>{
  return async (req, res)=>{
    const data = await upvote.createVoice({
      userId: req.user.id,
      feedbackId: req.body.feedbackId,
    });

    return res.status(201).json(data);
  }
}
