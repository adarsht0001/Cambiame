import { UserRepositoryInterFace } from "../../repositories/userRepositoryInterface";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { User } from "../../../types/loginResponse";

export const userLogin = async (
  email: string,
  password: string,
  userRepository: ReturnType<UserRepositoryInterFace>,
  authService: ReturnType<AuthServiceInterface>
) => {
  return new Promise<User>(async (resolve, reject) => {
    const user = await userRepository.getByEmail(email);
    if (user) {
      if (user.blocked) {
        reject({
          email: true,
          msg: "email Has been blocked",
        });
      }
      if (!user.verified) {
        reject({
          email: true,
          msg: "Verify your Email",
        });
      }
      const isPasswordCorrect = await authService.comparePassword(
        password,
        user.password
      );
      if (!isPasswordCorrect) {
        reject({
          msg: "incorrect password",
          password: true,
        });
      }
      const payload: User = {
        email: user.email,
        username: user.username,
      };
      const token = authService.createToken(user);
      payload.token = token;
      resolve(payload);
    } else {
      reject({
        msg: "Invalid User",
        email: true,
      });
    }
  });
};

export default userLogin;
