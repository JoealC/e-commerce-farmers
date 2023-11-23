import mongoose from "mongoose";

const idValidator = (id) => {
    return new Promise((resolve, reject) => {
        if(mongoose.Types.ObjectId.isValid(id)){
            resolve(true)
        }else{
            reject(false)
        }
    })
}

export const IdValidator = async(req, res, next) => {
    try{
        if((await idValidator(req.params.id)) == true){
            next()
        }else{
            return errorResponse(res, 400, "Invalid class ID")
        }
    }catch(err){
        console.log(err)
        errorResponse(res, 500, "Internal Server Error")
    }
}

