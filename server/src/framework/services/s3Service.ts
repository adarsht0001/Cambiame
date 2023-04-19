import configKeys from "../../config";
import crypto from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: configKeys.awsBucketRegion,
  credentials: {
    accessKeyId: configKeys.awsAccessKey,
    secretAccessKey: configKeys.awsSecretAccessKey,
  },
});

export const s3Service = () => {
  const uploadtoS3 = async (fileData: any, name: string, mimetype: any) => {
    const imageName = crypto.randomBytes(32).toString("hex");
    const path = `${name}/${imageName}`;
    const params = {
      Bucket: configKeys.awsBucketName,
      Key: path,
      Body: fileData,
      ContentType: mimetype,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);
    return path;
  };
  return {
    uploadtoS3,
  };
};

export type S3service = typeof s3Service;
export type S3serviceReturn = ReturnType<S3service>;
