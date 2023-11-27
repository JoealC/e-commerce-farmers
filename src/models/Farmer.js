import mongoose from 'mongoose';

const farmerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  created_at:{
    type: Date,
    default: Date.now()
  },
  
}, 
{timestamps: false})

const Farmer = mongoose.model('Farmer', farmerSchema);

export { Farmer }
