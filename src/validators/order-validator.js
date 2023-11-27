import Joi from "joi";
import { errorResponse } from "../middleware/response";

const orderValidation = Joi.object({
    buyerId: Joi.string().required(),
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
  });
  
  export const orderValidator = (req, res, next) => {
    try {
      const { error } = orderValidation.validate(req.body);
      if (error) {
        return errorResponse(res, 400, { error: error.details[0].message });
      }
      next();
    } catch (err) {
      console.error(err);
      errorResponse(res, 500, 'Internal Server Error');
    }
  }