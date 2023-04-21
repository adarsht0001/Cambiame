import { S3serviceReturn } from "../../framework/services/s3Service";

export const s3ServiceInterface = (service: S3serviceReturn) => {
  const uploadtoS3 = async (fileData: any, name: string, mimetype: any) => {
    return await service.uploadtoS3(fileData, name, mimetype);
  };

  const getObjectSignedUrl = async (key: string) => {
    return await service.getObjectSignedUrl(key);
  };

  const deleteFile = async (filename: string) => {
    return await service.deleteFile(filename);
  };
  return {
    uploadtoS3,
    getObjectSignedUrl,
    deleteFile,
  };
};

export type S3serviceInterface = typeof s3ServiceInterface;
