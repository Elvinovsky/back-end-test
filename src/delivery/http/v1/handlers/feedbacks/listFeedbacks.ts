import {Request, Response} from 'express';

import { DeliveryParams } from '@/delivery/types';

type Params = Pick<DeliveryParams, 'feedbacks'>
export type ListFeedbacks = (req: Request, res: Response)=>Promise<Response>
export const buildListFeedbacks = ({feedbacks}: Params): ListFeedbacks=>{
  return async (req, res)=>{
    const { category, status, sortBy, order, pageSize, pageNumber } = req.query;

    const feedback = await feedbacks.listPosts({
      category: category as string,
      status: status as string,
      sortBy: sortBy as 'created_at' | 'upvotes',
      order: order as 'asc' | 'desc',
      pageSize: pageSize ? parseInt(pageSize as string, 10) : undefined,
      pageNumber: pageNumber ? parseInt(pageNumber as string, 10) : undefined,
    });

    return res.status(200).json(feedback)
  }
}
