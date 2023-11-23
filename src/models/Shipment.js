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
})

const Shipment = mongoose.model('Shipment', shipmentSchema);

export { Shipment }
