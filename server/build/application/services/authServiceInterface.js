"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceInterface = void 0;
const authServiceInterface = (service) => {
    const comparePassword = (password, hashedPassword) => service.comparePassword(password, hashedPassword);
    const createToken = (user) => service.createToken(user);
    const hashPassword = (password) => service.hashPassword(password);
    const secretKey = (hashedPassword) => service.secretKey(hashedPassword);
    const onetimeLink = (payload, secretKey) => service.onetimeLink(payload, secretKey);
    const forgottenPassword = (payload, secretKey) => service.forgottenPassword(payload, secretKey);
    const verifyJWT = (token, secretKey) => service.verifyJWT(token, secretKey);
    return {
        comparePassword,
        createToken,
        hashPassword,
        secretKey,
        onetimeLink,
        forgottenPassword,
        verifyJWT,
    };
};
exports.authServiceInterface = authServiceInterface;
