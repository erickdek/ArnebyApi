import { S3Client, ListObjectsCommand  } from "@aws-sdk/client-s3";
const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_BUCKET_PUBLIC_KEY, AWS_BUCKET_PRIVATE_KEY, AWS_BUCKET_ENDPOINT } = process.env;

export class S3 {
    static client = new S3Client({
        region: AWS_BUCKET_REGION,
        credentials:{
            accessKeyId: AWS_BUCKET_PUBLIC_KEY,
            secretAccessKey:AWS_BUCKET_PRIVATE_KEY,
        },
        endpoint: AWS_BUCKET_ENDPOINT,
    });

    static async getAll(){
        const listObjectsCommand = new ListObjectsCommand(AWS_BUCKET_NAME, '');
        const data = await client.send(listObjectsCommand);
        if(data.Contents) {
            console.log('data : ', data.Contents);
        }
    }
}