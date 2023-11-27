import { Admin } from "../models/Admin";
import { Subadmin } from "../models/Subadmin";
import { Farmer } from "../models/Farmer";
import { Buyer } from "../models/Buyer";
import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { sign } from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { successResponse, errorResponse } from "../middleware/response";
import { config } from "dotenv";
import { FarmerProduct } from "../models/FarmerProduct";
import { Shipment } from "../models/Shipment";
config()

export const registerAdmin = async(req, res) =>{
    try{
      const{ username, email, password} = req.body
      const existingAdmin = await Admin.findOne({email})
      if(existingAdmin){
        return errorResponse(res, 401, 'Admin Already Exists', existingAdmin)
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const newAdmin = new Admin({
        username,
        email,
        password: hashedPassword,
      })
      await newAdmin.save()
      newAdmin.password = null
      successResponse(res, 200, 'Admin registered successfully', newAdmin)
    }catch(err){
      errorResponse (res,500,"Internal Server Error", err)
    }
  }

export const loginAdmin = async(req, res) => {
    try{
      const {email, password} = req.body
      const admin = await Admin.findOne({email})
      if(!admin){
        return errorResponse (res, 401, "Authentication failed", {})
      }
      const passwordMatch = await bcrypt.compare(password, admin.password)
      if(!passwordMatch){
        return errorResponse(res, 401, "Invalid Password")
      }
      const token = sign({objectId: admin._id, username: admin.username}, process.env.SECRET_KEY, {expiresIn:'1d'})
      successResponse(res, 200, ({token}))
    }catch(err){
      errorResponse (res, 500, "Internal Server Error", err)
    }
  }
  
export const getAdmins = async (req, res) => {
    try {
      const admins = await Admin.find().select('-password');
      if(admins.length === 0){
       return errorResponse (res, 401, "No admins found", {})
      }
      successResponse(res, 200, 'Admins listed successfully', admins )
    } catch (error) {
    errorResponse(res, 500, "Internal Server Error", error)  
}
  }

  export const updateAdmin = async (req, res) => {
    try{
      const {username, email, password} = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      const updateAdmin = await Admin.findByIdAndUpdate(
        req.params.id,
        {
          username,
          email,
          password: hashedPassword,
        },
        {new: true}  
      ).select("-password")
      if(!updateAdmin){
        return errorResponse(res, 404, "Admin not found", {})
      }
      successResponse(res, 200, "Updating Admin Successfull", updateAdmin)
    }catch(err){
      console.log(err)
      errorResponse(res, 500, "Internal Server Error", err)
    }
  }

export const deleteAdmin = async (req, res) => {
    try{
      const deleteAdmin = await Admin.findByIdAndDelete(req.params.id).select('-password')
      if(!deleteAdmin){
        return errorResponse(res, 404, 'Admin not found', {});
      }
      successResponse(res,200, "Admin deleted Successfully", deleteAdmin);
      }catch(err){
        console.log(err)
        errorResponse(res, 500, "Internal Server Error", err)
      }
    }


//subadmins

export const addSubAdmin = async(req, res) => {
    try{
        const {username, password, email} = req.body
        const existingSubAdmin = await Admin.findOne({username})
        if(existingSubAdmin){
          return errorResponse(res, 401, 'Subadmin Already Exists', existingSubAdmin)
        }
        const hashedPassword =await bcrypt.hash(password, 10)
        const newSubAdmin = new Admin({
          username,
          email,
          password: hashedPassword,
          role: 'subadmin',
        })
        await newSubAdmin.save()
        newSubAdmin.password = null
        successResponse(res, 200, 'Subadmin registered successfully', newSubAdmin)
      }catch(err){
        errorResponse (res,500,"Internal Server Error", err)
      }
    }

    export const editSubAdmin = async(req, res) => {
        try{
            const {username, password, email } = req.body
            const hashedPassword = await bcrypt.hash(password, 10)
            const editedSubadmin = await Admin.findByIdAndUpdate(
                req.params.id,
                {
                    username,
                    email,
                    password: hashedPassword,
                    role: "subadmin"
                },
                {new: true}
            ).select("-password")
            if(!editedSubadmin){
                return errorResponse(res, 404, 'Subadmin not found', {})
            }
            successResponse(res, 200, "Subadmin edited successfully", editedSubadmin)
        }catch(err){
            errorResponse(res, 500, 'Internal Server error', err)
        }
    }

 export const getSubAdminDetails= async(req, res) =>{
        try{
            const subAdmin = await Admin.findById(req.params.id).select("-password")
            if(!subAdmin){
              return errorResponse(res, 404, "Subadmin not found", {})
            }else{ 
             return successResponse(res, 200,"Listed subadmin details", subAdmin)
            }
        }catch(error){
            errorResponse(res, 500, "Error in getting subadmin details", error)
        }
    }
 
export const deleteSubAdmin = async(req, res) => {
        try {
            const deleteSubAdmin = await Admin.findByIdAndDelete(req.params.id).select('-password');
            if(!deleteSubAdmin){
              return errorResponse(res, 404, "Subadmin ID not found", {})
            }
            successResponse(res, 201, 'Subadmin deleted successfully',deleteSubAdmin );
          } catch (error) {
            errorResponse(res, 500, 'Error deleting subadmin', error);
          }
    }   

//Farmer Management

export const addFarmer = async(req, res) => {
    try{
        const {username, password, email, phone_number, country} = req.body
        const existingFarmer = await Farmer.findOne({username})
        if(existingFarmer){
          return errorResponse(res, 401, 'Farmer Already Exists', existingFarmer)
        }
        const hashedPassword =await bcrypt.hash(password, 10)
        const newFarmer = new Farmer({
          username,
          email,
          password: hashedPassword,
          phone_number,
          country,
        })
        await newFarmer.save()
        newFarmer.password = null
        successResponse(res, 200, 'Farmer registered successfully', newFarmer)
      }catch(err){
        errorResponse (res,500,"Internal Server Error", err)
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

export const getFarmerDetails= async(req, res) =>{
    try{
        const farmer = await Farmer.findById(req.params.id).select("-password")
        if(!farmer){
          return errorResponse(res, 404, "Farmer not found", {})
        }else{ 
         return successResponse(res, 200,"listed farmer details successfully", farmer)
        }
    }catch(error){
        errorResponse(res, 500, "Error in getting farmer details", error)
    }
}

export const deleteFarmer = async(req, res) => {
    try {
        const deleteFarmer = await Farmer.findByIdAndDelete(req.params.id).select('-password')
        if(!deleteFarmer){
         return errorResponse(res, 404, "Farmer ID not found", {})
        }
        successResponse(res, 201, 'Farmer deleted successfully', deleteFarmer);
      } catch (error) {
        errorResponse(res, 500, 'Error deleting farmer', error);
      }
}  

export const searchFarmers = async (req, res) => {
  const { search } = req.query;

  try {
    let query = {};

    if (search) {
      const searchRegex = new RegExp(search, 'i'); 

      query = {
        $or: [
          { username: searchRegex },
          { email: searchRegex },
          { country: searchRegex },
        ],
      };
    }

    const farmers = await Farmer.find(query);
    successResponse(res, 200, 'Filtered Successful', farmers);
  } catch (error) {
    errorResponse(res, 500, 'Internal Server Error', error);
  }
}

//Buyer Management

export const approveBuyerKYC = async (req, res) => {
    const { buyerId } = req.params;
    try {
      const buyer = await Buyer.findById(buyerId);
         if (!buyer) {
        return errorResponse(res, 404, 'Buyer not found', {})
          }
        buyer.kyc_Status = '1';
      await buyer.save();
      successResponse(res, 200, 'Buyer KYC approved successfully', buyer);
    } catch (error) {
      errorResponse(res, 500, 'Internal Server Error', error);
    }
  }

  export const rejectBuyerKYC = async (req, res) => {
    const { buyerId } = req.params;
    try {
      const buyer = await Buyer.findById(buyerId);
         if (!buyer) {
        return errorResponse(res, 404, 'Buyer not found', {})
          }
        buyer.kyc_Status = '0';
      await buyer.save();
  
      successResponse(res, 200, 'Buyer KYC rejected successfully', buyer);
    } catch (error) {
       errorResponse(res, 500, 'Internal Server Error', error);
    }
  }

export const lisAllBuyers = async (req, res) => {
    try {
      const buyers = await Buyer.find();
      if(buyers.length === 0){
        return errorResponse(res, 401, "No data found", {})
      }
      successResponse(res, 200, 'listed all buyers', buyers);
    } catch (error) {
      errorResponse(res, 500, 'Internal Server Error', error);
    }
  }

export const listKYCPendingBuyers = async (req, res) => {
    try {
      const kycPendingBuyers = await Buyer.find({ kycStatus: '3' });
      if(!kycPendingBuyers){
       return errorResponse(res, 401, "No KYC pending Buyers", {})
      }
      successResponse(res, 200, 'listed all KYC pending buyers', kycPendingBuyers);
    } catch (error) {
      errorResponse(res, 500, 'Internal Server Error', error);  
      }
  }

export const getBuyerDetails = async (req, res) => {
    const { buyerId } = req.params;

    try {
      const buyer = await Buyer.findById(buyerId)

      if (!buyer) {
        return errorResponse(res, 404, 'Buyer not found', {})
      }

      successResponse(res, 200, 'listed buyer detail', buyer)
    } catch (error) {
      errorResponse(res, 500, 'Internal Server Error', error)
        }
    }


export const deleteBuyer =  async(req, res) => {
    try {
        const { buyerId } = req.params;
        const deletedBuyer = await Buyer.findByIdAndRemove(buyerId);
        if(!deletedBuyer){
          return errorResponse(res, 404, "Buyer ID not found", {})
        }
        successResponse(res, 201, 'Buyer deleted successfully', deletedBuyer)
      } catch (error) {
        errorResponse(res, 500, 'Error deleting Buyer', error);
      }
} 

export const blockBuyer = async(req, res) => {
    try {
        const { BuyerId } = req.params;
        if (!BuyerId) {
          return errorResponse(res, 400, 'Buyer ID is required', {});
        }
        const buyer = await Buyer.findById(userId);
        if (!buyer) {
            return errorResponse(res, 404, 'Buyer not found', {});
        }
        if (buyer.is_Blocked) {
           return successResponse(res, 400, 'Buyer is already blocked');
        }
        buyer.is_Blocked = true;
        await buyer.save();
        successResponse(res, 200,'Buyer blocked successfully');
      } catch (error) {
        errorResponse(res, 500, 'Error blocking buyer',error);
      }
}

export const unblockBuyer = async(req, res) => {
    try {
        const { BuyerId } = req.params;
        if (!BuyerId) {
          return errorResponse(res, 400, 'Buyer ID is required', {});
        }
        const buyer = await Buyer.findById(userId);
        if (!buyer) {
            return errorResponse(res, 404, 'Buyer not found', {});
        }
        if (buyer.is_Blocked) {
           return successResponse(res, 400, 'Buyer is already unblocked');
        }
        buyer.is_Blocked = false;
        await buyer.save();
        successResponse(res, 200,'Buyer unblocked successfully');
      } catch (error) {
        errorResponse(res, 500, 'Error unblocking buyer', error);
      }
}

export const searchBuyers = async (req, res) => {
    const { search } = req.query;

    try {
      let query = {};

      if (search) {
        const searchRegex = new RegExp(search, 'i'); 

        query = {
          $or: [
            { username: searchRegex },
            { email: searchRegex },
            { country: searchRegex },
          ],
        };
      }

      const buyers = await Buyer.find(query);
      successResponse(res, 200, 'Filtered Successful', buyers);
    } catch (error) {
      errorResponse(res, 500, 'Internal Server Error', error);
    }
  }

//Category Management

export const createCategory =  async (req, res) => {
    const { name, description } = req.body
    try {
        const existingCategory = await Category.findOne({ name });
  
        if (existingCategory) {
          return errorResponse(res, 400, 'Category with this name already exists', existingCategory);
        }
  
        const newCategory = await Category.create({ name, description });
  
        successResponse(res, 201, 'Category created successfully', newCategory);
      } catch (error) {
        errorResponse(res, 500, 'Internal Server Error', error);
      }
    }

export const listCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      if(categories.length === 0){
        return errorResponse(res, 401, "No categories found", {})
      }
      successResponse(res, 200, "Listed Category Successfully", categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      errorResponse(res, 500, 'Internal Server Error', error);
    }
  }

export const getCategoryDetails = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return errorResponse(res, 404, 'Category not found', category );
    }

    successResponse(res, 200, "Category listed by ID", category);
  } catch (error) {
    errorResponse(res, 500, 'Internal Server Error', error);
}
}

