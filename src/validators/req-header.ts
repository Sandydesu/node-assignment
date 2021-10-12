import * as Joi from 'joi-oid';

export const reqHeaderSchema = Joi.object({
  'transaction-id': Joi.string().required(),
  authorization: Joi.string().required(),
});
