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
    searchFarmers,
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
import { registerValidator } from "../validators/register-validator";
import { UpdateValidator } from "../validators/update-validator";

const adminRoutes = Router()

//Admin Management
adminRoutes.post('/register-admin',registerAdminValidator, registerAdmin)
adminRoutes.post('/login-admin',loginValidator, loginAdmin)
adminRoutes.get('/get-admins', getAdmins)
adminRoutes.put('/update-admin/:id',authenticateAdmin,UpdateAdminValidator,IdValidator, updateAdmin)
adminRoutes.delete('/delete-admin/:id', authenticateAdmin,IdValidator, deleteAdmin)

// Subadmin Management
adminRoutes.post('/add-subadmin',authenticateAdmin,registerAdminValidator, addSubAdmin);
adminRoutes.put('/edit-subadmin/:id',authenticateAdmin,UpdateAdminValidator,IdValidator, editSubAdmin);
adminRoutes.get('/subadmin/:id',authenticateAdmin,IdValidator, getSubAdminDetails);
adminRoutes.delete('/delete-subadmin/:id',authenticateAdmin,IdValidator, deleteSubAdmin);

//Farmer Management
adminRoutes.post('/add-farmer',authenticateAdmin,registerValidator, addFarmer)
adminRoutes.put('/edit-farmer/:id',authenticateAdmin,UpdateValidator, IdValidator, editFarmer)
adminRoutes.get('/farmer/:id',authenticateAdmin,IdValidator, getFarmerDetails)
adminRoutes.delete('/delete-farmer/:id',authenticateAdmin,IdValidator, deleteFarmer)
adminRoutes.get('/search-buyers', authenticateAdmin, searchFarmers)

//Buyer Management
adminRoutes.put('/approve-buyer-kyc/:buyerId',authenticateAdmin,IdValidator, approveBuyerKYC)
adminRoutes.put('/reject-buyer-kyc/:buyerId', authenticateAdmin,IdValidator, rejectBuyerKYC)
adminRoutes.get('/buyers',authenticateAdmin, lisAllBuyers)
adminRoutes.get('/kyc-pending-buyers',authenticateAdmin, listKYCPendingBuyers)
adminRoutes.get('/buyer/:buyerId',authenticateAdmin,IdValidator, getBuyerDetails)
adminRoutes.delete('/delete-buyer/:buyerId',authenticateAdmin,IdValidator, deleteBuyer)
adminRoutes.put('/block-buyer/:buyerId',authenticateAdmin,IdValidator, blockBuyer)
adminRoutes.put('/unblock-buyer/:buyerId',authenticateAdmin,IdValidator, unblockBuyer)
adminRoutes.get('/search-buyers',authenticateAdmin, searchBuyers)

// Category Management
adminRoutes.post('/create-category',authenticateAdmin,categoryValidator, createCategory)
adminRoutes.get('/categories',authenticateAdmin, listCategories)
adminRoutes.get('/category/:id',authenticateAdmin,IdValidator, getCategoryDetails)
adminRoutes.put('/update-category/:id',authenticateAdmin,categoryValidator, IdValidator, updateCategory)
adminRoutes.delete('/delete-category/:id',authenticateAdmin,IdValidator, deleteCategory)

// Product Management
adminRoutes.post('/create-product',authenticateAdmin, productValidator, createProduct)
adminRoutes.post('/image-upload', imageUploadController.uploadImage)
adminRoutes.get('/products',authenticateAdmin, listProducts)
adminRoutes.get('/product/:id',authenticateAdmin,IdValidator, getProductDetails)
adminRoutes.put('/update-product/:id',authenticateAdmin, productValidator, IdValidator, updateProduct)
adminRoutes.delete('/delete-product/:id',authenticateAdmin,IdValidator, deleteProduct)
adminRoutes.put('/approve-reject-farmer-products/:productId/:farmerId',authenticateAdmin,IdValidator, approveRejectFarmerProducts)

// Shipment Management
adminRoutes.post('/create-shipment',authenticateAdmin,shipmentValidator, createShipment)
adminRoutes.get('/shipments',authenticateAdmin, listShipments)
adminRoutes.get('/shipment/:id',authenticateAdmin,IdValidator, getShipmentDetails)
adminRoutes.put('/update-shipment/:id',authenticateAdmin,shipmentValidator, IdValidator, updateShipment)
adminRoutes.delete('/delete-shipment/:id',authenticateAdmin,IdValidator, deleteShipment)

export default adminRoutes