export const updateCategory = async (req, res) => {
    try {
      const { name, description } = req.body
      const updatedCategory = await Category.findByIdAndUpdate(
          req.params.id,
          { name, description },
          { new: true }
        )
        successResponse(res, 200, "Updated Successfully", updatedCategory)
    }catch(err){
        errorResponse(res, 500, 'Internal Server Error', err);

    }}

export const deleteCategory = async(req, res) => {
    try{
        await Category.findByIdAndDelete(req.params.id)
        await Product.deleteMany({category: req.params.id})
        await FarmerProduct.deleteMany({category: req.params.id})
        successResponse(res, 200, 'Category and related items delted successfully', {})

    }catch(err){
        errorResponse(res, 500, "Internal Server Error", err)
    }

}

//Product Management

export const createProduct = async (req, res) => {
  const { name, description, price, category, images } = req.body;

  try {
    const newProduct = await Product.create({ name, description, price, category, images });

    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
      const newCategory = await Category.create({ name: 'New Category', description: 'Category description' });

      newCategory.products.push(newProduct);
      await newCategory.save();
    } else {
      existingCategory.products.push(newProduct);
      await existingCategory.save();
    }

    successResponse(res, 201, 'Product created successfully', newProduct);
  } catch (error) {
    errorResponse(res, 500, 'Internal Server Error', error);
  }
}

