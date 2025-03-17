"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("~/decorators/controller");
const route_1 = require("~/decorators/route");
const validate_1 = require("~/decorators/validate");
const userModel_1 = require("~/models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validate_2 = require("~/decorators/validate");
const email_1 = require("~/utils/email");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let AuthController = class AuthController {
    async register(req, res, next) {
        try {
            const { password, ...userData } = req.body;
            // Hash password
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const newUser = new userModel_1.User({ ...userData, password: hashedPassword });
            await newUser.save();
            return res.status(201).json({ message: 'User registered successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await userModel_1.User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Incorrect email' });
            }
            const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Incorrect password' });
            }
            // Generate JWT token
            const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'default_secret', {
                expiresIn: '1h'
            });
            const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
            user.refresh_token = refreshToken;
            await user.save();
            return res.status(200).json({ message: 'User login successfully', token });
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.status(400).json({ message: 'Refresh token is required' });
            }
            // Tìm user có refreshToken
            const user = await userModel_1.User.findOne({ refresh_token: refreshToken });
            if (!user) {
                return res.status(404).json({ message: 'Invalid refresh token' });
            }
            // Xóa refreshToken trong database
            user.refresh_token = null;
            await user.save();
            res.status(200).json({ message: 'Logged out successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.status(400).json({ message: 'Refresh token is required' });
            }
            // Tìm user có refreshToken trong DB
            const user = await userModel_1.User.findOne({ refresh_token: refreshToken });
            if (!user) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }
            // Xác minh refreshToken
            jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: 'Invalid or expired refresh token' });
                }
                // Tạo accessToken mới
                const accessToken = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });
                res.status(200).json({ accessToken });
            });
        }
        catch (error) {
            next(error);
        }
    }
    async resetPassword(req, res, next) {
        try {
            const { email } = req.body;
            const user = await userModel_1.User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Tạo token reset password
            const resetToken = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET || 'default_secret', {
                expiresIn: '15m'
            });
            // Đọc nội dung file HTML
            const templatePath = path_1.default.join(__dirname, '../../src/templates/resetPassword.html');
            let emailHtml = fs_1.default.readFileSync(templatePath, 'utf8');
            // Chèn link đặt lại mật khẩu vào template
            const resetLink = `$/reset-password?token=${resetToken}`;
            emailHtml = emailHtml.replace('{{reset_link}}', resetLink);
            // Gửi email
            await (0, email_1.sendEmail)(email, 'Reset Your Password', 'Click the link to reset your password', emailHtml);
            return res.status(200).json({ message: 'Reset password email sent' });
        }
        catch (error) {
            next(error);
        }
    }
    async updatePassword(req, res, next) {
        try {
            const { token, newPassword } = req.body;
            // Xác nhận token
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'default_secret');
            const user = await userModel_1.User.findById(decoded.userId);
            if (!user) {
                return res.status(400).json({ message: 'Invalid token' });
            }
            // Cập nhật mật khẩu mới
            user.password = await bcrypt_1.default.hash(newPassword, 10);
            await user.save();
            return res.status(200).json({ message: 'Password updated successfully' });
        }
        catch (error) {
            next(error);
        }
    }
};
__decorate([
    (0, route_1.Route)('post', '/register'),
    (0, validate_1.Validate)(validate_2.registerSchema),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, route_1.Route)('post', '/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, route_1.Route)('post', '/logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, route_1.Route)('post', '/refresh-token'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, route_1.Route)('post', '/reset-password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, route_1.Route)('post', '/update-password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePassword", null);
AuthController = __decorate([
    (0, controller_1.Controller)('/auth')
], AuthController);
exports.default = AuthController;
