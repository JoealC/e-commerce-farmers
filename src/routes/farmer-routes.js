import { Router } from "express";
import { authenticateBuyer, authenticateFarmer } from "../middleware/authenticationMiddleware";
import {
    registerFarmer,
    loginFarmer,
    editFarmer,
    deleteFarmer,
    listProducts,
    getProducts,
    createFarmerProduct,
    listOrders,
  } from '../controllers/farmer-controller'
import { loginValidator } from "../validators/login-validator";
import { registerValidator } from "../validators/register-validator";
import { IdValidator } from "../validators/Id-validator";
import { farmerProductValidator } from "../validators/farmerProduct-validator";
import { UpdateValidator } from "../validators/update-validator";
const farmerRoutes = Router()

//Farmer Authentication
farmerRoutes.post('/register-farmer',registerValidator, registerFarmer)
farmerRoutes.post('/login-farmer',loginValidator, loginFarmer)
farmerRoutes.put('/update-farmer/:id',authenticateFarmer, UpdateValidator, IdValidator, editFarmer)
farmerRoutes.delete('/delete-farmer/:id', authenticateFarmer, IdValidator, deleteFarmer)

//Farmer Products
farmerRoutes.post('/:farmerId/product',authenticateFarmer,farmerProductValidator, createFarmerProduct)
farmerRoutes.get('/farmer-products',authenticateFarmer, listProducts)
farmerRoutes.get('/products',authenticateFarmer, getProducts)

//Farmer Orders
farmerRoutes.get('/farmer/:farmerId/orders',authenticateFarmer,IdValidator, listOrders)

export default farmerRoutes