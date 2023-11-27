import mongoose from 'mongoose';

const shipmentSchema = new mongoose.Schema({
  from_Country: {
    type: String,
    required: true,
  },
  to_Country: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  created_at:{
    type: Date,
    default: Date.now()
  },
},
{timestamps: false})

const Shipment = mongoose.model('Shipment', shipmentSchema);

export { Shipment }
