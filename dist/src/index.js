"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shutdown = exports.Main = exports.httpServer = exports.application = void 0;
const express_1 = __importDefault(require("express")); // Import Express
const http_1 = __importDefault(require("http")); // Import HTTP module
require("./config/logging"); // Import file logging (nếu có)
require("reflect-metadata");
// Import các thư viện cần thiết
const config_1 = require("./config/config");
const logging_1 = require("./config/logging");
const loggingHandler_1 = require("./middlewares/loggingHandler");
const corsHandler_1 = require("./middlewares/corsHandler");
const routeNotFound_1 = require("./middlewares/routeNotFound");
const routes_1 = require("./modules/routes");
const mongoose_1 = __importDefault(require("mongoose"));
const declareHandler_1 = require("./middlewares/declareHandler");
const authController_1 = __importDefault(require("./controllers/authController"));
exports.application = (0, express_1.default)(); // Tạo ứng dụng Express
// Tạo server HTTP từ Express
exports.httpServer = http_1.default.createServer(exports.application);
// Hàm khởi tạo server
const Main = async () => {
    logging_1.logging.info('🚀 Initializing API...');
    logging_1.logging.info('----------------------');
    // Middleware xử lý request body
    exports.application.use(express_1.default.urlencoded({ extended: true }));
    exports.application.use(express_1.default.json());
    // Mongoose server
    logging_1.logging.info('🚀 Connect to mongoose...');
    logging_1.logging.info('----------------------');
    try {
        const connection = await mongoose_1.default.connect(config_1.mongo.MONGO_CONNECTION);
        logging_1.logging.info('🚀 Connected to MongoDB, Mongoose Version: ' + connection.version);
        logging_1.logging.info('----------------------');
    }
    catch (error) {
        logging_1.logging.info('🚀 Unable to Connect to Mongo:...');
        logging_1.logging.error(String(error));
        logging_1.logging.info('----------------------');
    }
    logging_1.logging.info('📝 Logging & Configuration Completed.');
    logging_1.logging.info('----------------------');
    // Middleware xử lý logging request & response
    exports.application.use(declareHandler_1.declareHandler);
    exports.application.use(loggingHandler_1.loggingHandler);
    exports.application.use(corsHandler_1.corsHandler);
    logging_1.logging.info('🚀 Define controller Routing...');
    logging_1.logging.info('----------------------');
    (0, routes_1.defineRoutes)([authController_1.default], exports.application);
    exports.application.use(routeNotFound_1.routeNotFound);
    // Khởi động server
    exports.httpServer.listen(config_1.SERVER.SERVER_PORT, () => {
        logging_1.logging.info(`🚀 Server is running at http://${config_1.SERVER.SERVER_HOSTNAME}:${config_1.SERVER.SERVER_PORT}/`);
        logging_1.logging.info('----------------------');
    });
};
exports.Main = Main;
const Shutdown = (callback) => exports.httpServer && exports.httpServer.close(callback);
exports.Shutdown = Shutdown;
(0, exports.Main)();
