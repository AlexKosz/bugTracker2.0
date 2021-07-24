const mongoose = require("mongoose");


const BugSchema = new mongoose.Schema({
    project: {
        type: String,
        required: [true, "Project name is required"]
    },

    description: {
        type: String,
        required: [true, "Description is required"]
    },

    priority: {
        type: String,
        required: [true, "Priorty is required"]
    },

    solution: {
        type: String
    },

    userId: {
        type: String,
        required: [true, "userId is required"]
    }





}, { timestamps: true });




BugSchema.pre('validate', function (next) {
    if (this.priority === "") {
        this.invalidate('priority', 'You must select a priority');
    }
    next();
});

module.exports = mongoose.model("Bug", BugSchema);