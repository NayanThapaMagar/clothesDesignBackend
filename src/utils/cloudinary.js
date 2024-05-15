import { config } from "dotenv";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import logger from '../../logger/index.js';

config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("file uploaded");
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        logger.log('error', error);
        // reomving locally saved file as upload failed
        fs.unlinkSync(localFilePath)
        return null
    }
}




export default uploadOnCloudinary;