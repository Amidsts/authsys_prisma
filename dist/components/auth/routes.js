"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signUp_1 = __importDefault(require("../auth/controllers/signUp"));
const signIn_1 = __importDefault(require("./controllers/signIn"));
const router = (0, express_1.Router)();
router.post("/signup", signUp_1.default);
router.post("/signIn", signIn_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map