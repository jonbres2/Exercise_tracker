const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require("../config/jwt.config");

// Register new user and create a cookie to pair with
module.exports.register = (req, res) => {
    const user = new User(req.body)
    user.save()
        .then(() => {
            res
                .cookie("usertoken", jwt.sign({ _id: user._id }, secret), { httpOnly: true })
                .json({ msg: "Successfully created user with cookie", user: user })
        })
        .catch(err => res.json(err))
}

// Log in a user
module.exports.login = async (req, res) => {
    // Checking to see if entered email is in the database
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
        res.json({ msg: "Invalid login attempt, email not in database" })
        return res.sendStatus(400);
    }
    // If email is matched, check entered password against hashed PW in database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if (!correctPassword) {
        res.json({ msg: "Incorrect password, please try again" })
        return res.sendStatus(400);
    }

    // If password is a match, create new cookie
    res
        .cookie("usertoken", jwt.sign({ _id: user._id }, secret), { httpOnly: true })
        .json({ msg: "Successfully logged in with cookie!" });
}

// Log out a user
module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

// Retrieve logged-in user's info
module.exports.getLoggedInUser = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});

    User.findById(decodedJWT.payload._id)
        .then(user => res.json({user}))
        .catch(err => res.json(err))
}