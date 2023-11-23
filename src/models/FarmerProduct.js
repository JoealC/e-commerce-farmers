import mongoose from 'mongoose';

const farmerProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
},
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
});

const FarmerProduct = mongoose.model('FarmerProduct', farmerProductSchema);

export { FarmerProduct }
