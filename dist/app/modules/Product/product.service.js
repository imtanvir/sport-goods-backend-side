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
const getAllProducts = (sortOrder, searchQuery, priceMin, priceMax, brand, category, rating) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    // search query
    if (searchQuery) {
        query.name = { $regex: new RegExp(searchQuery, "i") };
    }
    // Filter base on price range
    if (priceMin && priceMax) {
        query.price = {
            $gte: parseInt(priceMin),
            $lte: parseInt(priceMax),
        };
    }
    else if (priceMin) {
        query.price = { $gte: parseInt(priceMin) };
    }
    else if (priceMax) {
        query.price = { $lte: parseInt(priceMax) };
    }
    // Filter base on brand
    if (brand) {
        query.brand = { $eq: brand };
    }
    if (category) {
        query.category = { $eq: category };
    }
    if (rating) {
        query.rating = { $gte: parseInt(rating) };
    }
    // sort base on price
    const sortOptions = {
        price: sortOrder === "desc" ? -1 : 1,
    };
    const result = yield product_model_1.Product.find(query).sort(sortOptions);
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
    var _a, _b, _c;
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
            // Check those images which remove from front end
            const removedImages = product.image.filter((productImg) => !productData.image.some((productDataImg) => productDataImg.id === productImg.id));
            console.log({ removedImages });
            // delete front end deleted images from cloud
            for (const img of removedImages) {
                const removeFromCloud = yield (0, sendImageToCloudinary_1.deleteImageFromCloudinary)(img.id);
                console.log(removeFromCloud);
            }
            productData.image = [...productData === null || productData === void 0 ? void 0 : productData.image];
            console.log({ pdimg: productData.image });
        }
        if (files.length > 0) {
            for (const file of files) {
                const imageName = `${Math.floor(Math.random() * 9000) + 100000}`;
                // send image to Cloudinary using buffer
                const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(imageName, file.buffer);
                images.push({ id: imageName, url: secure_url });
            }
            // update product image data with update product image info
            productData.image = [...((_c = productData === null || productData === void 0 ? void 0 : productData.image) !== null && _c !== void 0 ? _c : []), ...images];
        }
        // update images to db
        const result = yield product_model_1.Product.findByIdAndUpdate({ _id: productId }, productData, {
            new: true,
            runValidators: true,
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
const sendFeedback = (feedbackData) => __awaiter(void 0, void 0, void 0, function* () {
    const sendMail = yield (0, feedbackMailSend_1.feedbackMailSend)(feedbackData.email, feedbackData.message);
    return sendMail;
});
exports.ProductService = {
    createProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    sendFeedback,
};
