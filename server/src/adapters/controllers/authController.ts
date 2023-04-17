import { UserRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository";
import { UserRepositoryInterFace } from "../../application/repositories/userRepositoryInterface";
import { AuthService } from "../../framework/services/authServices";
import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  userLogin,
  userSignup,
} from "../../application/use_cases/auth/userAuth";
import { MailService } from "../../framework/services/mailServices";
import { MailServiceInterface } from "../../application/services/mailServicesInterface";

const authController = (
  useRepositoryImpl: UserRepositoryMongoDB,
  userDbrepository: UserRepositoryInterFace,
  authServiceImpl: AuthService,
  authService: AuthServiceInterface,
  mailServiceimpl: MailService,
  mailService: MailServiceInterface
) => {
  const dbRepositortUser = userDbrepository(useRepositoryImpl());
  const authservice = authService(authServiceImpl());
  const mailServices = mailService(mailServiceimpl());

  const login = expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    userLogin(email, password, dbRepositortUser, authservice)
      .then((user) => {
        return res.status(201).json({ status: true, user });
      })
      .catch((err) => {
        return res.status(404).json({ ...err, status: false });
      });
  });

  const signup = expressAsyncHandler(async (req: Request, res: Response) => {
    const {
      name,
      email,
      password,
    }: { name: string; email: string; password: string } = req.body;
    userSignup(
      name,
      email,
      password,
      dbRepositortUser,
      authservice,
      mailServices
    )
      .then((user) => {
        delete user.password;
        return res.status(201).json({ status: true, user });
      })
      .catch((err) => {
        return res.status(401).json({ ...err, status: false });
      });
  });
  return {
    login,
    signup,
  };
};

export default authController;
