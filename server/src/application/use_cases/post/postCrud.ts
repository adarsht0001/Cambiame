import { postType } from "../../../types/postType";
import { PostRepositoryInterface } from "../../repositories/postRepositoryInterface";
import { UserRepositoryInterFace } from "../../repositories/userRepositoryInterface";
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
      if (post?.image) {
        await s3Services.deleteFile(post?.image as string);
      }
      resolve({
        msg: "post deleted",
      });
    });
  });
};

export const likeaPost = (
  userId: string,
  postId: string,
  postRepository: ReturnType<PostRepositoryInterface>,
  userRepository: ReturnType<UserRepositoryInterFace>
) => {
  return new Promise<object>((resolve, reject) => {
    postRepository.getById(postId).then(async (post) => {
      const exist = post?.likedby.some((obj) => obj.id === userId);
      const filter = post?._id;
      if (exist) {
        const update = {
          $pull: { likedby: { id: userId } },
          $inc: { likes: -1 },
        };
        await postRepository.updateById(filter, update);
        resolve({ msg: "un-liked post" });
      } else {
        const data = await userRepository.getById(userId);
        const user = {
          id: data?._id.toString(),
          name: data?.username,
          profile: data?.profile,
        };
        const update = { $push: { likedby: user }, $inc: { likes: +1 } };
        await postRepository.updateById(filter, update);
        resolve({ msg: "liked the post" });
      }
    });
  });
};

export const reportaPost = (
  userId: string,
  postId: string,
  postRepository: ReturnType<PostRepositoryInterface>,
  userRepository: ReturnType<UserRepositoryInterFace>
) => {
  return new Promise<object>((resolve, reject) => {
    postRepository.getById(postId).then(async (post) => {
      const exist = post?.reportedby.some((obj) => obj === userId);
      if (exist) {
        resolve({ msg: "Already reported" });
      } else {
        const update = {
          $push: { reportedby: userId },
          $inc: { report: +1 },
        };
        postRepository.updateById(postId, update);
        resolve({ msg: "Reported SuccesFully" });
      }
    });
  });
};
