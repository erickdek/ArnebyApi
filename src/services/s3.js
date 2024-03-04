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
    static async upload({ file, dir = '', read = false }) {
        try {
            const stream = fs.createReadStream(file.tempFilePath);
            const key = dir + file.name;
    
            const uploadParams = {
                Bucket: AWS_BUCKET_NAME,
                Key: key,
                Body: stream,
                ACL: read ? 'public-read' : 'private'
            }
    
            const command = new PutObjectCommand(uploadParams);
            const result = await client.send(command);
    
            return { s3: result, url: key };
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
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