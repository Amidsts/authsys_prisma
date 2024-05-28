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
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../../utils/helpers");
const response_1 = require("../../../utils/response");
const database_1 = require("../../../configs/persistence/database");
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { productId } = req.params;
        const { user } = req;
        yield (0, helpers_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            const productExists = yield database_1.prisma.product.findFirst({
                where: { userId: user.id, id: productId },
            });
            if (!productExists) {
                return (0, response_1.handleResponse)({
                    res,
                    message: "this product does not exists",
                    status: 400,
                });
            }
            yield database_1.prisma.product.delete({
                where: { id: productId, userId: user.id },
            });
            return (0, response_1.handleResponse)({ res, message: "product deleted successfully" });
        }), res);
    });
}
exports.default = deleteProduct;
//# sourceMappingURL=deleteProduct.js.map