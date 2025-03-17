"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNotFound = routeNotFound;
const logging_1 = require("../config/logging"); // Đảm bảo import đúng module logging
function routeNotFound(req, res, next) {
    const error = new Error('Route not found');
    logging_1.logging.error(error.message); // Ghi log lỗi
    res.status(404).json({ message: error.message }); // Trả về JSON với thông báo lỗi
}
