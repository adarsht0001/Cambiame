import { postType } from "../../../../types/postType";
import Post from "../models/postModel";

export const postRepositoryMongoDB = () => {
  const getPosts = async () => await Post.find({});

  const addPost = async (data: postType) => await Post.create(data);

  const getById = async (id: any) => await Post.findById(id);

  const deleteById = async (id: string) => await Post.findByIdAndDelete(id);

  return {
    getPosts,
    addPost,
    getById,
    deleteById,
  };
};

export type PostRepositoryMongoDB = typeof postRepositoryMongoDB;
export type PostRepositoryDbReturn = ReturnType<PostRepositoryMongoDB>;
