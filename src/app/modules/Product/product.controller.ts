import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { ProductService } from "./product.service";

const CreateProduct = catchAsync(async (req, res) => {
  const productData = req.body;

  if (!req.files) {
    throw new Error("No files provided");
  }
  const result = await ProductService.createProduct(req.files, productData);

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

export const ProductController = {
  CreateProduct,
  GetAllProduct,
  DeleteProduct,
};
