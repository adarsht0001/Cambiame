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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../../application/use_cases/auth/userAuth");
const authController = (useRepositoryImpl, userDbrepository, authServiceImpl, authService, mailServiceimpl, mailService) => {
    const dbRepositortUser = userDbrepository(useRepositoryImpl());
    const authservice = authService(authServiceImpl());
    const mailServices = mailService(mailServiceimpl());
    const login = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        (0, userAuth_1.userLogin)(email, password, dbRepositortUser, authservice)
            .then((user) => {
            return res.status(201).json({ status: true, user });
        })
            .catch((err) => {
            return res.status(404).json(Object.assign(Object.assign({}, err), { status: false }));
        });
    }));
    const signup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, password, } = req.body;
        (0, userAuth_1.userSignup)(name, email, password, dbRepositortUser, authservice, mailServices)
            .then((user) => {
            delete user.password;
            return res.status(201).json({ status: true, user });
        })
            .catch((err) => {
            return res.status(401).json(Object.assign(Object.assign({}, err), { status: false }));
        });
    }));
    const forgotPassword = (0, express_async_handler_1.default)((req, res) => {
        const { email } = req.body;
        (0, userAuth_1.forgottenPassword)(email, dbRepositortUser, authservice, mailServices)
            .then(() => {
            return res
                .status(201)
                .json({ status: true, msg: "Check Email... Link Has been Sent" });
        })
            .catch((err) => {
            return res.status(401).json(Object.assign(Object.assign({}, err), { status: false }));
        });
    });
    const resetPassword = (0, express_async_handler_1.default)((req, res) => {
        const { id, token } = req.params;
        const { pass } = req.body;
        (0, userAuth_1.resetpassword)(id, token, pass, dbRepositortUser, authservice)
            .then((response) => {
            return res.status(201).json(Object.assign({ status: true }, response));
        })
            .catch((err) => {
            return res.status(401).json(Object.assign({ status: false }, err));
        });
    });
    const verifyEmail = (0, express_async_handler_1.default)((req, res) => {
        const { id, token } = req.params;
        (0, userAuth_1.verifyMail)(id, token, dbRepositortUser, authservice)
            .then((response) => {
            return res.status(201).json(Object.assign({ status: true }, response));
        })
            .catch((err) => {
            return res.status(401).json(Object.assign({ status: false }, err));
        });
    });
    return {
        login,
        signup,
        forgotPassword,
        resetPassword,
        verifyEmail,
    };
};
exports.default = authController;
