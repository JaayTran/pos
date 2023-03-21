import mongoose from 'mongoose';

//for create table into db
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    loginNumber: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    //for date
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
