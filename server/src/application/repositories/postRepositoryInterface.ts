import { PostRepositoryDbReturn } from "../../framework/database/mongoDb/repositories/postRepository";
import { postType } from "../../types/postType";

export const postRepository = (repository: PostRepositoryDbReturn) => {
  const getPosts = async () => await repository.getPosts();

  const addPost = async (data: postType) => await repository.addPost(data);

  const getById = async (id: any) => await repository.getById(id);

  const deleteById = async (id: string) => await repository.deleteById(id);

  return {
    getPosts,
    addPost,
    getById,
    deleteById,
  };
};
export type PostRepositoryInterface = typeof postRepository;
