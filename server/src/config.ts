import dotenv from "dotenv";
dotenv.config();

const configKeys = {
  awsBucketName: process.env.S3_BUCKET as string,

  awsBucketRegion: process.env.S3_REGION as string,

  awsAccessKey: process.env.S3_ACCESS_KEY as string,

  awsSecretAccessKey: process.env.S3_SECRECT_ACCESS_KEY as string,

  mongoDbUrl: process.env.DATABASE_CONNECTION as string,

  port: process.env.port || 5000,

  jwtSecret: process.env.ACESS_TOKEN_SCERET as string,

  oAuth2_CLIENT_ID: process.env.oAuth2_CLIENT_ID as string,

  oAuth2_CLIENT_SECRECT: process.env.oAuth2_CLIENT_SECRECT as string,

  oAuth2_RIDERECT_URI: process.env.oAuth2_RIDERECT_URI as string,
};

export default configKeys;
