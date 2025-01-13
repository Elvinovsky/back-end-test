import {Category} from '@prisma/client';

export interface ICategory extends Category{}

/**
 * @openapi
 * components:
 *   entities:
 *     Category:
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the category.
 *         name:
 *           type: string
 *           description: The name of the category.
 */