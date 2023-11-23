import { Router } from "express";
import { authenticateAdmin } from "../middleware/authenticationMiddleware";
import {
    registerAdmin,
    loginAdmin,
    getAdmins,
    updateAdmin,
    deleteAdmin,
    addSubAdmin,
    editSubAdmin,
    getSubAdminDetails,
    deleteSubAdmin,
    addFarmer,
    editFarmer,
    getFarmerDetails,
    deleteFarmer,
    approveBuyerKYC,
    rejectBuyerKYC,
    lisAllBuyers,
    listKYCPendingBuyers,
    getBuyerDetails,
    deleteBuyer,
    blockBuyer,
    unblockBuyer,
    searchBuyers,
    createCategory,
    listCategories,
    getCategoryDetails,
    updateCategory,
    deleteCategory,
    createProduct,
    listProducts,
    getProductDetails,
    updateProduct,
    deleteProduct,
    approveRejectFarmerProducts,
    createShipment,
    listShipments,
    getShipmentDetails,
    updateShipment,
    deleteShipment,
  } from '../controllers/admin-controller'
import imageUploadController from "../middleware/Upload";
import { UpdateAdminValidator, registerAdminValidator } from "../validators/admin-validator";
import { loginValidator } from "../validators/login-validator";
import { IdValidator } from "../validators/Id-validator";
import { categoryValidator } from "../validators/category-validator";
import { productValidator } from "../validators/product-validator";
import { shipmentValidator } from "../validators/shipment-validator";

const adminRoutes = Router()

//Admin Management
adminRoutes.post('/register-admin',registerAdminValidator, registerAdmin)
adminRoutes.post('/login-admin',loginValidator, loginAdmin)
adminRoutes.get('/admins', getAdmins)
adminRoutes.put('/update-admin/:id',authenticateAdmin,UpdateAdminValidator,IdValidator, updateAdmin)
adminRoutes.delete('/delete-admin/:id', authenticateAdmin,IdValidator, deleteAdmin)

// Subadmin Management
adminRoutes.post('/add-subadmin',authenticateAdmin,registerAdminValidator, addSubAdmin);
adminRoutes.put('/edit-subadmin/:id',authenticateAdmin,UpdateAdminValidator,IdValidator, editSubAdmin);
adminRoutes.get('/subadmin/:subAdminId',authenticateAdmin, getSubAdminDetails);
adminRoutes.delete('/delete-subadmin/:subAdminId',authenticateAdmin,IdValidator, deleteSubAdmin);

//Farmer Management
adminRoutes.post('/add-farmer',authenticateAdmin,registerAdminValidator, addFarmer)
adminRoutes.put('/edit-farmer/:id',authenticateAdmin,UpdateAdminValidator, editFarmer)
adminRoutes.get('/farmer/:farmerId',authenticateAdmin, getFarmerDetails)
adminRoutes.delete('/delete-farmer/:farmerId',authenticateAdmin,IdValidator, deleteFarmer)

//Buyer Management
adminRoutes.put('/approve-buyer-kyc/:buyerId',authenticateAdmin,IdValidator, approveBuyerKYC)
adminRoutes.put('/reject-buyer-kyc/:buyerId', authenticateAdmin,IdValidator, rejectBuyerKYC)
adminRoutes.get('/buyers',authenticateAdmin, lisAllBuyers)
adminRoutes.get('/kyc-pending-buyers',authenticateAdmin, listKYCPendingBuyers)
adminRoutes.get('/buyer/:buyerId',authenticateAdmin,IdValidator, getBuyerDetails)
adminRoutes.delete('/delete-buyer/:buyerId',authenticateAdmin, deleteBuyer)
adminRoutes.put('/block-buyer/:buyerId',authenticateAdmin,IdValidator, blockBuyer)
adminRoutes.put('/unblock-buyer/:buyerId',authenticateAdmin,IdValidator, unblockBuyer)
adminRoutes.get('/search-buyers',authenticateAdmin, searchBuyers)

// Category Management
adminRoutes.post('/create-category',authenticateAdmin,categoryValidator, createCategory)
adminRoutes.get('/categories',authenticateAdmin, listCategories)
adminRoutes.get('/category/:categoryId',authenticateAdmin,IdValidator, getCategoryDetails)
adminRoutes.put('/update-category/:categoryId',authenticateAdmin,categoryValidator, IdValidator, updateCategory)
adminRoutes.delete('/delete-category/:categoryId',authenticateAdmin, deleteCategory)

// Product Management
adminRoutes.post('/create-product',authenticateAdmin, productValidator, imageUploadController.uploadImage, createProduct)
adminRoutes.get('/products',authenticateAdmin, listProducts)
adminRoutes.get('/product/:productId',authenticateAdmin,IdValidator, getProductDetails)
adminRoutes.put('/update-product/:productId',authenticateAdmin, productValidator, IdValidator, imageUploadController.uploadImage, updateProduct)
adminRoutes.delete('/delete-product/:productId',authenticateAdmin, deleteProduct)
adminRoutes.put('/approve-reject-farmer-products/:productId/:farmerId',authenticateAdmin, approveRejectFarmerProducts)

// Shipment Management
adminRoutes.post('/create-shipment',authenticateAdmin,shipmentValidator, createShipment)
adminRoutes.get('/shipments',authenticateAdmin, listShipments)
adminRoutes.get('/shipment/:shipmentId',authenticateAdmin,IdValidator, getShipmentDetails)
adminRoutes.put('/update-shipment/:shipmentId',authenticateAdmin,shipmentValidator, IdValidator, updateShipment)
adminRoutes.delete('/delete-shipment/:shipmentId',authenticateAdmin, deleteShipment)

export default adminRoutes