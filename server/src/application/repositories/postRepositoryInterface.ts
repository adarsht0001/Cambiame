import { PostRepositoryDbReturn } from "../../framework/database/mongoDb/repositories/postRepository";
import { postType } from "../../types/postType";

export const postRepository = (repository: PostRepositoryDbReturn) => {
  const getPosts = async () => await repository.getPosts();

  const addPost = async (data: postType) => await repository.addPost(data);

  return {
    getPosts,
    addPost,
  };
};
export type PostRepositoryInterface = typeof postRepository;
