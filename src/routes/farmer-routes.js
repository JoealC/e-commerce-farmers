import { Router } from "express";
import { authenticateFarmer } from "../middleware/authenticationMiddleware";
import {
    registerFarmer,
    loginFarmer,
    listProducts,
    getProductDetails,
    createFarmerProduct,
    listOrders,
  } from '../controllers/farmer-controller'
import { registerAdminValidator } from "../validators/admin-validator";
import { loginValidator } from "../validators/login-validator";
import { IdValidator } from "../validators/Id-validator";
import { farmerProductValidator } from "../validators/farmerProduct-validator";

const farmerRoutes = Router()

//Farmer Authentication
farmerRoutes.post('/register-farmer',registerAdminValidator, registerFarmer)
farmerRoutes.post('/login-farmer',loginValidator, loginFarmer)

//Farmer Products
farmerRoutes.get('/farmer-products',authenticateFarmer, listProducts)
farmerRoutes.get('/farmer-product/:productId',authenticateFarmer, getProductDetails)
farmerRoutes.post('/farmer/:farmerId/product',authenticateFarmer,farmerProductValidator, IdValidator, createFarmerProduct)

//Farmer Orders
farmerRoutes.get('/farmer/:farmerId/orders',authenticateFarmer,IdValidator, listOrders)

export default farmerRoutes