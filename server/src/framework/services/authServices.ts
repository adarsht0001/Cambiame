import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import configKeys from "../../config";

export const authService = () => {
  const comparePassword = (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
  };
  const createToken = (user: object) => {
    return jwt.sign({ token: user }, configKeys.jwtSecret);
  };

  return {
    comparePassword,
    createToken,
  };
};

export type AuthService = typeof authService;

export type AuthServiceReturn = ReturnType<AuthService>;
