import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
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
  role: {
    type: String,
    enum: ['admin', 'subadmin'],
    default: 'admin',
  },
  created_at:{
    type: Date,
    default: Date.now()
  },
},
{timestamps: false})

const Admin = mongoose.model('Admin', adminSchema);

export { Admin }
