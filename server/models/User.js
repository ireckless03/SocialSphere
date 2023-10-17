import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 20,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 20,
  },
  email: {
    type:  String,
    required: true,
    max: 30,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    min: 5
    max: 20,
  },
  email: {
    type:  String,
    default: ''
  },
  friends: {
    type: Array,
    default: []
  },
  location: String,
  occupation: String,
  viewProfile: Number,
  impressions: Number,
}, {timestamps: true}
);

const User = mongoose.model('User', UserSchema);
export default User;