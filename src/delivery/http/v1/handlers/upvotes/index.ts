import Express from 'express';
import {DeliveryParams} from '@/delivery/types';
import {createRouteHandler} from '@/delivery/http/v1/routeHandler';
import {IHandler} from '@/delivery/http/v1/handlers/types';
import {buildCreateVoice, CreateVoice} from '@/delivery/http/v1/handlers/upvotes/createVoice';
import {buildDeleteVoice, DeleteVoice} from '@/delivery/http/v1/handlers/upvotes/deleteVoice';
import {checkCreateVoice, checkDeleteVoice} from '@/delivery/http/v1/handlers/upvotes/upvoteValidator';

type Params = Pick<DeliveryParams, 'upvote'>;

export type UpvoteMethods = {
    create: CreateVoice;
    remove: DeleteVoice;
}

const buildRegisterRoutes = (methods: UpvoteMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router()

    /**
       * @openapi
       * /upvote/create:
       *   post:
       *     tags: [Upvote]
       *     security:
       *      - bearerAuth: []
       *     description: Create a new voice.
       *     produces:
       *       - application/json
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               feedbackId:
       *                 type: string
       *     responses:
       *       201:
       *         description: Voice created successfully.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/entities/Upvote'
       */
    namespace.post(
      '/create',
      checkCreateVoice,
      createRouteHandler(methods.create)
    )

    /**
       * @openapi
       * /upvote/{id}:
       *   delete:
       *     tags: [Upvote]
       *     security:
       *       - bearerAuth: []
       *     description: Delete a voice by ID.
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *         schema:
       *           type: string
       *     responses:
       *       204:
       *         description: Voice deleted successfully.
       *       403:
       *         description: Forbidden.
       *       404:
       *         description: Voice not found.
       */
    namespace.delete(
      '/:id',
      checkDeleteVoice,
      createRouteHandler(methods.remove)
    )

    root.use('/upvote', namespace)
  }
}


export const buildUpvoteHandler = (params: Params): IHandler => {
  const create = buildCreateVoice(params)
  const remove = buildDeleteVoice(params)

  return {
    registerRoutes: buildRegisterRoutes(
      {
        create,
        remove
      }
    )
  }
}
