import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Buyer',
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['3', '2', '1', '0'],
    default: '3',
  },
  created_at:{
    type: Date,
    default: Date.now()
  },
},
{timestamps: false})

const Order = mongoose.model('Order', orderSchema);

export { Order }
