import { response } from "express";
import { PostRepositoryInterface } from "../../repositories/postRepositoryInterface";
import { UserRepositoryInterFace } from "../../repositories/userRepositoryInterface";
import { Follow } from "../../../types/userTypes";
import { S3serviceInterface } from "../../services/s3serviceInterface";

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

export const editUser = (
  id: string,
  data: any,
  file: Express.Multer.File[] | undefined | any,
  s3Services: ReturnType<S3serviceInterface>,
  userRepository: ReturnType<UserRepositoryInterFace>
) => {
  return new Promise<any>(async (resolve, reject) => {
    const user = await userRepository.getById(id);
    const emailExist = await userRepository.getByEmail(data.email);

    if (emailExist && data.email !== user?.email) {
      reject({
        msg: "email already exists",
        email: true,
      });
      return;
    }

    const userExist = await userRepository.getByName(data.name);
    if (userExist && data.name !== user?.username) {
      reject({
        msg: "username already exists",
        name: true,
      });
      return;
    }
    if (file.length === 0) {
      await userRepository.updateOne(
        { username: user?.username },
        { $set: { username: data.name, email: data.email } }
      );
      resolve({
        msg: "profile updated",
        username: data.name,
        email: data.email,
      });
    }
    const links: any = await Promise.all(
      file?.map(async (file: Express.Multer.File) => {
        const link = await s3Services.uploadtoS3(
          file.buffer,
          file.fieldname,
          file.mimetype
        );
        return { type: file.fieldname, link };
      })
    );
    await userRepository.updateOne(
      { username: user?.username },
      {
        $set: {
          username: data.name,
          email: data.email,
          profilePhoto:
            links.find((link: any) => link.type === "profile")?.link ||
            user?.profilePhoto,
          coverPhoto:
            links.find((link: any) => link.type === "cover")?.link ||
            user?.coverPhoto,
        },
      }
    );
    resolve({ msg: "profile updated", username: data.name, email: data.email });
  });
};
