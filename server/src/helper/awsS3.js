const aws = require('aws-sdk');
const multer = require('multer');
const {S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand }= require("@aws-sdk/client-s3")
const crypto = require('crypto');

require("dotenv").config()

const BUCKET = process.env.S3_BUCKET
// const s3 = new aws.S3(awsconfig);
const s3Client = new S3Client({
    region:process.env.S3_REGION,
    credentials: {
      accessKeyId:process.env.S3_ACCESS_KEY,
      secretAccessKey:process.env.S3_SECRECT_ACCESS_KEY
    }
  })

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')


module.exports={
    upload :()=>{
        const storage = multer.memoryStorage()
        return multer({ storage: storage })
    },
    uploadtoS3:(fileData,email)=>{
        return new Promise((resolve, reject) => {
            const imageName = generateFileName()
            const path=`${email}/${imageName}.jpg`
            const params={
                Bucket:process.env.S3_BUCKET,
                Key:path,
                Body:fileData
            }
            const command = new PutObjectCommand(params);
            s3Client.send(command).then(()=>{
                resolve(path)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
}