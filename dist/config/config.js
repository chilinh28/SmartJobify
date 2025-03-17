"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongo = exports.SERVER = exports.SERVER_PORT = exports.SERVER_HOSTNAME = exports.MONGO_DATABASE = exports.MONGO_URL = exports.MONGO_PASSWORD = exports.MONGO_USER = exports.TEST = exports.DEVELOPMENT = void 0;
// Import dotenv để đọc các biến môi trường từ file .env
const dotenv_1 = __importDefault(require("dotenv"));
// Nạp cấu hình từ file .env vào process.env
dotenv_1.default.config();
/**
 * Kiểm tra môi trường hiện tại của ứng dụng
 * Nếu NODE_ENV là "development" => DEVELOPMENT = true
 * Nếu NODE_ENV là "test" => TEST = true
 */
exports.DEVELOPMENT = process.env.NODE_ENV === 'development';
exports.TEST = process.env.NODE_ENV === 'test';
//Mongoose
exports.MONGO_USER = process.env.MONGODB_USER || '';
exports.MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
exports.MONGO_URL = process.env.MONGO_URL || '';
exports.MONGO_DATABASE = process.env.MONGO_DATABASE || '';
// export const MONGO_OPTIONS: mongoose.ConnectionOptions = { w: 'majority' }
/**
 * Lấy giá trị SERVER_HOSTNAME từ biến môi trường, nếu không có thì mặc định là "localhost"
 */
exports.SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
/**
 * Lấy giá trị SERVER_PORT từ biến môi trường, nếu không có thì mặc định là 12345
 * Vì process.env lưu giá trị dưới dạng chuỗi nên cần chuyển đổi sang kiểu số bằng Number()
 */
exports.SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8000;
/**
 * Đối tượng SERVER chứa tất cả thông tin về server
 * Giúp dễ dàng import vào các file khác
 */
exports.SERVER = {
    SERVER_HOSTNAME: exports.SERVER_HOSTNAME,
    SERVER_PORT: exports.SERVER_PORT
};
exports.mongo = {
    MONGO_USER: exports.MONGO_USER,
    MONGO_PASSWORD: exports.MONGO_PASSWORD,
    MONGO_URL: exports.MONGO_URL,
    MONGO_DATABASE: exports.MONGO_DATABASE,
    // MONGO_CONNECTION: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DATABASE}`
    MONGO_CONNECTION: `mongodb+srv://chilinh28:chilinh28@cluster-project-job.b1zmq.mongodb.net/project_job?w=majority`
};
