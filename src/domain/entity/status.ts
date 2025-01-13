import {Status} from '@prisma/client';

export interface IStatus extends Status{}

/**
 * @openapi
 * components:
 *   entities:
 *     Status:
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the status.
 *         name:
 *           type: string
 *           description: The name of the status.
 */