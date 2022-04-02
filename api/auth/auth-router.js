const router = require('express').Router();
const { createToken } = require('../secrets');
const bcrypt = require('bcrypt');
const { add } = require('./model')
const checkUsernameFree = require('../middleware/checkUsernameFree')
const checkPayLoad = require('../middleware/checkPayLoad');
const checkUsernameExists = require('../middleware/checkUsernameExists')

router.post('/register', checkPayLoad, checkUsernameFree, async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 2);
    const newUser = await add({
      username: req.body.username,
      password: hash,
    });
    res.status(200).json(newUser);
  } catch (error) {
    next(error)
  }
});

router.post(
  '/login',
  checkPayLoad,
  checkUsernameExists,
  async (req, res, next) => {
    try {
      const verified = bcrypt.compareSync(
        req.body.password,
        req.userData.password
      );
      if (verified) {
        const token = createToken(req.userData)
        res.status(200).json({ message: `welcome ${req.body.username}!`, token })
      } else {
        res.status(401).json({ message: "invalid credentials" })
      }
    } catch (error) {
      next(error)
    }
  });

module.exports = router;
