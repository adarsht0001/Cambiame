"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const serverConfig = (server) => {
    const startServer = () => {
        server.listen(5000, () => {
            console.log(`Server listening on Port ${config_1.default.port}`);
        });
    };
    return {
        startServer
    };
};
exports.default = serverConfig;
