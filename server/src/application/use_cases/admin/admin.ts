import { PostRepositoryInterface } from "../../repositories/postRepositoryInterface";
import { UserRepositoryInterFace } from "../../repositories/userRepositoryInterface";
import { AuthServiceInterface } from "../../services/authServiceInterface";

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
  return new Promise<void>(async (resolve, reject) => {
    const user = await userRepository.getByEmail(email);
    await userRepository.updateOne({ email }, { blocked: !user?.blocked });
    resolve();
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
      report: { $gt: 10 },
    });
    resolve(posts);
  });
};
