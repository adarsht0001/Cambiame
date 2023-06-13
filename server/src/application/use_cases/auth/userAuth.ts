import { UserRepositoryInterFace } from "../../repositories/userRepositoryInterface";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { Signup, User, Verificationpayload } from "../../../types/userTypes";
import { MailServiceInterface } from "../../services/mailServicesInterface";
import { Mail } from "../../../types/mailOption";
import { S3serviceInterface } from "../../services/s3serviceInterface";

export const userLogin = (
  email: string,
  password: string,
  userRepository: ReturnType<UserRepositoryInterFace>,
  authService: ReturnType<AuthServiceInterface>,
  s3Services: ReturnType<S3serviceInterface>
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
      const token = authService.createToken(payload);
      payload.id = user._id;
      payload.token = token;
      if (user.profilePhoto) {
        let url = await s3Services.getObjectSignedUrl(
          user.profilePhoto as string
        );
        payload.profile = url;
        resolve(payload);
      }
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
  return new Promise<any>(async (resolve, reject) => {
    const user = await userRepository.getByName(username);
    if (!user) {
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
        date: Date.now(),
      };
      const inserted = await userRepository.adduser(user);
      const secretKey = authService.secretKey(hashedPassword);
      const payload: Verificationpayload = {
        email: inserted.email,
        _id: inserted._id,
      };
      const token = authService.onetimeLink(payload, secretKey);
      const link = `https://cambiame.site/verifyemail/${inserted._id}/${token}`;
      const mailOpt: Mail = {
        from: "Cambiame <Cambiame@gmail.com>",
        to: inserted.email,
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

export const forgottenPassword = (
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
      const link = `https://cambiame.site/resetpassword/${user._id}/${token}`;
      const mailOpt: Mail = {
        from: "Cambiame <Cambiame@gmail.com>",
        to: user.email,
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

export const resetpassword = (
  id: string,
  token: string,
  password: string,
  userRepository: ReturnType<UserRepositoryInterFace>,
  authService: ReturnType<AuthServiceInterface>
) => {
  return new Promise<object>(async (resolve, reject) => {
    const user = await userRepository.getById(id);
    if (user) {
      const secretKey = authService.secretKey(user.password);
      const payload: any = authService.verifyJWT(token, secretKey);
      if (payload.expired) {
        reject(payload);
      } else {
        const hashedPassword = await authService.hashPassword(password);
        await userRepository.updateOne(
          { email: payload.email },
          { password: hashedPassword }
        );
        resolve({ msg: "password changed" });
      }
    } else {
      reject({
        msg: "User Not Found",
      });
    }
  });
};

export const verifyMail = (
  id: string,
  token: string,
  userRepository: ReturnType<UserRepositoryInterFace>,
  authService: ReturnType<AuthServiceInterface>
) => {
  return new Promise<object>(async (resolve, reject) => {
    const user = await userRepository.getById(id);
    if (user) {
      const secretKey = authService.secretKey(user.password);
      const payload: any = authService.verifyJWT(token, secretKey);
      if (payload.expired) {
        reject(payload);
      } else {
        await userRepository.updateOne(
          { email: user.email },
          { verified: true }
        );
        resolve({ msg: "Status changed" });
      }
    } else {
      reject({
        msg: "User Not Found",
      });
    }
  });
};
