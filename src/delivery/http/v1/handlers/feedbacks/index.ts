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
import {
  buildListStatusesCategories,
  ListStatusesCategories
} from '@/delivery/http/v1/handlers/feedbacks/ListStatusesCategories';
import {buildListFeedbacks, ListFeedbacks} from '@/delivery/http/v1/handlers/feedbacks/listFeedbacks';

type Params = Pick<DeliveryParams, 'feedbacks'>;

export type FeedbacksMethods = {
    getById: GetFeedback;
    create: CreateFeedback;
    update: UpdateFeedback;
    remove: DeleteFeedback;
    listFeedbacks: ListFeedbacks;
    listStatusesCategories: ListStatusesCategories;
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
       * /feedbacks/list:
       *   get:
       *     tags: [Feedbacks]
       *     description: Retrieve a list of feedback items with optional filtering, sorting, and pagination.
       *     parameters:
       *       - in: query
       *         name: category
       *         required: false
       *         schema:
       *           type: string
       *         description: Filter feedbacks by category ID.
       *       - in: query
       *         name: status
       *         required: false
       *         schema:
       *           type: string
       *         description: Filter feedbacks by status ID.
       *       - in: query
       *         name: sortBy
       *         required: false
       *         schema:
       *           type: string
       *           enum: [created_at, upvotes]
       *         description: Sort feedbacks by creation date or number of upvotes.
       *       - in: query
       *         name: order
       *         required: false
       *         schema:
       *           type: string
       *           enum: [asc, desc]
       *         description: Sorting order (ascending or descending).
       *       - in: query
       *         name: pageSize
       *         required: false
       *         schema:
       *           type: integer
       *         description: Number of feedbacks per page.
       *       - in: query
       *         name: pageNumber
       *         required: false
       *         schema:
       *           type: integer
       *         description: Page number to retrieve.
       *     responses:
       *       200:
       *         description: Paginated list of feedback items.
       *         content:
       *           application/json:
       *             schema:
       *               $ref: '#/components/schemas/FeedbackPagination'
       */
    namespace.get(
      '/list',
      createRouteHandler(methods.listFeedbacks)
    )
      
    /**
       * @openapi
       * /feedbacks/list:
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
       *               $ref: '#/components/schemas/FeedbackPagination'
       */
    namespace.get(
      '/:id',
      createRouteHandler(methods.getById)
    )
      
    /**
       * @openapi
       * /feedbacks/reference/options:
       *   get:
       *     tags: [Feedbacks]
       *     description: Get available list of categories and statuses for feedback.
       *     responses:
       *       200:
       *         description: Successfully retrieved list of categories and statuses.
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 statuses:
       *                   type: array
       *                   items:
       *                     $ref: '#/components/entities/Status'
       *                   description: List of available statuses for feedback.
       *                 categories:
       *                   type: array
       *                   items:
       *                     $ref: '#/components/entities/Category'
       *                   description: List of available categories for feedback.
       */
    namespace.get(
      '/references/options',
      createRouteHandler(methods.listStatusesCategories)
    )

    root.use('/feedbacks', namespace)
  }
}


export const buildFeedbackHandler = (params: Params): IHandler => {
  const listStatusesCategories = buildListStatusesCategories(params);
  const getById = buildGetFeedback(params)
  const create = buildCreateFeedback(params)
  const update = buildUpdateFeedback(params)
  const remove = buildDeleteFeedback(params)
  const listFeedbacks = buildListFeedbacks(params)
  return {
    registerRoutes: buildRegisterRoutes(
      {
        listFeedbacks,
        getById,
        create,
        update,
        remove,
        listStatusesCategories
      }
    )
  }
}
