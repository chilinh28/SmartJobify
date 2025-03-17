"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoGetAll = MongoGetAll;
const logging_1 = require("../../config/logging");
function MongoGetAll(model) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (req, res, next) {
            try {
                const documents = await model.find();
                req.mongoGetAll = documents;
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
