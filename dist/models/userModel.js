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
exports.UserRecruitment = exports.UserCandidate = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// ====== User Schema ======
const userSchema = new mongoose_1.Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['employer', 'candidate'], required: true },
    password: { type: String, required: true },
    refresh_token: { type: String, required: false }
}, { timestamps: true });
// ====== User Candidate Schema ======
const userCandidateSchema = new mongoose_1.Schema({
    user_id: { type: String, ref: 'User', required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    avatar: { type: String },
    personal_link: { type: String },
    working_time: { type: String },
    bio: { type: String },
    skills: { type: String }
}, { timestamps: true });
// ====== User Recruitment Schema ======
const userRecruitmentSchema = new mongoose_1.Schema({
    user_id: { type: String, ref: 'User', required: true },
    phone: { type: Number, required: true },
    company_name: { type: String, required: true },
    company_website: { type: String },
    company_desc: { type: String },
    company_size: { type: String },
    avatar: { type: String }
}, { timestamps: true });
// ====== Export Models ======
exports.User = mongoose_1.default.model('User', userSchema);
exports.UserCandidate = mongoose_1.default.model('UserCandidate', userCandidateSchema);
exports.UserRecruitment = mongoose_1.default.model('UserRecruitment', userRecruitmentSchema);
