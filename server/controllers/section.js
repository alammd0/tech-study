const Course = require("../model/course");
const Section = require("../model/section");

// Section Create
const createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    console.log();

    if (!sectionName || !courseId) {
      return res.status(404).json({
        success: false,
        message: "Not found, Please check course Id and SectionName",
      });
    }

    // create new section
    const newSection = await Section.create({
      sectionName,
    });

    // update the course
    const updatedCourse = Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      {
        new: true,
      }
    ).exec();

    return res.status(201).json({
      success: true,
      message: "Section Create Successfully",
      data: updatedCourse,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: true,
      message: "Error throw create section",
    });
  }
};

// Section Update
const updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;

    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Section updated",
    });
  } catch (err) {
    return res.status(500).json({
      success: true,
      message: "Error throught Update Section",
    });
  }
};

// Section Delete
const deleteSection = async (req, res) => {
  try {
    console.log(req.params.id);
    const sectionId = req.params.id;
    console.log(sectionId);

    const deleteSection = await Section.findByIdAndDelete(sectionId);

    if (!deleteSection) {
      return res.status(404).json({
        success: false,
        message: "Not Section Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted section",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error while Delete section",
    });
  }
};

module.exports = {
  createSection,
  updateSection,
  deleteSection,
};
