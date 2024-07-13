import mongoose, { Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: {
    type: [
      {
        _id: false,
        id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    default: [],
  },
  category: { type: String, required: true },
  stock_quantity: { type: Number, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, required: true },
});

export const Product = mongoose.model<TProduct>("Product", productSchema);
