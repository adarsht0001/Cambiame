import { postType } from "../../../types/postType";
import {
  PostRepositoryInterface,
  postRepository,
} from "../../repositories/postRepositoryInterface";
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
      caption: caption,
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

export const getPosts = (
  postRepository: ReturnType<PostRepositoryInterface>,
  s3Services: ReturnType<S3serviceInterface>
) => {
  return new Promise<object[]>((resolve, reject) => {
    postRepository.getPosts().then(async (posts) => {
      for (let post of posts) {
        if (post.image) {
          let url = await s3Services.getObjectSignedUrl(post.image);
          post.set("link", url, { strict: false });
        }
      }
      resolve(posts);
    });
  });
};

export const removePost = (
  id: string,
  postRepository: ReturnType<PostRepositoryInterface>,
  s3Services: ReturnType<S3serviceInterface>
) => {
  return new Promise<object>((resolve, reject) => {
    postRepository.deleteById(id).then(async (post) => {
      await s3Services.deleteFile(post?.image as string);
      resolve({
        msg: "post deleted",
      });
    });
  });
};
