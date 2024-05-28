"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponse = void 0;
const handleResponse = ({ res, data, status = 200, err, message, }) => {
    if (err)
        console.log("Error  ", err);
    return res.status(status).json({
        message,
        data,
    });
};
exports.handleResponse = handleResponse;
//# sourceMappingURL=response.js.map