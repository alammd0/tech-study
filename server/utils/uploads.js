const cloudinary = require("cloudinary").v2;

exports.uploadImage = async (file, folder, height, quality) => {
    
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      height: height,
      quality: quality,
    });

    return result;

  } catch (err) {

    console.err("Error Uploading Image to Cloudinary:", err);
    throw new Error("Image upload failed");

  }
};
