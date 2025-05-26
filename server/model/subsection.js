const mongoose = require("mongoose");

const subSectionsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    description : {
        type : String,
        required : true,
        trim : true
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
module.exports = SubSection ;