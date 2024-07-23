import config from "../../config/config";
import cloudinary from "cloudinary";
import ApiError from "./APIError";
import httpStatus from "http-status";

cloudinary.v2.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME || "",
  api_key: config.CLOUDINARY_API_KEY || "",
  api_secret: config.CLOUDINARY_API_SECRET || "",
});

export const uploadToCloudinary = async (file: string, folder: string) => {
  try {
    const result = await cloudinary.v2.uploader.upload(file, { folder });
    return result?.secure_url;
  } catch (error) {
    console.log(error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Cloudinary upload failed"
    );
  }
};
