const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

cloudinary.config({
  cloud_name: "dsbrrduez",
  api_key: "716455646163187",
  api_secret: "ej3kKqqnMMw7hNDKBei3Bfjz_cA",
});
const uploadOnCloudinary = async (localFilePath) => {
  try {
    const formattedPath = path.resolve(localFilePath).replace(/\\/g, "/");

    const result = await cloudinary.uploader.upload(formattedPath, {
      resource_type: "image",
    });

    fs.unlinkSync(formattedPath); // Cleanup local file after upload

    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Cleanup even on failure
    }
    return null;
  }
};

module.exports = uploadOnCloudinary;
