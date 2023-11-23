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
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',  
},
is_Blocked: Boolean,
orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
})

const Buyer = mongoose.model('Buyer', buyerSchema);

export { Buyer }
