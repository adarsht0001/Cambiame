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
exports.mailService = void 0;
const nodemailer = require("nodemailer");
const googleapis_1 = require("googleapis");
const config_1 = __importDefault(require("../../config"));
const mailService = () => {
    const sendMail = (mailOption) => __awaiter(void 0, void 0, void 0, function* () {
        const oAuth2Client = new googleapis_1.google.auth.OAuth2(config_1.default.oAuth2_CLIENT_ID, config_1.default.oAuth2_CLIENT_SECRECT, config_1.default.oAuth2_RIDERECT_URI);
        oAuth2Client.setCredentials({
            refresh_token: process.env.oAuth2_REFRESH_TOKEN,
        });
        const accessToken = yield oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "adarsht00001@gmail.com",
                clientId: process.env.oAuth2_CLIENT_ID,
                clientSecret: process.env.oAuth2_CLIENT_SECRECT,
                refreshToken: process.env.oAuth2_REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        yield transport.sendMail(mailOption);
        return;
    });
    return {
        sendMail,
    };
};
exports.mailService = mailService;
