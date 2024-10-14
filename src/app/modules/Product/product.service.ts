import mongoose from "mongoose";
import { feedbackMailSend } from "../utils/feedbackMailSend";
import {
  deleteImageFromCloudinary,
  sendImageToCloudinary,
} from "../utils/sendImageToCloudinary";
import { TFeedback, TImage, TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (
  files: Express.Multer.File[],
  productData: TProduct
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (files) {
      const images: TImage[] = [];
      for (const file of files) {
        const imageName = `${Math.floor(Math.random() * 9000) + 100000}`;

        // send image to Cloudinary using buffer
        const { secure_url } = await sendImageToCloudinary(
          imageName,
          file.buffer
        );
        images.push({ id: imageName, url: secure_url as string });
      }
      productData.image = images;
    }
    const product = await Product.create([productData], { session });
    await session.commitTransaction();
    await session.endSession();

    return product;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const getAllProducts = async () => {
  const result = await Product.find({}).sort({
    createdAt: 1,
  });

  return result;
};
const deleteProduct = async (productId: string) => {
  const product = await Product.findById({ _id: productId });
  const productImages = product?.image ?? [];
  for (const img of productImages) {
    await deleteImageFromCloudinary(img.id);
  }
  const deleteProduct = await Product.findByIdAndDelete({ _id: productId });
  return deleteProduct;
};

const updateProduct = async (
  productId: string,
  files: any[],
  productData: TProduct
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const images: TImage[] = [];
    const product = await Product.findById({ _id: productId });

    // check if exist images are deleted. Then remove them from cloud
    if (
      product?.image &&
      productData?.image &&
      productData.image !== undefined &&
      product?.image?.length > productData?.image?.length
    ) {
      for (const img of productData.image) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const removeFromCloud = await deleteImageFromCloudinary(img.id);
      }
    }

    if (files.length > 0) {
      for (const file of files) {
        const imageName = `${Math.floor(Math.random() * 9000) + 100000}`;

        // send image to Cloudinary using buffer
        const { secure_url } = await sendImageToCloudinary(
          imageName,
          file.buffer
        );
        images.push({
          id: imageName,
          url: secure_url as string,
        });
      }

      productData.image = [...images];
    }

    // update images to db
    const result = await Product.findByIdAndUpdate(
      { _id: productId },
      productData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const updateProductQuantity = async (_id: string, stock_quantity: number) => {
  const result = await Product.findByIdAndUpdate(
    { _id },
    { stock_quantity },
    { new: true }
  );
  return result;
};

const sendFeedback = async (feedbackData: TFeedback) => {
  feedbackMailSend(feedbackData.email, feedbackData.message);
};
export const ProductService = {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  sendFeedback,
  updateProductQuantity,
};
