import { z } from "zod";

const productCreateValidation = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    description: z.string({ required_error: "Description is required" }),
    price: z
      .number({ required_error: "Price is required" })
      .positive("Price must be a positive number"),
    category: z.string({ required_error: "Category is required" }),
    quantity: z
      .number({ required_error: "Quantity is required" })
      .positive("Quantity must be a positive number"),
    brand: z.string({ required_error: "Brand is required" }),
    rating: z.number({ required_error: "Rating is required" }),
  }),
});

const updateProductValidation = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).optional(),
    description: z
      .string({ required_error: "Description is required" })
      .optional(),
    price: z
      .number({ required_error: "Price is required" })
      .positive("Price must be a positive number")
      .optional(),
    category: z.string({ required_error: "Category is required" }).optional(),
    quantity: z
      .number({ required_error: "Quantity is required" })
      .positive("Quantity must be a positive number")
      .optional(),
    brand: z.string({ required_error: "Brand is required" }).optional(),
    rating: z.number({ required_error: "Rating is required" }).optional(),
  }),
});

export const productValidation = {
  productCreateValidation,
  updateProductValidation,
};
