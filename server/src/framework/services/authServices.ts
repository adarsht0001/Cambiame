import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import configKeys from "../../config";
import { Verificationpayload } from "../../types/userTypes";

export const authService = () => {
  const comparePassword = (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
  };
  const createToken = (user: object) => {
    return jwt.sign({ token: user }, configKeys.jwtSecret);
  };

  const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
  };

  const secretKey = (hashedPassword: string) => {
    return configKeys.jwtSecret + hashedPassword;
  };

  const onetimeLink = (payload: Verificationpayload, secretKey: string) => {
    return jwt.sign(payload, secretKey);
  };

  const forgottenPassword = (
    payload: Verificationpayload,
    secretKey: string
  ) => {
    return jwt.sign(payload, secretKey, { expiresIn: "15m" });
  };

  return {
    comparePassword,
    createToken,
    hashPassword,
    secretKey,
    onetimeLink,
    forgottenPassword,
  };
};

export type AuthService = typeof authService;

export type AuthServiceReturn = ReturnType<AuthService>;
