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
function getProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { productId } = req.query;
        const { user } = req;
        let products;
        yield (0, helpers_1.asyncWrapper)(() => __awaiter(this, void 0, void 0, function* () {
            if (productId) {
                products = yield database_1.prisma.product.findFirst({
                    where: { userId: user.id, id: productId },
                });
                if (!products) {
                    return (0, response_1.handleResponse)({
                        res,
                        message: "this product does not exists",
                        status: 400,
                    });
                }
            }
            else {
                products = yield database_1.prisma.product.findMany({
                    where: { userId: user.id },
                    orderBy: { createdAt: "desc" },
                    skip: 0,
                    take: 10,
                    include: {
                        user: {
                            select: { firstName: true },
                        },
                    },
                });
            }
            return (0, response_1.handleResponse)({
                res,
                message: "product retrieved successfully",
                status: 200,
                data: products,
            });
        }), res);
    });
}
exports.default = getProduct;
//# sourceMappingURL=getProducts.js.map