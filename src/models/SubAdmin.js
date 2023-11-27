import mongoose from 'mongoose';

const subadminSchema = new mongoose.Schema({
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
  created_at:{
    type: Date,
    default: Date.now()
  },
},
{timestamps: false});

const Subadmin = mongoose.model('Subadmin', subadminSchema);

export { Subadmin }
