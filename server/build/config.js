"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configKeys = {
    awsBucketName: process.env.S3_BUCKET,
    awsBucketRegion: process.env.S3_REGION,
    awsAccessKey: process.env.S3_ACCESS_KEY,
    awsSecretAccessKey: process.env.S3_SECRECT_ACCESS_KEY,
    mongoDbUrl: process.env.DATABASE_CONNECTION,
    port: process.env.port || 5000,
    jwtSecret: process.env.ACESS_TOKEN_SCERET,
    oAuth2_CLIENT_ID: process.env.oAuth2_CLIENT_ID,
    oAuth2_CLIENT_SECRECT: process.env.oAuth2_CLIENT_SECRECT,
    oAuth2_RIDERECT_URI: process.env.oAuth2_RIDERECT_URI,
};
exports.default = configKeys;
