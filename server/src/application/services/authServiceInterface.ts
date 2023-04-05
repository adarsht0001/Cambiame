import { AuthServiceReturn } from "../../framework/services/authServices";

export const authServiceInterface = (service: AuthServiceReturn) => {
  const comparePassword = (password: string, hashedPassword: string) =>
    service.comparePassword(password, hashedPassword);

  const createToken = (user: object) => service.createToken(user);

  return {
    comparePassword,
    createToken,
  };
};

export type AuthServiceInterface = typeof authServiceInterface;
