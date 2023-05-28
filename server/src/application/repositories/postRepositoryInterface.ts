import { PostRepositoryDbReturn } from "../../framework/database/mongoDb/repositories/postRepository";
import { postType } from "../../types/postType";

export const postRepository = (repository: PostRepositoryDbReturn) => {
  const getPosts = async () => await repository.getPosts();

  const addPost = async (data: postType) => await repository.addPost(data);

  const getById = async (id: any) => await repository.getById(id);

  const deleteById = async (id: string) => await repository.deleteById(id);

  const updateById = async (id: any, update: object) =>
    await repository.updateById(id, update);

  const getbyUser = async (name: string | undefined) =>
    await repository.getbyUser(name);

  const getbyUserId = async (name: string | undefined) =>
    await repository.getbyUser(name);

  const getpostbyUserId = async (id: string | undefined) =>
    await repository.getpostbyUserId(id);

  const getPostcount = async () => await repository.getPostcount();

  const getCountof = async (filter: object) =>
    await repository.getCountof(filter);

  const postByfilter = async (filter: object) => {
    return await repository.postByfilter(filter);
  };

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
    getbyUserId,
  };
};
export type PostRepositoryInterface = typeof postRepository;
