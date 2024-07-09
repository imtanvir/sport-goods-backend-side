import mongoose from "mongoose";
import { sendImageToCloudinary } from "../utils/sendImageToCloudinary";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (files: any[], productData: TProduct) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (files) {
      console.log({ files });
      const images: string[] = [];
      for (const file of files) {
        const imageName = `${Math.floor(Math.random() * 9000) + 100000}`;
        const path = file?.path;

        //send image to cloudinary
        const { secure_url } = await sendImageToCloudinary(imageName, path);
        console.log({ secure_url });
        images.push(secure_url as string);
      }
      productData.image = images;
    }
    const product = await Product.create([productData], { session });

    await session.commitTransaction();
    await session.endSession();

    return product;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getAllProducts = async () => {
  const result = await Product.find({});

  return result;
};

const deleteProduct = async (productId: string) => {
  const result = await Product.findByIdAndDelete({ _id: productId });
  return result;
};
export const ProductService = { createProduct, getAllProducts, deleteProduct };
