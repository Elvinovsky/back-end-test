import { Feedback } from '@prisma/client';

export interface IFeedback extends Feedback{}
/**
 * @openapi
 * components:
 *   entities:
 *     Feedback:
 *       required:
 *         - id
 *         - title
 *         - description
 *         - categoryId
 *         - statusId
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the feedback.
 *         title:
 *           type: string
 *           description: Title of the feedback.
 *         description:
 *           type: string
 *           description: Description of the feedback.
 *         categoryId:
 *           type: string
 *           format: uuid
 *           description: ID of the category associated with this feedback.
 *         statusId:
 *           type: string
 *           format: uuid
 *           description: ID of the status associated with this feedback.
 *         authorId:
 *           type: string
 *           format: uuid
 *           description: ID of the author of the feedback.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the feedback was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the feedback was last updated.
 *         upvote_count:
 *           type: integer
 *           description: The total number of upvotes for this feedback.
 *         upvotes:
 *           type: array
 *           description: List of upvotes associated with this feedback.
 *           items:
 *             $ref: '#/components/schemas/Upvote'
 */

export interface IFeedbackPagination {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: IFeedback[];
}

/**@openapi
 * components:
 *   schemas:
 *     FeedbackPagination:
 *       description: Paginated list of feedback items.
 *       required:
 *         - pagesCount
 *         - page
 *         - pageSize
 *         - totalCount
 *         - items
 *       properties:
 *         pagesCount:
 *           type: integer
 *           description: Total number of pages available.
 *         page:
 *           type: integer
 *           description: Current page number.
 *         pageSize:
 *           type: integer
 *           description: Number of items per page.
 *         totalCount:
 *           type: integer
 *           description: Total number of feedback items.
 *         items:
 *           type: array
 *           description: List of feedback items.
 *           items:
 *             $ref: '#/components/entities/Feedback'
 */
