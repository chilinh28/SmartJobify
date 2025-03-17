"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const dotenv_1 = __importDefault(require("dotenv"));
const logging_1 = require("~/config/logging");
dotenv_1.default.config();
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
if (!SENDGRID_API_KEY || !SENDER_EMAIL) {
    throw new Error('Missing SENDGRID_API_KEY or SENDGRID_SENDER_EMAIL in .env');
}
mail_1.default.setApiKey(SENDGRID_API_KEY);
/**
 * Gửi email với SendGrid
 * @param to - Địa chỉ email người nhận
 * @param subject - Tiêu đề email
 * @param text - Nội dung email (text)
 * @param html - Nội dung email (HTML)
 */
const sendEmail = async (to, subject, text, html) => {
    try {
        const msg = {
            to,
            from: SENDER_EMAIL,
            subject,
            text,
            html
        };
        logging_1.logging.info(`from: ${msg.from}, to: ${msg.to}, subject: ${msg.subject}, text: ${msg.text}, html: ${msg.html}`);
        await mail_1.default.send(msg);
        logging_1.logging.info(`Email sent to ${to}`);
    }
    catch (error) {
        logging_1.logging.error(String(error));
        throw new Error('Failed to send email');
    }
};
exports.sendEmail = sendEmail;
