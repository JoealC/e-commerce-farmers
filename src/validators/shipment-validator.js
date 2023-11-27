import Joi from 'joi';
import { errorResponse } from '../middleware/response'

const shipmentValidation = Joi.object({
  from_Country: Joi.string().min(2).max(50).required(),
  to_Country: Joi.string().min(2).max(50).required(),
  cost: Joi.number().min(0).required(),
});

export const shipmentValidator = (req, res, next) => {
  try {
    const { error } = shipmentValidation.validate(req.body);
    if (error) {
      return errorResponse(res, 400, { error: error.details[0].message });
    }
    next();
  } catch (err) {
    console.error(err);
    errorResponse(res, 500, 'Internal Server Error');
  }
};
