const mongoose = require("mongoose");

const subSectionsSchema = new mongoose.Schema({
    subSectionName: {
        type: String,
        required: true,
        trim: true,
    },
    
    videoUrl: {
        type: String,
        required: true,
    },
    
    duration: {
        type: String,
        required: true,
    },
    
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
    },
})

const SubSection = mongoose.model("SubSection", subSectionsSchema);
export default SubSection;