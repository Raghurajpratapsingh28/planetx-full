"use server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";
dotenv.config();

const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const bucketName = process.env.AWS_BUCKET_NAME;

export async function uploadPropertyImages(formData, numberOfImages) {
    try {
      const imageURLs = [];

      for (let i = 0; i < numberOfImages; i++) {
        const file = formData.get(`images-${i}`);
        if(!file) return JSON.stringify({ success: false, error: 'File not provided' });

        let imageURL = '';
        console.log(file.name);

        const fileExtension = file.name.toLowerCase().split('.')[file.name.toLowerCase().split('.').length-1];

        if (fileExtension === "png" || fileExtension === "jpg" ||  fileExtension === "jpeg") {
            const buffer = Buffer.from(await file.arrayBuffer());
    
            // Configure the upload parameters
            const uploadParams = {
                Bucket: bucketName,
                Key: file.name,
                Body: buffer,
                ContentType: `image/${fileExtension}`,
            };
        
            // Upload the file
            const data = await s3Client.send(new PutObjectCommand(uploadParams));

            console.log("Upload successful: ", data);

            const signedUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.name}`;
            imageURL = signedUrl;

            imageURLs.push(imageURL);
        }else{
            return JSON.stringify({ success: false, error: "Only .png, .jpg, .jpeg files are allowed"});
        }
      }

      return JSON.stringify({ success: true, message: 'File upload to object store', imageURLs: imageURLs });
    } catch (error) {
      console.error("Error uploading Image:", error);
      return JSON.stringify({ success: false, error: error.message });
    }
}

export async function uploadPropertyVideo(formData) {
    try {
        const file = formData.get("video");
        if(!file) return JSON.stringify({ success: false, error: 'File not provided' });

        let videoURL = '';
        console.log(file.name);

        const fileExtension = file.name.toLowerCase().split('.')[file.name.toLowerCase().split('.').length-1];

        if (fileExtension === "mp4") {
            const buffer = Buffer.from(await file.arrayBuffer());
    
            // Configure the upload parameters
            const uploadParams = {
                Bucket: bucketName,
                Key: file.name,
                Body: buffer,
                ContentType: `video/${fileExtension}`,
            };
        
            // Upload the file
            const data = await s3Client.send(new PutObjectCommand(uploadParams));

            console.log("Upload successful: ", data);

            const signedUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.name}`;
            videoURL = signedUrl;
        }else{
            return JSON.stringify({ success: false, error: "Only .mp4 files are allowed"});
        }

        return JSON.stringify({ success: true, message: 'File upload to object store', videoURL: videoURL });
    } catch (error) {
        console.error("Error uploading Video:", error);
        return JSON.stringify({ success: false, error: error.message });
    }
}
