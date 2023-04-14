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

  return {
    getByEmail,
    getByName,
    getById,
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
export type UserRepositoryDbReturn = ReturnType<UserRepositoryMongoDB>;
