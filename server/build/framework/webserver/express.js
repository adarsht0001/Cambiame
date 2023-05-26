"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const expressConfig = (app) => {
    // Development logging
    // if (configKeys.nodeEnv == 'development') {
    app.use((0, morgan_1.default)("dev"));
    // }
    // app.use(cors({ origin: "http://localhost:3000" }));
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // app.use(cookieParser());
    // app.use(helmet({xssFilter:true}))
    app.use((0, express_mongo_sanitize_1.default)());
};
exports.default = expressConfig;
