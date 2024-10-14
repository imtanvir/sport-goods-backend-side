"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const product_service_1 = require("./product.service");
const CreateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    if (!req.files) {
        throw new Error("No files provided");
    }
    const result = yield product_service_1.ProductService.createProduct(req === null || req === void 0 ? void 0 : req.files, productData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Product created successfully",
        data: result,
    });
}));
const GetAllProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.ProductService.getAllProducts();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Products retrieved successfully",
        data: result,
    });
}));
const DeleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.ProductService.deleteProduct(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Product deleted successfully",
        data: result,
    });
}));
const UpdateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.params;
    const selectedImgToDelete = (_b = (_a = req.params) === null || _a === void 0 ? void 0 : _a.imageId) !== null && _b !== void 0 ? _b : null;
    const productData = req.body;
    const imageFiles = Array.isArray(req === null || req === void 0 ? void 0 : req.files) && req.files !== undefined ? req.files : [];
    const result = yield product_service_1.ProductService.updateProduct(id, imageFiles, productData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Product updated successfully",
        data: result,
    });
}));
const UpdateProductQuantity = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stock_quantity, id } = req.body;
    const result = yield product_service_1.ProductService.updateProductQuantity(id, stock_quantity);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Product quantity updated successfully",
        data: result,
    });
}));
const SendFeedback = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const feedback = req.body;
    const result = yield product_service_1.ProductService.sendFeedback(feedback);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Send feedback successfully",
        data: null,
    });
}));
const updateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const productUpdateData = req.body;
    const imageFiles = Array.isArray(req === null || req === void 0 ? void 0 : req.files) && req.files !== undefined ? req.files : [];
    const result = yield product_service_1.ProductService.updateProduct(id, imageFiles, productUpdateData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Bike updated successfully",
        data: result,
    });
}));
exports.ProductController = {
    CreateProduct,
    GetAllProduct,
    DeleteProduct,
    UpdateProduct,
    SendFeedback,
    UpdateProductQuantity,
};
