const mongoose = require("mongoose");
const User = require('./user.model');

const WorkoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Workout title is required"],
        minlength: [3, "Workout title must be at least 3 characters long"]
    },
    description: {
        type: String,
        required: [true, "Please provide a short workout desription"]
    },
    reward: {
        type: Number,
        required: [true, "Please define a reward point value, from 0 - 1000"],
        min: [0, "Please use a value between 0 - 1000"],
        max: [1000, "Please use a value between 0 - 1000"]
    },
    creator: {
        type: mongoose.Types.ObjectId, ref: 'User'
    },
    exercises: [{}]
}, {timestamps: true});

module.exports = mongoose.model("Workout", WorkoutSchema);