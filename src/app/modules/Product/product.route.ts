import { NextFunction, Request, Response, Router } from "express";
import validationChecker from "../../middlewares/validationChecker";
import { upload } from "../utils/sendImageToCloudinary";
import { ProductController } from "./product.controller";
import { productValidation } from "./product.validation";

const router = Router();

router.post(
  "/create-product",
  upload.array("file", 5),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = JSON.parse(req.body.data);
      next();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
  validationChecker(productValidation.productCreateValidation),
  ProductController.CreateProduct
);

router.get("/get-products", ProductController.GetAllProduct);
router.delete("/delete-product/:id", ProductController.DeleteProduct);
router.put(
  "/update-product/:id",
  upload.array("file", 5),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = JSON.parse(req.body.data);
      next();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
  validationChecker(productValidation.updateProductValidation),
  ProductController.UpdateProduct
);

router.post("/send-feedback", ProductController.SendFeedback);
export const ProductRouter = router;
