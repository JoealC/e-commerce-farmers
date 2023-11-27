import Joi, { string } from 'joi';
import { errorResponse } from '../middleware/response';

const productValidation = Joi.object({
  name: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(3).max(200).required(),
  price: Joi.number().required(),
  category: Joi.string().min(3).max(200).required(),
  images: Joi.array().items(Joi.string().uri()),
});

export const productValidator = (req, res, next) => {
  try {
    const { error } = productValidation.validate(req.body);
    if (error) {
      return errorResponse(res, 400, { error: error.details[0].message });
    }
    next();
  } catch (err) {
    console.log(err);
    errorResponse(res, 500, 'Internal Server Error');
  }
};
