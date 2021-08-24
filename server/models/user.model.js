const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters or longer"],
    },
    createdWorkouts: [{
        type: mongoose.Types.ObjectId, ref: 'Workout'
    }]
}, { timestamps: true });

//Saving the confirm password to a virtual field
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

//Validate that confirm password and password match before saving the user to the database
//If matching, move on to the full validation
UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password and confirmed password do not match');
    }
    next();
});

//Hash password via Bcrypt, 10 'salt' rounds
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            console.log("HASHING OF PASSWORD FAILED", err)
            next()
        });
});

module.exports = mongoose.model("User", UserSchema);