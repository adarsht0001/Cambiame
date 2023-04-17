import post from "../models/postModel";

export const postRepositoryMongoDB = () => {
  const addPost = async (post: any) => {
    return await post.create(post);
  };
  return {
    addPost,
  };
};
