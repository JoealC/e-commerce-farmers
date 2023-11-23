import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { errorResponse } from './response';
import { Admin } from '../models/Admin';
import { Farmer } from '../models/Farmer';
import { Buyer } from '../models/Buyer';
config()

export const authenticateAdmin = async(req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return errorResponse (res,401, 'Unauthorized');
  }
  try{
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const adminId = await Admin.findById(decoded.objectId)
    if(adminId === null){
       return errorResponse(res, 403, 'Forbidden. Admin access required')
    }
    req.user = decoded
    next()
  }catch(err){
    console.log(err)
    errorResponse(res, 400, 'Invalid Token.')
  }
}

export const authenticateFarmer = async(req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
     return errorResponse (res,401, 'Unauthorized');
    }
    try{
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      const farmerId = await Farmer.findById(decoded.objectId)
      if(farmerId === null){
         return errorResponse(res, 403, 'Forbidden. Librarian access required')
      }
      req.user = decoded
      next()
    }catch(err){
      errorResponse(res, 400, 'Invalid Token.')
    }
  }

  export const authenticateBuyer = async(req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
     return errorResponse (res,401, 'Unauthorized');
    }
    try{
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      const BuyerId = await Buyer.findById(decoded.objectId)
      if(BuyerId === null){
         return errorResponse(res, 403, 'Forbidden. User access required')
      }
      req.user = decoded
      next()
    }catch(err){
      errorResponse(res, 400, 'Invalid Token.')
    }
  }
