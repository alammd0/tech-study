const cloudinary = require("../config/cloudinary");

exports.imageUploadCloudinary = async (file, folder) => {
  const uploadFile = file.thumbnail;
  console.log("file: yaha ", uploadFile);

  if (!uploadFile || !uploadFile.tempFilePath) {
    console.log("Kuch Hai : ");
  }

  console.log("next hai");

  try {
    const option = { folder, resource_type: "auto" };
    const response = await cloudinary.uploader.upload(
      uploadFile.tempFilePath,
      option
    );
    return response;
  } catch (err) {
    console.log("Cloudinary Upload Error:", err);
    throw err;
  }
};
