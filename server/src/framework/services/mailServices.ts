const nodemailer = require("nodemailer");
import { google } from "googleapis";
import configKeys from "../../config";
import { Mail } from "../../types/mailOption";

export const mailService = () => {
  const sendMail = async (mailOption: Mail) => {
    const oAuth2Client = new google.auth.OAuth2(
      configKeys.oAuth2_CLIENT_ID,
      configKeys.oAuth2_CLIENT_SECRECT,
      configKeys.oAuth2_RIDERECT_URI
    );
    oAuth2Client.setCredentials({
      refresh_token: process.env.oAuth2_REFRESH_TOKEN,
    });
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "adarsht00001@gmail.com",
        clientId: process.env.oAuth2_CLIENT_ID,
        clientSecret: process.env.oAuth2_CLIENT_SECRECT,
        refreshToken: process.env.oAuth2_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    await transport.sendMail(mailOption);
    return;
  };
  return {
    sendMail,
  };
};

export type MailService = typeof mailService;

export type MailServiceReturn = ReturnType<MailService>;
