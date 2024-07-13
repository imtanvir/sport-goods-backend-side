"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = require("express");
const validationChecker_1 = __importDefault(require("../../middlewares/validationChecker"));
const sendImageToCloudinary_1 = require("../utils/sendImageToCloudinary");
const product_controller_1 = require("./product.controller");
const product_validation_1 = require("./product.validation");
const router = (0, express_1.Router)();
router.post("/create-product", sendImageToCloudinary_1.upload.array("file", 5), (req, res, next) => {
    try {
        req.body = JSON.parse(req.body.data);
        next();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}, (0, validationChecker_1.default)(product_validation_1.productValidation.productCreateValidation), product_controller_1.ProductController.CreateProduct);
router.get("/get-products", product_controller_1.ProductController.GetAllProduct);
router.delete("/delete-product/:id", product_controller_1.ProductController.DeleteProduct);
router.put("/update-product/:id", sendImageToCloudinary_1.upload.array("file", 5), (req, res, next) => {
    try {
        req.body = JSON.parse(req.body.data);
        next();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}, (0, validationChecker_1.default)(product_validation_1.productValidation.updateProductValidation), product_controller_1.ProductController.UpdateProduct);
router.post("/send-feedback", product_controller_1.ProductController.SendFeedback);
exports.ProductRouter = router;
