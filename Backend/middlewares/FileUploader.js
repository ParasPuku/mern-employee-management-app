const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "employee_profile_images",
    allowed_formats: ["jpg", "png", "jpeg"], // Allowed file types
    public_id: (req, file) => file.originalname.split(".")[0] + "",
  },
});
const cloudinaryFileUploader = multer({ storage });

module.exports = {
  cloudinaryFileUploader,
};
