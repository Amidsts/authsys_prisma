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
exports.generateToken = exports.comparePassword = exports.hashPassword = exports.asyncWrapper = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../utils/response");
const configs_1 = __importDefault(require("../configs"));
const { saltRounds, hashPepper, sessionLifeSpan, jwtSecret } = configs_1.default;
function asyncWrapper(callback, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield callback();
            return result;
        }
        catch (err) {
            (0, response_1.handleResponse)({
                res,
                err,
                message: `Internal Server Error:  ${err.message}`,
                status: 500,
            });
        }
    });
}
exports.asyncWrapper = asyncWrapper;
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        return yield bcrypt_1.default.hash(password + hashPepper, salt);
    });
}
exports.hashPassword = hashPassword;
function comparePassword(plainPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.compareSync(plainPassword + hashPepper, hashedPassword);
    });
}
exports.comparePassword = comparePassword;
function generateToken({ data, expiresIn = sessionLifeSpan, audience = "web", }) {
    return jsonwebtoken_1.default.sign(data, jwtSecret, {
        expiresIn,
        issuer: `speedycardLister`,
        audience: `${audience}-user`,
    });
}
exports.generateToken = generateToken;
//# sourceMappingURL=helpers.js.map