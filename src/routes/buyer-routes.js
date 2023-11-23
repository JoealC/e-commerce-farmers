import { Router } from "express";
import { authenticateBuyer } from "../middleware/authenticationMiddleware";
import imageUploadController from "../middleware/Upload";
import {
    registerBuyer,
    loginBuyer,
    uploadKYC,
    listFarmerProducts,
    getFarmerProductDetails,
    orderFarmerProduct,
    listOrders,
  } from '../controllers/buyer-controller'
import { registerAdminValidator } from "../validators/admin-validator";
import { loginValidator } from "../validators/login-validator";
import { IdValidator } from "../validators/Id-validator";


const buyerRoutes = Router()


//Buyer Authentication
buyerRoutes.post('/register-buyer',registerAdminValidator, registerBuyer)
buyerRoutes.post('/login-buyer',loginValidator, loginBuyer)

//Buyer KYC
buyerRoutes.post('/upload-kyc/:buyerId', IdValidator, imageUploadController.uploadImage, authenticateBuyer, uploadKYC)

//Farmer Products
buyerRoutes.get('/farmer-products',authenticateBuyer, listFarmerProducts)
buyerRoutes.get('/farmer-product/:productId',authenticateBuyer,IdValidator, getFarmerProductDetails)

//Order Management
buyerRoutes.post('/order-farmer-product',authenticateBuyer, orderFarmerProduct)
buyerRoutes.get('/orders/:buyerId',authenticateBuyer,IdValidator, listOrders)

export default buyerRoutes