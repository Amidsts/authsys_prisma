"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importStar(require("./configs/app"));
const configs_1 = __importDefault(require("./configs"));
const database_1 = __importDefault(require("./configs/persistence/database"));
const { port, environment } = configs_1.default;
(() => {
    (0, app_1.initializeMiddlewares)();
    (0, app_1.initializeRoutes)();
    (0, database_1.default)()
        .then(() => {
        app_1.default.listen(port, () => {
            console.log(`${environment === null || environment === void 0 ? void 0 : environment.toLocaleUpperCase()} is running on port ${port}...`);
        });
    })
        .catch((err) => {
        console.log("error connecting to database", err);
        process.exit(1);
    });
})();
//# sourceMappingURL=index.js.map