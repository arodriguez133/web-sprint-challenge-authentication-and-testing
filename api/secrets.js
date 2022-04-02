const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "espressochulo"

const createToken = (user) => {
    const payload = {
        subject: user.id,
        username: user.username,
    };

    const options = {
        expiresIn: "1d"
    };

    return JWT.sign(payload, JWT_SECRET, options);
};

module.exports = {
    createToken,
    JWT_SECRET,
}