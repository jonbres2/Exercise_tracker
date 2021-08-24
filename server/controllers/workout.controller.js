const Workout = require("../models/workout.model");
const User = require("../models/user.model");

// Create a new workout routine
module.exports.create = (req, res) => {
    const workout = new Workout(req.body)
    const userId = workout.creatingUser
    workout.save()
        .then(() => {
            res.json({ msg: "Successfully created workout routine", workout })
        })
        .catch(err => res.json(err))

    // Find user and then push workout ID to the array of createdWorkouts
    const user = User.findOne({ _id: userId })
    user.updateOne({ $push: { createdWorkouts: workout._id } })
}

// Find all workouts by all users
module.exports.findAllWorkouts = (req, res) => {
    Workout.find({})
        .then(allWorkouts => res.json({ workouts: allWorkouts }))
        .catch(err => res.json({ msg: "Error with retrieving all workouts", error: err }));
}