import z from "zod";

export const createProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  quantityInStock: z.number(),
  sku: z.string(),
});

export const updateProductSchema = z.object({
  productId: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  quantityInStock: z.number(),
  sku: z.string(),
});

export const deleteProductSchema = z.object({
  productId: z.string(),
});

export const getProductSchema = z.object({
  productId: z.string().optional(),
});
