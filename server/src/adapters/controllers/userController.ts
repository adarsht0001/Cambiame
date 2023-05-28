import { PostRepositoryInterface } from "../../application/repositories/postRepositoryInterface";
import { UserRepositoryInterFace } from "../../application/repositories/userRepositoryInterface";
import { PostRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/postRepository";
import { UserRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository";
import { NextFunction, Request, Response } from "express";

import {
  editUser,
  followUser,
  getUserById,
  getUsernames,
  searchUsers,
} from "../../application/use_cases/user/user";
import { Follow } from "../../types/userTypes";
import { S3service } from "../../framework/services/s3Service";
import { S3serviceInterface } from "../../application/services/s3serviceInterface";

const userController = (
  useRepositoryImpl: UserRepositoryMongoDB,
  userDbrepository: UserRepositoryInterFace,
  postRepositortyImpl: PostRepositoryMongoDB,
  postRepository: PostRepositoryInterface,
  s3ServiceImpl: S3service,
  s3Service: S3serviceInterface
) => {
  const userRepo = userDbrepository(useRepositoryImpl());
  const postRepo = postRepository(postRepositortyImpl());
  const s3Services = s3Service(s3ServiceImpl());

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

  const follow = (req: Request, res: Response) => {
    const { name } = req.params;
    const follower: Follow = req.body;
    followUser(name, follower, userRepo)
      .then((response) => {
        res.status(202).json(response);
      })
      .catch((err) => {
        res.status(410).json(err);
      });
  };

  const getUser = async (req: Request, res: Response) => {
    const user = await userRepo.getById(req.params.id);
    res.json(user);
  };

  const editProfile = async (req: Request, res: Response) => {
    editUser(req.body.id as string, req.body, req.files, s3Services, userRepo)
      .then((response) => {
        res.status(202).json(response);
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  };

  return {
    getProfile,
    searchUsername,
    searchResult,
    follow,
    getUser,
    editProfile,
  };
};

export default userController;
