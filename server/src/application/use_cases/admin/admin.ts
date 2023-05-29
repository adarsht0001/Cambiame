import AppError from "../../../utils/appErrors";
import { PostRepositoryInterface } from "../../repositories/postRepositoryInterface";
import { UserRepositoryInterFace } from "../../repositories/userRepositoryInterface";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { S3serviceInterface } from "../../services/s3serviceInterface";

const admin = { email: "Admin", pass: "123" };

export const Adminlogin = (
  email: string,
  password: string,
  authService: ReturnType<AuthServiceInterface>
) => {
  return new Promise<object>((resolve, reject) => {
    if (email == admin.email && password == admin.pass) {
      const token = authService.createToken(admin);
      const payload = {
        email,
        token,
      };
      resolve(payload);
    } else {
      if (email !== admin.email) {
        reject({ msg: "Invalid name", name: true });
      }
      reject({ msg: "Invalid password", password: true });
    }
  });
};

export const getAllUser = (
  userRepository: ReturnType<UserRepositoryInterFace>
) => {
  return new Promise<object[]>((resolve, reject) => {
    userRepository.getAllUser().then((users) => {
      resolve(users);
    });
  });
};

export const blockUnblock = (
  email: string,
  userRepository: ReturnType<UserRepositoryInterFace>
) => {
  return new Promise<object>(async (resolve, reject) => {
    const user = await userRepository.getByEmail(email);
    await userRepository.updateOne({ email }, { blocked: !user?.blocked });
    if (user?.blocked) {
      resolve({ msg: "unblocked user" });
    } else {
      resolve({ msg: "blocked user" });
    }
  });
};

export const getDashboards = (
  userRepository: ReturnType<UserRepositoryInterFace>,
  postRepository: ReturnType<PostRepositoryInterface>
) => {
  return new Promise<object>(async (resolve, reject) => {
    const [usercount, blockedCount, verifiedCount, postCount] =
      await Promise.all([
        userRepository.getUsercount(),
        userRepository.getCountof({ blocked: true }),
        userRepository.getCountof({ verified: true }),
        postRepository.getPostcount(),
      ]);

    const data = { usercount, blockedCount, verifiedCount, postCount };
    resolve(data);
  });
};

export const reportedPosts = (
  postRepository: ReturnType<PostRepositoryInterface>
) => {
  return new Promise<object>(async (resolve, reject) => {
    const posts = await postRepository.postByfilter({
      report: { $gte: 10 },
    });
    resolve(posts);
  });
};

export const singlePost = (
  postRepository: ReturnType<PostRepositoryInterface>,
  s3Services: ReturnType<S3serviceInterface>,
  postId: string,
  userRepository: ReturnType<UserRepositoryInterFace>
) => {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const post = await postRepository.getById(postId);
      const user = await userRepository.getById(post?.userId as string);
      if (user?.profilePhoto) {
        let url = await s3Services.getObjectSignedUrl(user.profilePhoto);
        post?.set("userProfile", url, { strict: false });
      }
      if (post?.image) {
        let url = await s3Services.getObjectSignedUrl(post.image);
        post.set("link", url, { strict: false });
      }
      resolve(post);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllpostGraph = (
  postRepository: ReturnType<PostRepositoryInterface>
) => {
  return new Promise<any>(async (resolve, reject) => {
    const post = await postRepository.getPosts();
    resolve(post);
  });
};
