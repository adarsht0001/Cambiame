import { MailServiceReturn } from "../../framework/services/mailServices";
import { Mail } from "../../types/mailOption";

export const mailServiceInterface = (service: MailServiceReturn) => {
  const sendMail = (mailOption: Mail) => {
    service.sendMail(mailOption);
  };

  return { sendMail };
};

export type MailServiceInterface = typeof mailServiceInterface;
