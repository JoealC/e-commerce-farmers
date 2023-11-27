import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  price: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
  },
  created_at:{
    type: Date,
    default: Date.now()
  },
  images: [String], 
},
{timestamps: false});

const Product = mongoose.model('Product', productSchema);

export { Product }
