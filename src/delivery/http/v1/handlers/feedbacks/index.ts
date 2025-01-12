import Express from 'express';
import {DeliveryParams} from '@/delivery/types';
import {buildGetFeedback, GetFeedback} from '@/delivery/http/v1/handlers/feedbacks/getFeedback';
import {createRouteHandler} from '@/delivery/http/v1/routeHandler';
import {buildDeleteFeedback, DeleteFeedback} from '@/delivery/http/v1/handlers/feedbacks/deleteFeedback';
import {buildCreateFeedback, CreateFeedback} from '@/delivery/http/v1/handlers/feedbacks/createFeedback';
import {
  checkCreateFeedback,
  checkDeleteFeedback,
  checkUpdateFeedback
} from '@/delivery/http/v1/handlers/feedbacks/feedbackValidator';
import {buildUpdateFeedback, UpdateFeedback} from '@/delivery/http/v1/handlers/feedbacks/updateFeedback';
import {IHandler} from '@/delivery/http/v1/handlers/types';

type Params = Pick<DeliveryParams, 'feedbacks'>;

export type FeedbacksMethods = {
    getById: GetFeedback;
    create: CreateFeedback;
    update: UpdateFeedback;
    remove: DeleteFeedback;
}

const buildRegisterRoutes = (methods: FeedbacksMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router()

    /**
       * @openapi
       * /feedbacks/create:
       *   post:
       *     tags: [Feedbacks]
       *     security:
       *      - bearerAuth: []
       *     description: Create a new feedback.
       *     produces:
       *       - application/json
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               title:
       *                 type: string
       *               description:
       *                 type: string
       *               categoryId:
       *                 type: string
       *               statusId:
       *                 type: string
       *     responses:
       *       200:
       *         description: Feedback created successfully.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/entities/Feedback'
       */
    namespace.post(
      '/create',
      checkCreateFeedback,
      createRouteHandler(methods.create)
    )

    /**
       * @openapi
       * /feedbacks/{id}:
       *   delete:
       *     tags: [Feedbacks]
       *     security:
       *       - bearerAuth: []
       *     description: Delete a feedback by ID.
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *         schema:
       *           type: string
       *     responses:
       *       204:
       *         description: Feedback deleted successfully.
       *       403:
       *         description: Forbidden.
       *       404:
       *         description: Feedback not found.
       */
    namespace.delete(
      '/:id',
      checkDeleteFeedback,
      createRouteHandler(methods.remove)
    )

    /**
       * @openapi
       * /feedbacks/{id}:
       *   put:
       *     tags: [Feedbacks]
       *     security:
       *      - bearerAuth: []
       *     description: Update feedback by ID.
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *         schema:
       *           type: string
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               title:
       *                 type: string
       *               description:
       *                 type: string
       *               categoryId:
       *                 type: string
       *               statusId:
       *                 type: string
       *     responses:
       *       204:
       *         description: Feedback updated successfully.
       *       403:
       *         description: Forbidden.
       *       404:
       *         description: Feedback not found.
       */
    namespace.put(
      '/:id',
      checkUpdateFeedback,
      createRouteHandler(methods.update)
    )

    /**
       * @openapi
       * /feedbacks/{id}:
       *   get:
       *     tags: [Feedbacks]
       *     description: Get a feedback by ID.
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *         schema:
       *           type: string
       *     responses:
       *       200:
       *         description: Feedback details.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/entities/Feedback'
       *       404:
       *         description: Feedback not found.
       */
    namespace.get(
      '/:id',
      createRouteHandler(methods.getById)
    )

    root.use('/feedbacks', namespace)
  }
}


export const buildFeedbackHandler = (params: Params): IHandler => {
  const getById = buildGetFeedback(params)
  const create = buildCreateFeedback(params)
  const update = buildUpdateFeedback(params)
  const remove = buildDeleteFeedback(params)

  return {
    registerRoutes: buildRegisterRoutes(
      {
        getById,
        create,
        update,
        remove
      }
    )
  }
}
