import mongoose from 'mongoose';
//for create table into db

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    modifier: { type: Array },
    productCartID: { type: String },
  },
  {
    //for date
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
