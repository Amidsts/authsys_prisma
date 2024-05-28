"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRoutes = exports.initializeMiddlewares = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const response_1 = require("../utils/response");
const routes_1 = __importDefault(require("../components/auth/routes"));
const routes_2 = __importDefault(require("../components/products/routes"));
const app = (0, express_1.default)();
const initializeMiddlewares = () => {
    const allowedOrigins = [
        `http://localhost:5173`,
    ];
    const corsOptions = {
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    };
    app
        .use((0, cors_1.default)(corsOptions))
        .use(express_1.default.json({ limit: "50kb" }))
        .use(express_1.default.urlencoded({ limit: "50kb", extended: false }))
        .use((0, helmet_1.default)())
        .use((err, req, res, next) => {
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
            return (0, response_1.handleResponse)({
                res,
                status: 403,
                message: "Invalid header method",
            });
        }
        if (req.body && err instanceof SyntaxError) {
            return res.status(400).json({
                message: "Malformed JSON, check the body of the request",
            });
        }
        return next();
    });
};
exports.initializeMiddlewares = initializeMiddlewares;
const initializeRoutes = () => {
    app.get("/", (req, res) => {
        res.json({ message: "welcome to app server" });
    });
    app
        .use("/auth", routes_1.default)
        .use("/products", routes_2.default);
    app.all("*", (_req, res) => (0, response_1.handleResponse)({
        res,
        status: 404,
        message: "You have used an invalid method or hit an invalid route",
    }));
};
exports.initializeRoutes = initializeRoutes;
exports.default = app;
//# sourceMappingURL=app.js.map