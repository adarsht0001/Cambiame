import { UserRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository";
import { UserRepositoryInterFace } from "../../application/repositories/userRepositoryInterface";
import { AuthService } from "../../framework/services/authServices";
import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { userLogin } from "../../application/use_cases/auth/userAuth";
import { HttpStatus } from "../../types/httpStatus";
import AppError from "../../utils/appErrors";

const authController = (
  useRepositoryImpl: UserRepositoryMongoDB,
  userDbrepository: UserRepositoryInterFace,
  authServiceImpl: AuthService,
  authService: AuthServiceInterface
) => {
  const dbRepositortUser = userDbrepository(useRepositoryImpl());
  const authservice = authService(authServiceImpl());

  const login = expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    userLogin(email, password, dbRepositortUser, authservice)
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
    // throw new AppError("invalid credentials", HttpStatus.UNAUTHORIZED);
    // console.log(user);

    console.log(req.body);
  });

  return {
    login,
  };
};

export default authController;
