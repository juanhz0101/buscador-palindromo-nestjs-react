import { Document } from 'mongoose';

export interface Product extends Document {
  id: number;
  brand: string;
  description: string;
  image: string;
  price: number;
  priceWithDiscount?: number;
  discount?: number;
}
