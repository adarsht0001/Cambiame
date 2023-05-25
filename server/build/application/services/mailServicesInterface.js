"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailServiceInterface = void 0;
const mailServiceInterface = (service) => {
    const sendMail = (mailOption) => {
        service.sendMail(mailOption);
    };
    return { sendMail };
};
exports.mailServiceInterface = mailServiceInterface;
