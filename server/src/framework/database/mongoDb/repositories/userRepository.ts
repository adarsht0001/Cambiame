import User from "../models/userModels";

export const userRepositoryMongoDB = () => {
  const getByEmail = async (email: string) => {
    return await User.findOne({ email: email });
  };
  return {
    getByEmail,
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
export type UserRepositoryDbReturn = ReturnType<UserRepositoryMongoDB>;
