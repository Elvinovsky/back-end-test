import {check, header} from 'express-validator';
import {authRequired, validateSchema} from '@/delivery/http/v1/middlewares';

export const  checkDeleteVoice = [
  header('authorization').exists().notEmpty().isString(),
  authRequired({}),
  validateSchema
];

export const  checkCreateVoice = [
  header('authorization').exists().notEmpty().isString(),
  authRequired({}),
  check('feedbackId').exists().notEmpty().isUUID(),
  validateSchema
];