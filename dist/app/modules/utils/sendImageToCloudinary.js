"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.deleteImageFromCloudinary = exports.sendImageToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const streamifier_1 = __importDefault(require("streamifier"));
const config_1 = __importDefault(require("../../config"));
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary_cloud_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
// path: string
const sendImageToCloudinary = (imageName, buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({ public_id: imageName.trim() }, function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result);
        });
        // Stream the buffer to Cloudinary
        streamifier_1.default.createReadStream(buffer).pipe(uploadStream);
    });
};
exports.sendImageToCloudinary = sendImageToCloudinary;
// Function to delete image from Cloudinary
const deleteImageFromCloudinary = (imageName) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.destroy(imageName.trim(), function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result);
        });
    });
};
exports.deleteImageFromCloudinary = deleteImageFromCloudinary;
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, process.cwd() + "/uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });
// Configure multer to use memory storage instead of disk storage
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage: storage });
