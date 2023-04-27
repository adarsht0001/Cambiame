import { response } from "express";
import { PostRepositoryInterface } from "../../repositories/postRepositoryInterface";
import { UserRepositoryInterFace } from "../../repositories/userRepositoryInterface";
import { Follow } from "../../../types/userTypes";

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

export const followUser = (
  name: any,
  user: Follow,
  userRepository: ReturnType<UserRepositoryInterFace>
) => {
  return new Promise<object>((resolve, reject) => {
    userRepository.getByName(name).then((data: any) => {
      if (data?.username === user.name) {
        reject({ msg: "cannot follow yourself" });
      }
      const toFollow = {
        id: data?._id,
        name: data?.username,
        email: data?.email,
        profile: data?.profile || null,
      };
      const data22 = data?.followers?.findIndex(
        (followers: any) => followers?.id == user?.id
      );
      console.log(data22);

      if (
        data?.followers?.findIndex(
          (followers: any) => followers?.id == user?.id
        ) < 0
      ) {
        userRepository.updateOne(
          { username: name },
          { $push: { followers: user } }
        );
        userRepository.updateOne(
          { username: user.name },
          { $push: { following: toFollow } }
        );
        resolve({ msg: `following` });
      } else {
        userRepository.updateOne(
          { username: name },
          { $pull: { followers: { id: user.id } } }
        );
        userRepository.updateOne(
          { username: user.name },
          { $pull: { following: { id: toFollow.id } } }
        );
        resolve({ msg: `un-following` });
      }
    });
  });
};
