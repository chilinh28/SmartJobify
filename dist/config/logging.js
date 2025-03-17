"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logging = void 0;
const chalk_1 = __importDefault(require("chalk")); // Thư viện giúp tô màu log
const moment_1 = __importDefault(require("moment")); // Thư viện xử lý thời gian
// Hàm ghi log chung
const log = (level, message) => {
    const timestamp = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
    let colorizedMessage = `[${timestamp}] [${level}] ${message}`;
    // Tô màu theo loại log
    if (level === 'INFO')
        colorizedMessage = chalk_1.default.blue(colorizedMessage);
    if (level === 'WARN')
        colorizedMessage = chalk_1.default.yellow(colorizedMessage);
    if (level === 'ERROR')
        colorizedMessage = chalk_1.default.red(colorizedMessage);
    console.log(colorizedMessage);
};
// Hàm log theo từng mức độ
exports.logging = {
    info: (msg) => log('INFO', msg),
    warn: (msg) => log('WARN', msg),
    error: (msg) => log('ERROR', msg)
};
