const router = require('express').Router();
const { User } = require('../db/models');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const { firstName, secondName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, secondName, email, password: hashedPassword });
    console.log(newUser);
    await newUser.save();
    req.session.user = newUser
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDb = await User.findOne({ email });
    if (userDb && (await bcrypt.compare(password, userDb.password))) {
      req.session.user = userDb;
      return res.sendStatus(200);
    }
    return res.sendStatus(500);
  } catch (error) {
    return res.sendStatus(500);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid').sendStatus(200);
});

router.get('/:email', async (req, res) => {
  console.log('========email', req.params);
  try {
    const { email } = req.params;
    const userByemail = await User.findOne({ email });
    if (userByemail) {
      return res.status(200).json(userByemail)
    } else {
      return res.sendStatus(500);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
});

module.exports = router;
