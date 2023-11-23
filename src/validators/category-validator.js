import Joi from "joi";
import { errorResponse } from "../middleware/response";

const categoryValidation = Joi.object({
    name: Joi.string().min(3).max(200).required(),
    description:  Joi.string().min(3).max(200).required(),
})

export const categoryValidator = (req, res, next) => {
    try{
        const {error} = categoryValidation.validate(req.body)
        if(error){
            return errorResponse(res, 400, {error: error.details[0].message})
        }
        next()
    }catch(err){
        console.log(err)
        errorResponse(res, 500, "Internal Server Error")
    }
}