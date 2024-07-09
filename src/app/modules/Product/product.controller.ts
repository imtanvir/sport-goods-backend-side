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

export const ProductController = {
  CreateProduct,
};
