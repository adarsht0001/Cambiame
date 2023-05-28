import { PostRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/postRepository";
import { PostRepositoryInterface } from "../../application/repositories/postRepositoryInterface";
import { S3service } from "../../framework/services/s3Service";
import { S3serviceInterface } from "../../application/services/s3serviceInterface";
import { UserRepositoryInterFace } from "../../application/repositories/userRepositoryInterface";
import { Request, Response } from "express";
import { UserRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository";
import {
  addComents,
  addPost,
  getComments,
  getPosts,
  likeaPost,
  removePost,
  reportaPost,
} from "../../application/use_cases/post/postCrud";
import { CommentType } from "../../types/postType";
import { singlePost } from "../../application/use_cases/admin/admin";
const postController = (
  postRepositortyImpl: PostRepositoryMongoDB,
  postRepository: PostRepositoryInterface,
  useRepositoryImpl: UserRepositoryMongoDB,
  userDbrepository: UserRepositoryInterFace,
  s3ServiceImpl: S3service,
  s3Service: S3serviceInterface
) => {
  const postRepo = postRepository(postRepositortyImpl());
  const dbRepositortUser = userDbrepository(useRepositoryImpl());
  const s3Services = s3Service(s3ServiceImpl());

  const createPost = async (req: Request, res: Response) => {
    const {
      name,
      text,
      userId,
    }: { name: string; text: string; userId: string } = req.body;
    addPost(name, text, userId, req.file, postRepo, s3Services)
      .then((response) => {
        return res.status(201).json({ status: true, ...response });
      })
      .catch((err) => {
        return res.status(401).json({ status: false, ...err });
      });
  };

  const getPost = async (req: Request, res: Response) => {
    getPosts(postRepo, s3Services, dbRepositortUser).then((data) => {
      return res.status(200).json(data);
    });
  };

  const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    removePost(id, postRepo, s3Services).then((response) => {
      res.status(200).json({ status: true, ...response });
    });
  };

  const likePost = (req: Request, res: Response) => {
    const { id, postId } = req.params;

    likeaPost(id, postId, postRepo, dbRepositortUser).then((response) => {
      res.json(response);
    });
  };

  const reportPost = (req: Request, res: Response) => {
    const { id, postId } = req.params;
    reportaPost(id, postId, postRepo)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  };

  const addComent = (req: Request, res: Response) => {
    const comment: CommentType = {
      comment: req.body.comment,
      id: req.body.id,
      name: req.body.name,
      profile: req.body.profile,
      Date: Date.now(),
    };
    const postId = req.body.postid;
    addComents(comment, postId, postRepo).then(() => {
      res.sendStatus(200);
    });
  };

  const getAllcomments = (req: Request, res: Response) => {
    const { postId } = req.params;
    getComments(postId, postRepo).then((data) => {
      res.json(data);
    });
  };

  const getSinglepost = (req: Request, res: Response) => {
    const { id } = req.params;
    singlePost(postRepo, s3Services, id, dbRepositortUser)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json({ ...err });
      });
  };

  return {
    createPost,
    getPost,
    deletePost,
    likePost,
    reportPost,
    addComent,
    getAllcomments,
    getSinglepost,
  };
};
export default postController;
