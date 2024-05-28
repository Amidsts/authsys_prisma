"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const { env } = process;
const appConfig = {
    environment: env.NODE_ENV,
    port: env.PORT,
    hashPepper: env.HASH_PEPPER,
    saltRounds: 5,
    sessionLifeSpan: 1000 * 60 * 60,
    jwtSecret: env.JWT_SECRET
};
exports.default = appConfig;
//# sourceMappingURL=index.js.map