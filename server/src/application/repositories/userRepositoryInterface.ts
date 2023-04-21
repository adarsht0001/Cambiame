import { UserRepositoryDbReturn } from "../../framework/database/mongoDb/repositories/userRepository";
import { Signup } from "../../types/userTypes";

export const userRepository = (repository: UserRepositoryDbReturn) => {
  const getByEmail = async (email: string) => repository.getByEmail(email);

  const getByName = async (name: string) => repository.getByName(name);

  const getById = async (id: string) => repository.getById(id);

  const adduser = async (user: Signup) => repository.adduser(user);

  const updateOne = async (filter: object, update: object) =>
    repository.updateOne(filter, update);

  const getAllUser = async () => await repository.getAllUser();

  return {
    getByEmail,
    getByName,
    getById,
    adduser,
    updateOne,
    getAllUser,
  };
};

export type UserRepositoryInterFace = typeof userRepository;
