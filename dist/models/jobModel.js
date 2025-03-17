"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryJob = exports.Job = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const categorySchema = new mongoose_1.Schema({
    name_category: { type: String, required: true, unique: true }
}, { timestamps: true });
const jobSchema = new mongoose_1.Schema({
    employer_id: { type: String, ref: 'UserRecruitment', required: true },
    category_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'CategoryJob', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    job_type: { type: String, required: true },
    requirements: { type: String, required: true },
    salary_from: { type: Number, required: true },
    salary_to: { type: Number, required: true },
    status: { type: Boolean, default: true },
    posted_at: { type: Date, default: Date.now }
}, { timestamps: true });
exports.Job = mongoose_1.default.model('Job', jobSchema);
exports.CategoryJob = mongoose_1.default.model('CategoryJob', categorySchema);
