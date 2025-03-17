"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoCreate = MongoCreate;
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = require("../../config/logging");
function MongoCreate(model) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (req, res, next) {
            try {
                const document = new model({
                    _id: new mongoose_1.default.Types.ObjectId(),
                    ...req.body
                });
                await document.save();
                req.mongoCreate = document;
            }
            catch (error) {
                logging_1.logging.error(String(error));
                return res.status(500).json({ error: String(error) });
            }
            return originalMethod.call(this, req, res, next);
        };
        return descriptor;
    };
}
