const { findBy } = require('.././auth/model')

async function checkUserNameFree(req, res, next) {
    try {
        const rows = await findBy({ username: req.body.username });
        if (!rows.length) {
            next();
        } else {
            res.status(422).json({ message: "username taken" })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = checkUserNameFree