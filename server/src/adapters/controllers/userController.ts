import { PostRepositoryInterface } from "../../application/repositories/postRepositoryInterface";
import { UserRepositoryInterFace } from "../../application/repositories/userRepositoryInterface";
import { PostRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/postRepository";
import { UserRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository";
import { Request, Response } from "express";
import {
  getUserById,
  getUsernames,
  searchUsers,
} from "../../application/use_cases/user/user";

const userController = (
  useRepositoryImpl: UserRepositoryMongoDB,
  userDbrepository: UserRepositoryInterFace,
  postRepositortyImpl: PostRepositoryMongoDB,
  postRepository: PostRepositoryInterface
) => {
  const userRepo = userDbrepository(useRepositoryImpl());
  const postRepo = postRepository(postRepositortyImpl());

  const getProfile = (req: Request, res: Response) => {
    const { name } = req.params;
    getUserById(name, userRepo, postRepo)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        return res.status(401).json({ status: false, ...err });
      });
  };

  const searchUsername = (req: Request, res: Response) => {
    const { name } = req.query;
    getUsernames(name, userRepo).then((data) => {
      res.json(data);
    });
  };

  const searchResult = (req: Request, res: Response) => {
    const { name, user } = req.params;
    searchUsers(name, user, userRepo)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        return res.status(401).json({ status: false, ...err });
      });
  };

  return { getProfile, searchUsername, searchResult };
};

export default userController;
