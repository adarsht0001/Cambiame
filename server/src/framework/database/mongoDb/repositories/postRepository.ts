import { postType } from "../../../../types/postType";
import Post from "../models/postModel";

export const postRepositoryMongoDB = () => {
  const getPosts = async () => await Post.find({});

  const addPost = async (data: postType) => await Post.create(data);

  return {
    getPosts,
    addPost,
  };
};

export type PostRepositoryMongoDB = typeof postRepositoryMongoDB;
export type PostRepositoryDbReturn = ReturnType<PostRepositoryMongoDB>;
