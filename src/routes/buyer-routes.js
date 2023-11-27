import { Router } from "express";
import { authenticateBuyer } from "../middleware/authenticationMiddleware";
import imageUploadController from "../middleware/Upload";
import {
    registerBuyer,
    loginBuyer,
    uploadKYC,
    updateBuyer,
    deleteBuyer,
    listFarmerProducts,
    getFarmerProductDetails,
    orderFarmerProduct,
    listOrders,
  } from '../controllers/buyer-controller'
import { registerValidator } from "../validators/register-validator";
import { loginValidator } from "../validators/login-validator";
import { IdValidator } from "../validators/Id-validator";
import { orderValidator } from "../validators/order-validator";
import { UpdateValidator } from "../validators/update-validator";


const buyerRoutes = Router()


//Buyer Authentication
buyerRoutes.post('/register-buyer',registerValidator, registerBuyer)
buyerRoutes.post('/login-buyer',loginValidator, loginBuyer)
buyerRoutes.put('/update-buyer/:id',  authenticateBuyer, UpdateValidator,IdValidator, updateBuyer)
buyerRoutes.delete('/delete-buyer/:buyerId',authenticateBuyer,IdValidator, deleteBuyer)


//Buyer KYC
buyerRoutes.post('/upload-kyc/:buyerId', authenticateBuyer, IdValidator, imageUploadController.uploadImage, uploadKYC)

//Farmer Products
buyerRoutes.get('/farmer-products',authenticateBuyer, listFarmerProducts)
buyerRoutes.get('/farmer-product/:productId',authenticateBuyer,IdValidator, getFarmerProductDetails)

//Order Management
buyerRoutes.post('/order-farmer-product',authenticateBuyer, orderValidator,  orderFarmerProduct)
buyerRoutes.get('/orders/:buyerId',authenticateBuyer, IdValidator, listOrders)

export default buyerRoutes