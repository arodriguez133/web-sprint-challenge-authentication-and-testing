const { findBy } = require('.././auth/model')

const checkUsernameExists = async (req, res, next) => {
    try {
        const rows = await findBy({ username: req.body.username });
        if (rows.length) {
            req.userData = rows[0];
            next();
        } else {
            res.status(422).json({ message: "invalid credentials" });
        }
    } catch (e) {
        res.status(500).json({ message: "server error" });
    }
};

module.exports = checkUsernameExists