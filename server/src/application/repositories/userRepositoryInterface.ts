import { UserRepositoryDbReturn } from "../../framework/database/mongoDb/repositories/userRepository";

export const userRepository = (repository: UserRepositoryDbReturn) => {
  const getByEmail = async (email: string) => repository.getByEmail(email);

  const getByName = async (name: string) => repository.getByName(name);

  const getById = async (id: string) => repository.getById(id);

  return {
    getByEmail,
    getByName,
    getById,
  };
};

export type UserRepositoryInterFace = typeof userRepository;