export const listProducts = async (req, res) => {
    try {
      const products = await Product.find();
      successResponse(res, 201, "Product listed successfully", products);
    } catch (error) {
        errorResponse(res, 500, "Internal Server Error", error)

    }
  }

 export const getProductDetails = async (req, res) => {

    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return errorResponse (res, 404, 'Product not found', product );
      }

      successResponse(res, 201, "Listed product details successfully", product);
    } catch (error) {
        errorResponse(res, 500, "Internal Server Error", error)

    }
  }

export const updateProduct = async (req, res) => {
    try {
      const { name, description, price, category, image } = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { name, description, price, category, image },
        { new: true }
      );

      successResponse(res, 201, "Product updated successfully", updatedProduct)
    } catch (error) {
        errorResponse(res, 500, "Internal Server Error", error)

    }
  }

export const deleteProduct = async (req, res) => {

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return errorResponse(res, 404, 'Product not found');
    }

    const category = await Category.findOne({ products: req.params.id });

    if (category) {
      category.products.pull(req.params.id);
      await category.save();
    }
    await product.deleteOne({_id: req.params.id});

    successResponse(res, 200, 'Product deleted successfully');
  } catch (error) {
    console.log(error)
    errorResponse(res, 500, 'Internal Server Error', error);
  }
}

