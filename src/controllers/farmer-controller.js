import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken';
import { Farmer } from "../models/Farmer";
import { config } from "dotenv";
import { FarmerProduct } from '../models/FarmerProduct';
import { Order } from '../models/Oder';
import { successResponse, errorResponse } from '../middleware/response';
config()

export const registerFarmer = async(req, res) =>{
    try{
      const{ username, email, password, phone_number, country} = req.body
      const existingFarmer = await Farmer.findOne({email})
      if(existingFarmer){
        return errorResponse(res, 401, 'Farmer Already Exists', existingFarmer)
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const newFarmer = new Farmer({
        username,
        email,
        password: hashedPassword,
        phone_number,
        country,
      })
      await newFarmer.save()
      successResponse(res, 200, 'Farmer registered successfully', newFarmer)
    }catch(err){
      console.log(err)
      errorResponse (res,500,"Internal Server Error", err)
    }
  }

export const loginFarmer = async(req, res) => {
    try{
      const {email, password} = req.body
      const farmer = await Farmer.findOne({email})
      if(!farmer){
        return errorResponse (res, 401, "Authentication failed")
      }
      const passwordMatch = await bcrypt.compare(password, farmer.password)
      if(!passwordMatch){
        return errorResponse(res, 401, "Invalid Password")
      }
      const token = sign({objectId: farmer._id, username: farmer.username}, process.env.SECRET_KEY, {expiresIn:'1d'})
      successResponse(res, 200,"Token Generated Successfully", ({token}))
    }catch(err){
      console.log(err)
      errorResponse (res, 500, "Internal Server Error", err)
    }
  }

  export const editFarmer = async(req, res) => {
    try{
        const {username, password, email, phone_number, country } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const editedFarmer = await Farmer.findByIdAndUpdate(
            req.params.id,
            {
                username,
                email,
                password: hashedPassword,
                phone_number,
                country,
            },
            {new: true}
        ).select("-password")
        if(!editedFarmer){
            return errorResponse(res, 404, 'Farmer not found', {})
        }
        successResponse(res, 200, "Farmer edited successfully", editedFarmer)
    }catch(err){
      console.log(err)
        errorResponse(res, 500, 'Server error', err)
    }
}


export const deleteFarmer = async(req, res) => {
    try {
        const deleteFarmer = await Farmer.findByIdAndDelete(req.params.id);
        if(!deleteFarmer){
          errorResponse(res, 404, "Farmer ID not found", {})
        }
        successResponse(res, 201, 'Farmer deleted successfully', deleteFarmer );
      } catch (error) {
        errorResponse(res, 500, 'Error deleting farmer', error);
      }
}  

export const listProducts = async (req, res) => {
    try {
    const { category, search } = req.query;

      let query = {};

      if (category) {
        query.category = category;
      }

      if (search) {
        const searchRegex = new RegExp(search, 'i');
        query.name = searchRegex;
      }

      const products = await FarmerProduct.find(query);
      successResponse(res, 200, 'Products fetched successfully', products);
    } catch (error) {
      errorResponse(res, 500, 'Error fetching products:', error);
    }
  }

  export const getProducts = async (req, res) => {
    try {
      const products = await FarmerProduct.find();
      successResponse(res, 200, 'Products fetched successfully', products);
    } catch (error) {
      errorResponse(res, 500, 'Error fetching products:', error);
    }
  }

export const createFarmerProduct = async (req, res) => {
    try {
    const { name, quantity, price, category, farmer } = req.body;
    const {farmerId} = req.params
      const newProduct = await FarmerProduct.create({
        name,
        quantity,
        price,
        category,
        farmer: farmerId
      });
      await Farmer.findByIdAndUpdate(farmerId, { $push: { products: newProduct._id } });
      successResponse(res, 201, 'Product created successfully', newProduct);
    } catch (error) {
      errorResponse(res, 500, 'Error creating product:', error);
    }
  }

export const listOrders = async (req, res) => {
    try {
    const { farmerId } = req.params;
    if(!farmerId){
      return errorResponse(res, 401, "Farmer Id not founded", farmerId)
    }
      const orders = await Order.find({ 'products.farmer': farmerId });
      successResponse(res, 200, 'Orders fetched successfully', orders);
    } catch (error) {
      errorResponse(res, 500, 'Error fetching orders:', error);
    }
  }