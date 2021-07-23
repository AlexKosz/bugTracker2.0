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
        type: number,
        required: [true, "userId is required"]
    }





}, { timestamps: true });




BugSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