export const approveRejectFarmerProducts = async (req, res) => {
    try {
        const { productId, farmerId } = req.params;
        const { approvalStatus } = req.body;
      const farmerProduct = await FarmerProduct.findOne({
        farmer: farmerId,
        product: productId,
      })
  
      if (!farmerProduct) {
        return errorResponse(res, 404, 'Farmer product not found', {} );
      }
        farmerProduct.status = approvalStatus;
      await farmerProduct.save();
  
      successResponse(res, 200, `Farmer product ${approvalStatus} successfully`, farmerProduct);
    } catch (error) {
        errorResponse(res, 500, "Internal Server Error", error)

    }
  }

//Shipment Management

export const createShipment = async (req, res) => {
    try {
      const { from_Country, to_Country, cost } = req.body;

      const newShipment = await Shipment.create({ from_Country, to_Country, cost });

      successResponse(res, 201, 'Shipment created successfully', newShipment);
    } catch (error) {
      errorResponse(res, 500, 'Error creating shipment:', error);
    }
  }

export const listShipments = async (req, res) => {
    try {
      const shipments = await Shipment.find();
      successResponse(res, 200, 'Shipments fetched successfully', shipments);
    } catch (error) {
      errorResponse(res, 500, 'Error fetching shipments:', error);
    }
  }

export const getShipmentDetails = async (req, res) => {


    try {
      const shipment = await Shipment.findById(req.params.id);

      if (!shipment) {
        return errorResponse(res, 404, 'Shipment not found', {});
      }

      successResponse(res, 200, 'Shipment details fetched successfully', shipment);
    } catch (error) {
      errorResponse(res, 500, 'Error fetching shipment details:', error);
    }
  }

 export const updateShipment = async (req, res) => {
    const { fromCountry, toCountry, cost } = req.body;
    try {
      const updatedShipment = await Shipment.findByIdAndUpdate(
        req.params.id,
        { fromCountry, toCountry, cost },
        { new: true }
      );

      successResponse(res, 200, 'Shipment updated successfully', updatedShipment);
    } catch (error) {
      errorResponse(res, 500, 'Error updating shipment:', error);
    }
  }

export const deleteShipment = async (req, res) => {
    try {
      await Shipment.findByIdAndDelete(req.params.id);
      successResponse(res, 200, 'Shipment deleted successfully');
    } catch (error) {
      errorResponse(res, 500, 'Error deleting shipment:', error);
    }
  }