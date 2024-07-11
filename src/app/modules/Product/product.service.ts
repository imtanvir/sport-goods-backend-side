import mongoose from "mongoose";
import {
  deleteImageFromCloudinary,
  sendImageToCloudinary,
} from "../utils/sendImageToCloudinary";
import { TImage, TProduct } from "./product.interface";
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
        const path = file?.path;

        //send image to cloudinary
        const { secure_url } = await sendImageToCloudinary(imageName, path);
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
  const result = await Product.find({});

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
      // Check those images which remove from front end
      const removedImages = product.image.filter(
        (productImg) =>
          !productData.image!.some(
            (productDataImg) => productDataImg.id === productImg.id
          )
      );
      console.log({ removedImages });
      // delete front end deleted images from cloud
      for (const img of removedImages) {
        const removeFromCloud = await deleteImageFromCloudinary(img.id);
        console.log(removeFromCloud);
      }

      productData.image = [...productData?.image];
      console.log({ pdimg: productData.image });
    }

    if (files.length > 0) {
      for (const file of files) {
        const imageName = `${Math.floor(Math.random() * 9000) + 100000}`;
        const path = file?.path;

        //send image to cloudinary
        const { secure_url } = await sendImageToCloudinary(imageName, path);
        images.push({ id: imageName, url: secure_url as string });
      }

      // update product image data with update product image info
      productData.image = [...(productData?.image ?? []), ...images];
    }

    // update images to db
    const result = await Product.findByIdAndUpdate(
      { _id: productId },
      productData,
      {
        new: true,
        runValidators: true,
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
export const ProductService = {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
};
