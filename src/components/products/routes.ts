import { Router } from "express";
import validateInput from "../../middlewares/inputValidator";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./product.validations";
import { requireAuth, validateToken } from "../../middlewares/tokenAuth";
import createProduct from "./controllers/createProduct";
import updateProduct from "./controllers/updateProduct";
import deleteProduct from "./controllers/deleteProduct";
import getProduct from "./controllers/getProducts";

const router = Router();

router.post(
  "/",
  validateInput(createProductSchema),
  validateToken,
  requireAuth,
  createProduct
);

router.put(
  "/",
  validateInput(updateProductSchema),
  validateToken,
  requireAuth,
  updateProduct
);

router.delete(
  "/:productId",
  validateInput(deleteProductSchema, "params"),
  validateToken,
  requireAuth,
  deleteProduct
);

router.get(
  "/",
  validateInput(getProductSchema, "query"),
  validateToken,
  requireAuth,
  getProduct
);

export default router;
