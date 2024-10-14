import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  stripe_sk: process.env.STRIPE_SK,
  nodemailer_auth_user: process.env.NODEMAILER_AUTH_USER,
  nodemailer_auth_pass: process.env.NODEMAILER_AUTH_PASS,
};
