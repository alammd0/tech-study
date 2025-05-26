const Section = require("../model/section");
const SubSection = require("../model/subsection");
const { imageUploadCloudinary } = require("../utils/uploads");

// Create Subsection
exports.createSubsection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;

    const video = req.files.video;

    if (!sectionId || !title || !description || !video) {
      return res.status(404).json({
        success: false,
        message: "all field are required",
      });
    }

    // upload videos on cloudinary
    const uploadVideo = await imageUploadCloudinary(
      video,
      process.env.CLOUDINARY_FOLDER_NAME
    );

    // create sub section
    const SubSectionDetails = await SubSection.create({
      title: title,
      duration: `${uploadVideo.duration}`,
      description: description,
      videoUrl: uploadVideo.secure_url,
    });

    // update Section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSections: SubSectionDetails,
        },
      },
      {
        new: true,
      }
    ).populate("subSections");

    return res.status(200).json({
      success: true,
      message: "Sub section Create",
    });
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      success: false,
      message: "Exrror throught created subSection",
    });
  }
};

// Update Subsection
exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionSectionId, title, description } = req.body;
    const subsection = await SubSection.findById(subSectionSectionId);

    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: "No found subsection Given this Id",
      });
    }

    if (title !== undefined) {
      subsection.title = title;
    }

    if (description !== undefined) {
      subsection.description = description;
    }

    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadVideo = await imageUploadCloudinary(
        video,
        process.env.CLOUDINARY_FOLDER_NAME
      );

      subsection.videoUrl = uploadVideo.secure_url;
      subsection.duration = `${uploadVideo.duration}`;
    }

    await subsection.save();

    return res.status(200).json({
      success: true,
      message: "Update Sub Section data",
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: "Error update sub section Data",
    });
  }
};

// Delete Subsection
exports.deleteSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionSectionId } = req.body;

    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subsection: subSectionSectionId,
        },
      }
    );

    const subsection = await SubSection.findByIdAndDelete({
      _id: subSectionSectionId,
    });

    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: "Not Found SubSection",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Detele SubSection Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(402).json({
      success: false,
      message: "error throught detele SubSection",
    });
  }
};
