import { PostRepositoryInterface } from "../../application/repositories/postRepositoryInterface";
import { UserRepositoryInterFace } from "../../application/repositories/userRepositoryInterface";
import { AuthServiceInterface } from "../../application/services/authServiceInterface";
import { PostRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/postRepository";
import { UserRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository";
import { Request, Response } from "express";
import { AuthService } from "../../framework/services/authServices";
import {
  Adminlogin,
  blockUnblock,
  getAllUser,
  getDashboards,
  reportedPosts,
} from "../../application/use_cases/admin/admin";
import { paginateUser } from "../../application/use_cases/admin/paginate";
import User from "../../framework/database/mongoDb/models/userModels";

const adminController = (
  useRepositoryImpl: UserRepositoryMongoDB,
  userDbrepository: UserRepositoryInterFace,
  postRepositortyImpl: PostRepositoryMongoDB,
  postRepository: PostRepositoryInterface,
  authServiceImpl: AuthService,
  authService: AuthServiceInterface
) => {
  const userRepo = userDbrepository(useRepositoryImpl());
  const postRepo = postRepository(postRepositortyImpl());
  const authServices = authService(authServiceImpl());

  const login = (req: Request, res: Response) => {
    const { email, password } = req.body;
    Adminlogin(email, password, authServices)
      .then((user) => {
        res.status(200).json({ status: true, user });
      })
      .catch((err) => {
        res.status(404).json({ ...err, status: false });
      });
  };

  const getAllUsers = (req: Request, res: Response) => {
    const { page } = req.query;
    paginateUser(User, page as string).then((data) => {
      let users = data?.results.map((e: any) => {
        return {
          id: e["_id"],
          name: e["username"],
          email: e["email"],
          status: e["blocked"],
        };
      });
      data.results = users;
      res.json(data);
    });
  };

  const blockUser = (req: Request, res: Response) => {
    const { email }: { email: string } = req.body;
    blockUnblock(email, userRepo).then(() => {
      res.sendStatus(200);
    });
  };

  const getDashboard = (req: Request, res: Response) => {
    getDashboards(userRepo, postRepo).then((data) => {
      res.json(data);
    });
  };

  const getReportedPost = (req: Request, res: Response) => {
    reportedPosts(postRepo).then((post) => {
      res.json(post);
    });
  };

  return {
    login,
    getAllUsers,
    blockUser,
    getDashboard,
    getReportedPost,
  };
};

export default adminController;
