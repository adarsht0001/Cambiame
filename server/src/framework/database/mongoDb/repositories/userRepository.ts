import { Signup } from "../../../../types/userTypes";
import User from "../models/userModels";

export const userRepositoryMongoDB = () => {
  const getByEmail = async (email: string) => {
    return await User.findOne({ email: email });
  };

  const getByName = async (name: string) => {
    return await User.findOne({ username: name });
  };

  const getById = async (id: string) => {
    return await User.findById(id);
  };

  const adduser = async (user: Signup) => {
    return await User.create(user);
  };

  const updateOne = async (filter: object, update: object) => {
    return await User.updateOne(filter, update);
  };

  const getAllUser = async () => await User.find({});

  return {
    getByEmail,
    getByName,
    getById,
    adduser,
    updateOne,
    getAllUser,
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
export type UserRepositoryDbReturn = ReturnType<UserRepositoryMongoDB>;
