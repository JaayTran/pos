import mongoose from "mongoose";

//for create table into db
const cartsSchema = new mongoose.Schema(
  {
    tableNumber: { type: String, required: true },
    subTotal: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    tax: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    cartItems: { type: Array, required: true },
    serverName: { type: String },
  },
  {
    //for date
    timestamps: true,
  }
);

const Carts = mongoose.model("Carts", cartsSchema);
export default Carts;
