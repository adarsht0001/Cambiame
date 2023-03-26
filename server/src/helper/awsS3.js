const multer = require('multer');
const {S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand }= require("@aws-sdk/client-s3")
const crypto = require('crypto');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


require("dotenv").config()

const BUCKET = process.env.S3_BUCKET
const s3 = new S3Client({
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
    uploadtoS3:(fileData,name,mimetype)=>{
        return new Promise((resolve, reject) => {
            const imageName = generateFileName()
            const path=`${name}/${imageName}`
            const params={
                Bucket:process.env.S3_BUCKET,
                Key:path,
                Body:fileData,
                'ContentType': mimetype
            }
            const command = new PutObjectCommand(params);
            s3.send(command).then(()=>{
                resolve(path)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    getObjectSignedUrl:async(key)=> {
        const params = {
          Bucket: BUCKET,
          Key: key
        }
      
        // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
        const command = new GetObjectCommand(params);
        const seconds = 600000
        const url = await getSignedUrl(s3, command, { expiresIn: seconds });
      
        return url
    },
    deleteFile:(fileName) =>{
        const deleteParams = {
          Bucket: bucketName,
          Key: fileName,
        }
      
        return s3.send(new DeleteObjectCommand(deleteParams));
      }

}