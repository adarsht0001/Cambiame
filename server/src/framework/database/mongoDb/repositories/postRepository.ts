import { ObjectId } from "mongoose";
import { postType } from "../../../../types/postType";
import Post from "../models/postModel";

export const postRepositoryMongoDB = () => {
  const getPosts = async () => await Post.find({}).sort({ date: -1 });

  const addPost = async (data: postType) => await Post.create(data);

  const getById = async (id: any) => await Post.findById(id);

  const deleteById = async (id: string) => await Post.findByIdAndDelete(id);

  const updateById = async (id: ObjectId | undefined, update: object) =>
    await Post.findByIdAndUpdate(id, update);

  const getbyUser = async (name: string | undefined) =>
    await Post.find({ user: name });

  const getpostbyUserId = async (id: string | undefined) =>
    await Post.find({ userId: id });

  const getPostcount = async () => {
    return await Post.countDocuments();
  };

  const getCountof = async (filter: object) => {
    return await Post.countDocuments(filter);
  };

  const postByfilter = async (filter: object) => await Post.find(filter);

  return {
    getPosts,
    addPost,
    getById,
    deleteById,
    updateById,
    getbyUser,
    getpostbyUserId,
    getPostcount,
    getCountof,
    postByfilter,
  };
};

export type PostRepositoryMongoDB = typeof postRepositoryMongoDB;
export type PostRepositoryDbReturn = ReturnType<PostRepositoryMongoDB>;
