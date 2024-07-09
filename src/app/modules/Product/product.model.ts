import mongoose, { Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: [String], default: [] },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, required: true },
});

export const Product = mongoose.model<TProduct>("Product", productSchema);
