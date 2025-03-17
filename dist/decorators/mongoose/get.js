"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoGet = MongoGet;
const logging_1 = require("~/config/logging");
function MongoGet(model) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (req, res, next) {
            try {
                const document = await model.findById(req.params.id);
                if (document) {
                    req.mongoGet = document;
                }
                else {
                    return res.status(404).json({ error: 'Document not found' });
                }
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
