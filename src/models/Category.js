import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  farmer_Products:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FarmerProduct',
    }
  ],
  created_at:{
    type: Date,
    default: Date.now()
  },
  
}, 
{timestamps: false})

const Category = mongoose.model('Category', categorySchema);

export { Category }
