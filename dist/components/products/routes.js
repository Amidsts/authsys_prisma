"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inputValidator_1 = __importDefault(require("../../middlewares/inputValidator"));
const product_validations_1 = require("./product.validations");
const tokenAuth_1 = require("../../middlewares/tokenAuth");
const createProduct_1 = __importDefault(require("./controllers/createProduct"));
const updateProduct_1 = __importDefault(require("./controllers/updateProduct"));
const deleteProduct_1 = __importDefault(require("./controllers/deleteProduct"));
const getProducts_1 = __importDefault(require("./controllers/getProducts"));
const router = (0, express_1.Router)();
router.post("/", (0, inputValidator_1.default)(product_validations_1.createProductSchema), tokenAuth_1.validateToken, tokenAuth_1.requireAuth, createProduct_1.default);
router.put("/", (0, inputValidator_1.default)(product_validations_1.updateProductSchema), tokenAuth_1.validateToken, tokenAuth_1.requireAuth, updateProduct_1.default);
router.delete("/:productId", (0, inputValidator_1.default)(product_validations_1.deleteProductSchema, "params"), tokenAuth_1.validateToken, tokenAuth_1.requireAuth, deleteProduct_1.default);
router.get("/", (0, inputValidator_1.default)(product_validations_1.getProductSchema, "query"), tokenAuth_1.validateToken, tokenAuth_1.requireAuth, getProducts_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map