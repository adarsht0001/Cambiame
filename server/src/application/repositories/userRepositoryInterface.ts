import { UserRepositoryDbReturn } from "../../framework/database/mongoDb/repositories/userRepository";

export const userRepository = (repository: UserRepositoryDbReturn) => {
  const getByEmail = async (email: string) => repository.getByEmail(email);

  return {
    getByEmail,
  };
};

export type UserRepositoryInterFace = typeof userRepository;
