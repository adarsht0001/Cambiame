import { response } from "express";
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

export const getUsernames = (
  name: string | undefined | any,
  userRepository: ReturnType<UserRepositoryInterFace>
) => {
  return new Promise<string[]>((resolve, reject) => {
    if (!name) resolve(["Search For User"]);
    else {
      userRepository.findByRegex(name).then((response) => {
        const usernames = response.map((user) => user.username);
        resolve(usernames);
      });
    }
  });
};

export const searchUsers = (
  name: any,
  user: any,
  userRepository: ReturnType<UserRepositoryInterFace>
) => {
  return new Promise<object>((resolve, reject) => {
    userRepository.findByRegex(name).then((response) => {
      if (response.length > 0) {
        let searchResult = response.map((users) => {
          if (users.followers.findIndex((data) => data.id == user) < 0) {
            users.set("isfollowing", false, { strict: false });
          } else {
            users.set("isfollowing", true, { strict: false });
          }
          return users;
        });
        resolve(searchResult);
      } else {
        reject({ msg: "user not found" });
      }
    });
  });
};
