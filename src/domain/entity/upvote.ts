import {Upvote} from '@prisma/client';

export interface IUpvote extends Upvote{}

/**
 * @openapi
 * components:
 *   entities:
 *     Upvote:
 *       required:
 *         - id
 *         - feedbackId
 *         - userId
 *         - created_at
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the feedback.
 *         feedbackId:
 *           type: string
 *           format: uuid
 *           description: ID of the feedback associated with this upvote.
 *         userId:
 *           type: string
 *           format: uuid
 *           description: ID of the user associated with this upvote.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the upvote was created.
 */