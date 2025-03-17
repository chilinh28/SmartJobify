"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingHandler = loggingHandler;
const logging_1 = require("../config/logging"); // Import logging từ logging.ts
function loggingHandler(req, res, next) {
    logging_1.logging.info(`📥 Incoming Request: [${req.method}] ${req.url} - IP: ${req.socket.remoteAddress}`);
    res.on('finish', () => {
        logging_1.logging.info(`📤 Response: [${req.method}] ${req.url} - Status: ${res.statusCode} - IP: ${req.socket.remoteAddress}`);
    });
    next(); // Chuyển sang middleware tiếp theo
}
