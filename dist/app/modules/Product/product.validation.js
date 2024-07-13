"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = require("zod");
const productCreateValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }),
        description: zod_1.z.string({ required_error: "Description is required" }),
        price: zod_1.z
            .number({ required_error: "Price is required" })
            .positive("Price must be a positive number"),
        category: zod_1.z.string({ required_error: "Category is required" }),
        stock_quantity: zod_1.z
            .number({ required_error: "Quantity is required" })
            .positive("Quantity must be a positive number"),
        brand: zod_1.z.string({ required_error: "Brand is required" }),
        rating: zod_1.z.number({ required_error: "Rating is required" }),
    }),
});
const updateProductValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }).optional(),
        description: zod_1.z
            .string({ required_error: "Description is required" })
            .optional(),
        price: zod_1.z
            .number({ required_error: "Price is required" })
            .positive("Price must be a positive number")
            .optional(),
        category: zod_1.z.string({ required_error: "Category is required" }).optional(),
        stock_quantity: zod_1.z
            .number({ required_error: "Quantity is required" })
            .positive("Quantity must be a positive number")
            .optional(),
        brand: zod_1.z.string({ required_error: "Brand is required" }).optional(),
        rating: zod_1.z.number({ required_error: "Rating is required" }).optional(),
        image: zod_1.z
            .array(zod_1.z.object({
            id: zod_1.z.string({ required_error: "Id is required" }),
            url: zod_1.z.string({ required_error: "Url is required" }),
        }))
            .optional(),
    }),
});
exports.productValidation = {
    productCreateValidation,
    updateProductValidation,
};
