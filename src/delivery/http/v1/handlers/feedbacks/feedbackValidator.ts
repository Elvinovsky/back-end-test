import { check, header } from 'express-validator'
import { authRequired, validateSchema } from '../../middlewares'


export const checkCreateFeedback = [
  header('authorization').exists().notEmpty().isString(),
  authRequired({}),
  check('title').exists().notEmpty().isString(),
  check('description').exists().notEmpty().isString().isLength({min:10, max:150}),
  check('categoryId').exists().notEmpty().isUUID(),
  check('statusId').exists().notEmpty().isUUID(),
  validateSchema
];


export const checkUpdateFeedback = [
  header('authorization').exists().notEmpty().isString(),
  authRequired({}),
  check('title').optional().isString(),
  check('description').optional().isString().isLength({min:10, max:150}),
  check('categoryId').optional().isUUID(),
  check('statusId').optional().isUUID(),
  validateSchema
];


export const  checkDeleteFeedback = [
  header('authorization').exists().notEmpty().isString(),
  authRequired({}),
  validateSchema
];

