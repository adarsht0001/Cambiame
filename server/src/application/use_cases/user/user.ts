import { PostRepositoryInterface } from "../../repositories/postRepositoryInterface";
import { UserRepositoryInterFace } from "../../repositories/userRepositoryInterface";

export const getUserById = (
  id: string,
  userRepository: ReturnType<UserRepositoryInterFace>,
  postRepository: ReturnType<PostRepositoryInterface>
) => {
  return new Promise((resolve, reject) => {
    userRepository.getById(id).then((user) => {
      if (user) {
        postRepository.getbyUser(user?.username).then((posts) => {
          const profile = {
            user,
            posts,
          };
          resolve(profile);
        });
      } else {
        reject({ msg: "user not found" });
      }
    });
  });
};
