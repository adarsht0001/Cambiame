import { AuthServiceReturn } from "../../framework/services/authServices";
import { Verificationpayload } from "../../types/userTypes";

export const authServiceInterface = (service: AuthServiceReturn) => {
  const comparePassword = (password: string, hashedPassword: string) =>
    service.comparePassword(password, hashedPassword);

  const createToken = (user: object) => service.createToken(user);

  const hashPassword = (password: string) => service.hashPassword(password);

  const secretKey = (hashedPassword: string) =>
    service.secretKey(hashedPassword);

  const onetimeLink = (payload: Verificationpayload, secretKey: string) =>
    service.onetimeLink(payload, secretKey);

  const forgottenPassword = (payload: Verificationpayload, secretKey: string) =>
    service.forgottenPassword(payload, secretKey);

  const verifyJWT = (token: string, secretKey: string) =>
    service.verifyJWT(token, secretKey);

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

export type AuthServiceInterface = typeof authServiceInterface;
