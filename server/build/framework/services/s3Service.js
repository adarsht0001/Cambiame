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
exports.s3Service = void 0;
const config_1 = __importDefault(require("../../config"));
const crypto_1 = __importDefault(require("crypto"));
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3 = new client_s3_1.S3Client({
    region: config_1.default.awsBucketRegion,
    credentials: {
        accessKeyId: config_1.default.awsAccessKey,
        secretAccessKey: config_1.default.awsSecretAccessKey,
    },
});
const s3Service = () => {
    const uploadtoS3 = (fileData, name, mimetype) => __awaiter(void 0, void 0, void 0, function* () {
        const imageName = crypto_1.default.randomBytes(32).toString("hex");
        const path = `${name}/${imageName}`;
        const params = {
            Bucket: config_1.default.awsBucketName,
            Key: path,
            Body: fileData,
            ContentType: mimetype,
        };
        const command = new client_s3_1.PutObjectCommand(params);
        yield s3.send(command);
        return path;
    });
    const getObjectSignedUrl = (key) => __awaiter(void 0, void 0, void 0, function* () {
        const params = {
            Bucket: config_1.default.awsBucketName,
            Key: key,
        };
        const command = new client_s3_1.GetObjectCommand(params);
        const seconds = 600000;
        const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: seconds });
        return url;
    });
    const deleteFile = (filename) => __awaiter(void 0, void 0, void 0, function* () {
        const deleteParams = {
            Bucket: config_1.default.awsBucketName,
            Key: filename,
        };
        return s3.send(new client_s3_1.DeleteObjectCommand(deleteParams));
    });
    return {
        uploadtoS3,
        getObjectSignedUrl,
        deleteFile,
    };
};
exports.s3Service = s3Service;
