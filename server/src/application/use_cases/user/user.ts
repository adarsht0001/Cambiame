import { PostRepositoryInterface } from "../../repositories/postRepositoryInterface";
import { UserRepositoryInterFace } from "../../repositories/userRepositoryInterface";

export const getUserById = (
  name: string,
  userRepository: ReturnType<UserRepositoryInterFace>,
  postRepository: ReturnType<PostRepositoryInterface>
) => {
  return new Promise<object>((resolve, reject) => {
    userRepository.getByName(name).then((user) => {
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
