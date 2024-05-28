"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = exports.signInSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signInSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
});
exports.signUpSchema = zod_1.default.object({
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8).optional(),
});
//# sourceMappingURL=auth.validation.js.map