import {Response} from 'express';

import { DeliveryParams } from '@/delivery/types';
import {AuthRequest} from '@/delivery/http/v1/handlers/types';

type Params = Pick<DeliveryParams, 'upvote'>
export type DeleteVoice = (req: AuthRequest, res: Response)=>Promise<Response>
export const buildDeleteVoice = ({upvote}: Params): DeleteVoice=>{
  return async (req, res)=>{
    const feedback = await upvote.deleteVoice({
      userId: req.user.id,
      voiceId: req.params.feedbackId,
    })

    return res.status(204).json(feedback)
  }
}
