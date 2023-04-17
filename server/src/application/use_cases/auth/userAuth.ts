import { UserRepositoryInterFace } from "../../repositories/userRepositoryInterface";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { Signup, User, Verificationpayload } from "../../../types/userTypes";
import { MailServiceInterface } from "../../services/mailServicesInterface";
import { Mail } from "../../../types/mailOption";

export const userLogin = (
  email: string,
  password: string,
  userRepository: ReturnType<UserRepositoryInterFace>,
  authService: ReturnType<AuthServiceInterface>
) => {
  return new Promise<User>(async (resolve, reject) => {
    const user = await userRepository.getByEmail(email);
    if (user) {
      if (user.blocked) {
        reject({ email: true, msg: "email Has been blocked" });
      }
      if (!user.verified) {
        reject({ email: true, msg: "Verify your Email" });
      }
      const isPasswordCorrect = await authService.comparePassword(
        password,
        user.password
      );
      if (!isPasswordCorrect) {
        reject({ msg: "incorrect password", password: true });
      }
      const payload: User = {
        email: user.email,
        username: user.username,
      };
      const token = authService.createToken(user);
      payload.token = token;
      resolve(payload);
    } else {
      reject({ msg: "Invalid User", email: true });
    }
  });
};

export const userSignup = (
  username: string,
  email: string,
  password: string,
  userRepository: ReturnType<UserRepositoryInterFace>,
  authService: ReturnType<AuthServiceInterface>,
  mailService: ReturnType<MailServiceInterface>
) => {
  return new Promise<Signup>(async (resolve, reject) => {
    const user = await userRepository.getByName(username);
    if (user !== null) {
      const emailExist = await userRepository.getByEmail(email);
      if (emailExist) {
        reject({
          msg: "email already exists",
          email: true,
        });
      }
      const hashedPassword = await authService.hashPassword(password);
      const user: Signup = {
        username: username,
        email: email,
        password: hashedPassword,
      };
      const inserted = await userRepository.adduser(user);
      const secretKey = authService.secretKey(hashedPassword);
      const payload: Verificationpayload = {
        email: inserted.email,
        _id: inserted._id,
      };
      const token = authService.onetimeLink(payload, secretKey);
      const link = `http://localhost:3000/verifyemail/${inserted._id}/${token}`;
      const mailOpt: Mail = {
        from: "Cambiame <Cambiame@gmail.com>",
        to: "adarsht00001@gmail.com",
        subject: "Verificaton Link",
        text: `Your Verificaton Link is:${link}`,
        html: `<hi>Your Verificaton Link Link is:${link}</h1>`,
      };
      mailService.sendMail(mailOpt);
      resolve(inserted);
    } else {
      reject({
        msg: "username already exists",
        name: true,
      });
    }
  });
};

export const forgottenPassword = async (
  email: string,
  userRepository: ReturnType<UserRepositoryInterFace>,
  authService: ReturnType<AuthServiceInterface>,
  mailService: ReturnType<MailServiceInterface>
) => {
  return new Promise<void>(async (resolve, reject) => {
    const user = await userRepository.getByEmail(email);
    if (user) {
      const secretKey = authService.secretKey(user.password);
      const payload: Verificationpayload = {
        email: user.email,
        _id: user._id,
      };
      const token = authService.forgottenPassword(payload, secretKey);
      const link = `http://localhost:3000/verifyemail/${user._id}/${token}`;
      const mailOpt: Mail = {
        from: "Cambiame <Cambiame@gmail.com>",
        to: "adarsht00001@gmail.com",
        subject: "RESET PASSWORD",
        text: `Your Reset Password Link is:${link}`,
        html: `<hi>Your Reset Password Link is:${link}</h1>`,
      };
      mailService.sendMail(mailOpt);
      resolve();
    } else {
      reject({
        msg: "User Not Found",
        email: true,
      });
    }
  });
};
