import Joi from "joi";
import { errorResponse } from "../middleware/response";

const adminValidation = Joi.object({
    username: Joi.string().min(3).max(200).required(),
    password: Joi.string().min(6).max(200).required(),
    email: Joi.string().min(5).max(200).required(),
    status: Joi.number()

})


export const registerAdminValidator = (req, res, next) => {
    try{
        const {error} = adminValidation.validate(req.body)
        if(error){
            return errorResponse(res, 400, {error: error.details[0].message})
        }
        next()
    }catch(err){
        console.log(err)
        errorResponse(res, 500, "Internal Server Error")
    }
}

export const UpdateAdminValidator = (req, res, next)=>{
    try{
        const {error} = adminValidation.validate(req.body)
        if(error){
            return errorResponse(res, 400, {error: error.details[0].message})
        }
        next()
    }catch(err){
        console.log(err)
        errorResponse(res, 500, "Internal Server Error")
    }
}