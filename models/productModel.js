import mongoose from 'mongoose';

const modifierSchema = new mongoose.Schema({
  mods: { type: String, required: false },
});

//for create table into db

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    modifier: [modifierSchema],
  },
  {
    //for date
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
