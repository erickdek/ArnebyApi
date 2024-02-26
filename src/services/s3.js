import { S3Client, ListObjectsCommand, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs';

//ENV variables
const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_BUCKET_PUBLIC_KEY, AWS_BUCKET_PRIVATE_KEY, AWS_BUCKET_ENDPOINT } = process.env;

const client = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials:{
        accessKeyId: AWS_BUCKET_PUBLIC_KEY,
        secretAccessKey:AWS_BUCKET_PRIVATE_KEY,
    },
    endpoint: AWS_BUCKET_ENDPOINT,
});

export class S3 {
    /**
     * Upload a file to the bucket.
     * @param {*} file 
     * @returns 
     */
    static async upload(file){
        const stream = fs.createReadStream(file.tempFilePath);
        const uploadParams = {
            Bucket: AWS_BUCKET_NAME,
            Key: file.name,
            Body: stream
        }

        const command = new PutObjectCommand(uploadParams);

        return await client.send(command);
    }


    /**
     * Get all files from the bucket
     * @returns 
     */
    static async getAll(){
        const listObjectsCommand = new ListObjectsCommand({
            Bucket: AWS_BUCKET_NAME
        });

        return await client.send(listObjectsCommand);
    }


    /**
     * Get a file from the bucket
     * @param {*} file 
     * @returns 
     */
    static async get(file){
        const command = new GetObjectCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: file
        });
        
        return await client.send(command);
    }


    /**
     * Download a file from the bucket
     * @param {*} file 
     */
    static async download(file){
        const command = new GetObjectCommand({
            
        });
    }
}