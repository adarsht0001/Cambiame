import { PostRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/postRepository";
import { PostRepositoryInterface } from "../../application/repositories/postRepositoryInterface";
import { S3service } from "../../framework/services/s3Service";
import { S3serviceInterface } from "../../application/services/s3serviceInterface";
import { Request, Response } from "express";
import {
  addPost,
  getPosts,
  removePost,
} from "../../application/use_cases/post/postCrud";
const postController = (
  postRepositortyImpl: PostRepositoryMongoDB,
  postRepository: PostRepositoryInterface,
  s3ServiceImpl: S3service,
  s3Service: S3serviceInterface
) => {
  const postRepo = postRepository(postRepositortyImpl());
  const s3Services = s3Service(s3ServiceImpl());

  const createPost = async (req: Request, res: Response) => {
    const { name, text }: { name: string; text: string } = req.body;
    addPost(name, text, req.file, postRepo, s3Services)
      .then((response) => {
        return res.status(201).json({ status: true, ...response });
      })
      .catch((err) => {
        return res.status(401).json({ status: false, ...err });
      });
  };

  const getPost = async (req: Request, res: Response) => {
    getPosts(postRepo, s3Services).then((data) => {
      return res.status(200).json(data);
    });
  };

  const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    removePost(id, postRepo, s3Services).then((response) => {
      res.status(200).json({ status: true, ...response });
    });
  };

  return {
    createPost,
    getPost,
    deletePost,
  };
};
export default postController;
