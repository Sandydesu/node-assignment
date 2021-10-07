import * as Joi from 'joi-oid';

export const reviewReqParamsSchema = Joi.object({
  book_id: Joi.objectId().required(),
});

export const reviewPostReqSchema = Joi.object({
  reviewer: Joi.string().required(),
  message: Joi.string().required(),
});

export const reviewGetReqParamsSchema = Joi.object({
  book_id: Joi.objectId().required(),
  review_id: Joi.objectId().required(),
});
