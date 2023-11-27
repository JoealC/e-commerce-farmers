import Joi from 'joi';
import { errorResponse } from '../middleware/response';

const farmerProductValidation = Joi.object({
  name: Joi.string().min(3).max(200).required(),
  quantity: Joi.number().min(0).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().required(),
});

export const farmerProductValidator = (req, res, next) => {
  try {
    const { error } = farmerProductValidation.validate(req.body);
    if (error) {
      return errorResponse(res, 400, { error: error.details[0].message });
    }
    next();
  } catch (err) {
    console.error(err);
    errorResponse(res, 500, 'Internal Server Error');
  }
};
