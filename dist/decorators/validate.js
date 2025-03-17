"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
exports.Validate = Validate;
const joi_1 = __importDefault(require("joi"));
const logging_1 = require("~/config/logging");
function Validate(schema) {
    return function (target, propertKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (req, res, next) {
            try {
                await schema.validateAsync(req.body);
            }
            catch (error) {
                logging_1.logging.error(String(error));
                return res.status(422).json({ error });
            }
            return originalMethod.call(this, req, res, next);
        };
        return descriptor;
    };
}
exports.registerSchema = joi_1.default.object({
    full_name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    role: joi_1.default.string().valid('employer', 'candidate').required(),
    password: joi_1.default.string().min(6).required()
});
