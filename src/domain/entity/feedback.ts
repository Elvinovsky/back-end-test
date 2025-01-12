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
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the feedback was created.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the feedback was last updated.
 */