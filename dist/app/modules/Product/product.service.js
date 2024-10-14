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
exports.ProductService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const feedbackMailSend_1 = require("../utils/feedbackMailSend");
const sendImageToCloudinary_1 = require("../utils/sendImageToCloudinary");
const product_model_1 = require("./product.model");
const createProduct = (files, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        if (files) {
            const images = [];
            for (const file of files) {
                const imageName = `${Math.floor(Math.random() * 9000) + 100000}`;
                // send image to Cloudinary using buffer
                const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, file.buffer);
                images.push({ id: imageName, url: secure_url });
            }
            productData.image = images;
        }
        const product = yield product_model_1.Product.create([productData], { session });
        yield session.commitTransaction();
        yield session.endSession();
        return product;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find({}).sort({
        createdAt: 1,
    });
    return result;
});
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const product = yield product_model_1.Product.findById({ _id: productId });
    const productImages = (_a = product === null || product === void 0 ? void 0 : product.image) !== null && _a !== void 0 ? _a : [];
    for (const img of productImages) {
        yield (0, sendImageToCloudinary_1.deleteImageFromCloudinary)(img.id);
    }
    const deleteProduct = yield product_model_1.Product.findByIdAndDelete({ _id: productId });
    return deleteProduct;
});
const updateProduct = (productId, files, productData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const images = [];
        const product = yield product_model_1.Product.findById({ _id: productId });
        // check if exist images are deleted. Then remove them from cloud
        if ((product === null || product === void 0 ? void 0 : product.image) &&
            (productData === null || productData === void 0 ? void 0 : productData.image) &&
            productData.image !== undefined &&
            ((_a = product === null || product === void 0 ? void 0 : product.image) === null || _a === void 0 ? void 0 : _a.length) > ((_b = productData === null || productData === void 0 ? void 0 : productData.image) === null || _b === void 0 ? void 0 : _b.length)) {
            for (const img of productData.image) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
                const removeFromCloud = yield (0, sendImageToCloudinary_1.deleteImageFromCloudinary)(img.id);
            }
        }
        if (files.length > 0) {
            for (const file of files) {
                const imageName = `${Math.floor(Math.random() * 9000) + 100000}`;
                // send image to Cloudinary using buffer
                const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, file.buffer);
                images.push({
                    id: imageName,
                    url: secure_url,
                });
            }
            productData.image = [...images];
        }
        // update images to db
        const result = yield product_model_1.Product.findByIdAndUpdate({ _id: productId }, productData, {
            new: true,
            runValidators: true,
            session,
        });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const updateProductQuantity = (_id, stock_quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate({ _id }, { stock_quantity }, { new: true });
    return result;
});
const sendFeedback = (feedbackData) => __awaiter(void 0, void 0, void 0, function* () {
    (0, feedbackMailSend_1.feedbackMailSend)(feedbackData.email, feedbackData.message);
});
exports.ProductService = {
    createProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    sendFeedback,
    updateProductQuantity,
};
