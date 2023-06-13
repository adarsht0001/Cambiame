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
exports.verifyMail = exports.resetpassword = exports.forgottenPassword = exports.userSignup = exports.userLogin = void 0;
const userLogin = (email, password, userRepository, authService, s3Services) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userRepository.getByEmail(email);
        if (user) {
            if (user.blocked) {
                reject({ email: true, msg: "email Has been blocked" });
            }
            if (!user.verified) {
                reject({ email: true, msg: "Verify your Email" });
            }
            const isPasswordCorrect = yield authService.comparePassword(password, user.password);
            if (!isPasswordCorrect) {
                reject({ msg: "incorrect password", password: true });
            }
            const payload = {
                email: user.email,
                username: user.username,
            };
            const token = authService.createToken(payload);
            payload.id = user._id;
            payload.token = token;
            if (user.profilePhoto) {
                let url = yield s3Services.getObjectSignedUrl(user.profilePhoto);
                payload.profile = url;
                resolve(payload);
            }
            resolve(payload);
        }
        else {
            reject({ msg: "Invalid User", email: true });
        }
    }));
};
exports.userLogin = userLogin;
const userSignup = (username, email, password, userRepository, authService, mailService) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userRepository.getByName(username);
        if (!user) {
            const emailExist = yield userRepository.getByEmail(email);
            if (emailExist) {
                reject({
                    msg: "email already exists",
                    email: true,
                });
            }
            const hashedPassword = yield authService.hashPassword(password);
            const user = {
                username: username,
                email: email,
                password: hashedPassword,
                date: Date.now(),
            };
            const inserted = yield userRepository.adduser(user);
            const secretKey = authService.secretKey(hashedPassword);
            const payload = {
                email: inserted.email,
                _id: inserted._id,
            };
            const token = authService.onetimeLink(payload, secretKey);
            const link = `https://cambiame.site/verifyemail/${inserted._id}/${token}`;
            const mailOpt = {
                from: "Cambiame <Cambiame@gmail.com>",
                to: inserted.email,
                subject: "Verificaton Link",
                text: `Your Verificaton Link is:${link}`,
                html: `<hi>Your Verificaton Link Link is:${link}</h1>`,
            };
            mailService.sendMail(mailOpt);
            resolve(inserted);
        }
        else {
            reject({
                msg: "username already exists",
                name: true,
            });
        }
    }));
};
exports.userSignup = userSignup;
const forgottenPassword = (email, userRepository, authService, mailService) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userRepository.getByEmail(email);
        if (user) {
            const secretKey = authService.secretKey(user.password);
            const payload = {
                email: user.email,
                _id: user._id,
            };
            const token = authService.forgottenPassword(payload, secretKey);
            const link = `https://cambiame.site/resetpassword/${user._id}/${token}`;
            const mailOpt = {
                from: "Cambiame <Cambiame@gmail.com>",
                to: user.email,
                subject: "RESET PASSWORD",
                text: `Your Reset Password Link is:${link}`,
                html: `<hi>Your Reset Password Link is:${link}</h1>`,
            };
            mailService.sendMail(mailOpt);
            resolve();
        }
        else {
            reject({
                msg: "User Not Found",
                email: true,
            });
        }
    }));
};
exports.forgottenPassword = forgottenPassword;
const resetpassword = (id, token, password, userRepository, authService) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userRepository.getById(id);
        if (user) {
            const secretKey = authService.secretKey(user.password);
            const payload = authService.verifyJWT(token, secretKey);
            if (payload.expired) {
                reject(payload);
            }
            else {
                const hashedPassword = yield authService.hashPassword(password);
                yield userRepository.updateOne({ email: payload.email }, { password: hashedPassword });
                resolve({ msg: "password changed" });
            }
        }
        else {
            reject({
                msg: "User Not Found",
            });
        }
    }));
};
exports.resetpassword = resetpassword;
const verifyMail = (id, token, userRepository, authService) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userRepository.getById(id);
        if (user) {
            const secretKey = authService.secretKey(user.password);
            const payload = authService.verifyJWT(token, secretKey);
            if (payload.expired) {
                reject(payload);
            }
            else {
                yield userRepository.updateOne({ email: user.email }, { verified: true });
                resolve({ msg: "Status changed" });
            }
        }
        else {
            reject({
                msg: "User Not Found",
            });
        }
    }));
};
exports.verifyMail = verifyMail;
