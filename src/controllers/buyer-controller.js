import { Buyer } from "../models/Buyer";
import { FarmerProduct } from "../models/FarmerProduct";
import { Order } from "../models/Oder";
import { Shipment } from "../models/Shipment";
import bcrypt from 'bcrypt'
import { sign } from "jsonwebtoken";
import { sendEmail } from "../utils/notification-service";
import { successResponse, errorResponse } from "../middleware/response";
import { config } from "dotenv";
config()

export const registerBuyer = async(req, res) =>{
    try{
      const{ username, email, password} = req.body
      const existingBuyer = await Buyer.findOne({email})
      if(existingBuyer){
        return errorResponse(res, 401, 'Buyer Already Exists')
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const newBuyer = new Buyer({
        username,
        email,
        password: hashedPassword,
      })
      await newBuyer.save()
      successResponse(res, 200, 'Buyer registered successfully', newBuyer)
    }catch(err){
      errorResponse (res,500,"Internal Server Error",err)
    }
  }

export const loginBuyer = async(req, res) => {
    try{
      const {email, password} = req.body
      const buyer = await Buyer.findOne({email})
      if(!buyer){
        return errorResponse (res, 401, "Authentication failed")
      }
      const passwordMatch = await bcrypt.compare(password, buyer.password)
      if(!passwordMatch){
        return errorResponse(res, 401, "Invalid Password")
      }
      if(buyer.kyc_Status !== 'approved'){
        return errorResponse(res, 403, 'KYC not approved. Contact admin for approval.')
      }
      const token = sign({objectId: buyer._id, username: buyer.username}, process.env.SECRET_KEY, {expiresIn:'1d'})
      successResponse(res, 200, ({token}))
    }catch(err){
      errorResponse (res, 500, "Internal Server Error", err)
    }
  }

export const uploadKYC = async(req, res ) => {
    try{
        const {buyerId} = req.params
        const { kycDocument } = req.body;
        const buyer = await Buyer.findById(buyerId);
        if (!buyer) {
            return errorResponse(res, 404, 'Buyer not found');
          }
        buyer.kyc_Document = kycDocument
        buyer.kyc_Status = 'pending'
        await buyer.save()
        const subject = 'KYC Document Pending Approval';
        const html = 'Your KYC document is pending approval.';
  
        await sendEmail(buyer.email, subject, html);
        successResponse(res, 200, 'KYC document uploaded successfully. Awaiting approval.');
    } catch (error) {
        errorResponse(res, 500, 'Internal Server Error', error);
      }
}


export const updateBuyer = async (req, res) => {
    try{
      const {username, email, password} = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      const updateBuyer = await Buyer.findByIdAndUpdate(
        req.params.id,
        {
          username,
          email,
          password: hashedPassword,
        },
        {new: true}  
      ).select("-password")
      if(!updateBuyer){
        return errorResponse(res, 404, "Buyer not found", {})
      }
      successResponse(res, 200, "Updated Buyer Successfull", updateAdmin)
    }catch(err){
      console.log(err)
      errorResponse(res, 500, "Internal Server Error", err)
    }
  }


export const deleteBuyer =  async(req, res) => {
    try {
        const { buyerId } = req.params;
        const deletedBuyer = await Buyer.findByIdAndRemove(buyerId);
        if(!deletedBuyer){
          errorResponse(res, 404, "Buyer ID not found")
        }
        successResponse(res, 201, 'Buyer deleted successfully', deletedBuyer );
      } catch (error) {
        errorResponse(res, 500, 'Error deleting Buyer', err);
      }
} 


export const listFarmerProducts = async(req, res) => {
    try{
        const { category, search } = req.query;
        let query = {};
        if (category) {
            query.category = new RegExp(category, 'i')
          }
        if(search){ const searchRegex = new RegExp(search, 'i')
        query.$or = [{ name: searchRegex }, { 'farmer.username': searchRegex }]
        }
        const products = await FarmerProduct.find(query)
        successResponse(res, 200, 'Farmer products fetched successfully', products)
      } catch (error) {
        errorResponse(res, 500, 'Error fetching farmer products', error);
      }
}

export const getFarmerProductDetails = async (req, res) => {
    try {
    const { productId } = req.params;
      const product = await FarmerProduct.findById(productId)

      if (!product) {
        return errorResponse(res, 404, 'Farmer product not found')
      }

      successResponse(res, 200, 'Farmer product details fetched successfully', product)
    } catch (error) {
      errorResponse(res, 500, 'Error fetching farmer product details:', error)
    }
  }

export const orderFarmerProduct = async (req, res) => {
    try {
        const {buyerId, productId, quantity } = req.body;
      const orders = await Order.create({buyer: buyerId, product: productId, quantity});
      const buyer = await Buyer.findById(buyerId)
      const product = await FarmerProduct.findById(productId)
      
      const buyerSubject = 'Order Placed Successfully';
      const buyerHtml = `Your order for ${quantity} units of ${product.name} has been placed successfully.`
      await sendEmail(buyer.email, buyerSubject, buyerHtml)

      const farmerSubject = 'New Order Received';
      const farmerHtml = `A new order for ${quantity} units of ${product.name} has been placed by ${buyer.username}.`
      await sendEmail(product.farmer.email, farmerSubject, farmerHtml)
      successResponse(res, 201, 'Order created successfully', order);

      if (product.quantity < quantity) {
        return errorResponse(res, 400, 'Not enough quantity available');
      }
      const shipment = await Shipment.findOne({
        from_Country,
        to_Country,
      });

      if (!shipment) {
        return errorResponse(res, 400, 'Shipment not available between countries');
      }
      const order = await Order.create({
        buyer: buyerId,
        products: [{ product: productId, quantity }],
      });

      product.quantity -= quantity;
      await product.save();

      successResponse(res, 201, 'Order placed successfully', order);
    } catch (error) {
      errorResponse(res, 500, 'Internal Server Error', error);
    }
  }

export const listOrders = async(req, res) => {
    try{
        const { buyerId } = req.params   
        const orders = await Order.find({ buyer: buyerId });
        successResponse(res, 200, 'Orders fetched successfully', orders);
    }catch(err){
        errorResponse(res, 500, "Internal Server Error", err)
    }
}

