import { PostRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/postRepository";
import { PostRepositoryInterface } from "../../application/repositories/postRepositoryInterface";
import expressAsyncHandler from "express-async-handler";
const postController = (
  postRepositortyImpl: PostRepositoryMongoDB,
  postRepository: PostRepositoryInterface
) => {
  const postRepo = postRepository(postRepositortyImpl());

  const createPost = expressAsyncHandler;
  async (req: Request, res: Response) => {};
};
export default postController;
