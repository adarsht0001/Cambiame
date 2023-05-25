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
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3ServiceInterface = void 0;
const s3ServiceInterface = (service) => {
    const uploadtoS3 = (fileData, name, mimetype) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service.uploadtoS3(fileData, name, mimetype);
    });
    const getObjectSignedUrl = (key) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service.getObjectSignedUrl(key);
    });
    const deleteFile = (filename) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service.deleteFile(filename);
    });
    return {
        uploadtoS3,
        getObjectSignedUrl,
        deleteFile,
    };
};
exports.s3ServiceInterface = s3ServiceInterface;
