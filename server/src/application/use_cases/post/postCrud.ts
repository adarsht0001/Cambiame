import { postType } from "../../../types/postType";
import { PostRepositoryInterface } from "../../repositories/postRepositoryInterface";
import { S3serviceInterface } from "../../services/s3serviceInterface";

export const addPost = (
  name: string,
  caption: string,
  file: Express.Multer.File | undefined,
  postRepository: ReturnType<PostRepositoryInterface>,
  s3Services: ReturnType<S3serviceInterface>
) => {
  return new Promise<object>(async (resolve, reject) => {
    const post: postType = {
      user: name,
      caption: name,
      date: Date.now(),
    };
    if (file) {
      const path = await s3Services.uploadtoS3(
        file.buffer,
        name,
        file.mimetype
      );
      post.image = path;
      postRepository
        .addPost(post)
        .then(() => {
          resolve({ msg: "post added" });
        })
        .catch((err) => reject(err));
    } else {
      postRepository
        .addPost(post)
        .then(() => {
          resolve({ msg: "post added" });
        })
        .catch((err) => reject(err));
    }
  });
};
