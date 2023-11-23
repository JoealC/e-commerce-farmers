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
});

const Subadmin = mongoose.model('Subadmin', subadminSchema);

export { Subadmin }
