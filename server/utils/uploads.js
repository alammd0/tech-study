const cloudinary = require("../config/cloudinary");

exports.imageUploadCloudinary = async (file, folder) => {
  const uploadFile = file;
  console.log("Received file:", uploadFile);

  if (!uploadFile || !uploadFile.tempFilePath) {
    throw new Error("No file uploaded or tempFilePath missing.");
  }

  // Determine file type
  const mimeType = uploadFile.mimetype;
  let resourceType = "auto";

  if (mimeType.startsWith("image/")) {
    resourceType = "image";
  } else if (mimeType.startsWith("video/")) {
    resourceType = "video";
  }

  try {
    const options = {
      folder,
      resource_type: resourceType,
    };

    const response = await cloudinary.uploader.upload(
      uploadFile.tempFilePath,
      options
    );

    console.log("Upload successful:", response.secure_url);
    return response;
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    throw err;
  }
};
