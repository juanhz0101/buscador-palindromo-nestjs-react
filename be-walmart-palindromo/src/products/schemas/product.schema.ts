import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  id: Number,
  brand: String,
  description: String,
  image: String,
  price: Number,
  priceWithDiscount: Number,
  discount: Number,
});
