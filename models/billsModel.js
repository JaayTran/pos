import mongoose from 'mongoose';

//for create table into db
const billsSchema = new mongoose.Schema(
  {
    tableNumber: { type: String, required: true },
    subTotal: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    tax: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    cartItems: { type: Array, required: true },
  },
  {
    //for date
    timestamps: true,
  }
);

const Bills = mongoose.model('Bills', billsSchema);
export default Bills;
