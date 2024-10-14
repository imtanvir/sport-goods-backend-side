"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackMailSend = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const feedbackMailSend = (to, message) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: config_1.default.NODE_ENV === "production",
        auth: {
            user: config_1.default.nodemailer_auth_user,
            pass: config_1.default.nodemailer_auth_pass,
        },
    });
    try {
        yield transporter.sendMail({
            from: config_1.default.nodemailer_auth_user,
            to,
            subject: "User Feedback Message",
            text: message,
        });
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
});
exports.feedbackMailSend = feedbackMailSend;
