const jwt = require('jsonwebtoken');
//For ease of development, including the JWT signature in the main code, rather than
//an environment variable. Production model would store as a hidden .env using dotenv
const secret = "32HerbsAndSpices";

//Allowing export of secret key
module.exports.secret = secret;

//Allowing export of authentication of the payload of the cookie
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        }
        else {
            next();
        }
    });
};