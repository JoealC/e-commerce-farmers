import mongoose from 'mongoose';

const buyerSchema = new mongoose.Schema({
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
  phone_number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  kyc_Document: {
    type: String,
    default: null,
  },
  kyc_Status: {
    type: String,
    enum: ['3', '1', '0'],
    default: '3',  
},
is_Blocked: Boolean,
orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
  created_at:{
    type: Date,
    default: Date.now()
  },
},
{timestamps: false})

const Buyer = mongoose.model('Buyer', buyerSchema);

export { Buyer }
