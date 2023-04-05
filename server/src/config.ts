import dotenv from 'dotenv'
dotenv.config()

const configKeys={
    awsBucketName:process.env.S3_BUCKET as string,
    
    awsBucketRegion:process.env.S3_REGION as string,

    awsAccessKey:process.env.S3_ACCESS_KEY as string,

    awsSecretAccessKey:process.env.S3_SECRECT_ACCESS_KEY as string,

    port:process.env.DATABASE_CONNECTION as string
}

export default configKeys