const WorkoutController = require("../controllers/workout.controller");

module.exports = function (app) {
    app.post('/api/workout/create', WorkoutController.create)
    app.get('/api/workout', WorkoutController.findAllWorkouts)
}