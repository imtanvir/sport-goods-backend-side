import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { ProductService } from "./product.service";

const CreateProduct = catchAsync(async (req, res) => {
  const productData = req.body;

  if (!req.files) {
    throw new Error("No files provided");
  }

  const result = await ProductService.createProduct(
    req?.files as Express.Multer.File[],
    productData
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

const GetAllProduct = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProducts();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
});

const DeleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ProductService.deleteProduct(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

const UpdateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const selectedImgToDelete = req.params?.imageId ?? null;
  const productData = req.body;
  const imageFiles =
    Array.isArray(req?.files) && req.files !== undefined ? req.files : [];
  const result = await ProductService.updateProduct(
    id,
    // selectedImgToDelete,
    imageFiles,
    productData
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

export const ProductController = {
  CreateProduct,
  GetAllProduct,
  DeleteProduct,
  UpdateProduct,
};
