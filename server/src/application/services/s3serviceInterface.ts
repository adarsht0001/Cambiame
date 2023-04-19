import { S3serviceReturn } from "../../framework/services/s3Service";

export const s3ServiceInterface = (service: S3serviceReturn) => {
  const uploadtoS3 = async (fileData: any, name: string, mimetype: any) => {
    return await service.uploadtoS3(fileData, name, mimetype);
  };

  return {
    uploadtoS3,
  };
};

export type S3serviceInterface = typeof s3ServiceInterface;
