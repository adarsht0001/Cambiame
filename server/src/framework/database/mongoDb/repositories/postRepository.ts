import post from "../models/postModel";

export const postRepositoryMongoDB = () => {
  const addPost = async (data: any) => {
    return await post.create(data);
  };
  return {
    addPost,
  };
};

export type PostRepositoryMongoDB = typeof postRepositoryMongoDB;
export type postRepositoryDbReturn = ReturnType<PostRepositoryMongoDB>;
